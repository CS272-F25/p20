document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bookForm");
    const resultsDiv = document.getElementById("recommendation-results");

    if (!form || !resultsDiv) {
    console.error("Form or results container not found");
    return;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        clearResults();
        showLoading();

        const genre = document.getElementById("genre").value;
        const length = document.getElementById("length").value;
        const familiarity = document.getElementById("familiarity").value;
        const mood = document.querySelector('input[name="mood"]:checked')?.id;

        let query = genre;

        if (mood === "light") query += " fun";
        if (mood === "emotional") query += " emotional";
        if (mood === "dark") query += " dark";

        if (familiarity.toLowerCase().includes("classic")) query += " classic";
        if (familiarity.toLowerCase().includes("hidden")) query += " underrated";

        fetchBooks(query, length);
    });

    function fetchBooks(query, length) {
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
        )}&maxResults=15&printType=books&orderBy=newest`;

        fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            clearResults();

            if (!data.items || data.items.length === 0) {
            showMessage("No results found.");
            return;
            }

            data.items.forEach((book) => {
            const info = book.volumeInfo;

            const pageCount = info.pageCount || 0;
            if (
                (length.includes("Short") && pageCount > 300) ||
                (length.includes("Long") && pageCount < 450)
            ) {
                return;
            }

            resultsDiv.appendChild(createBookCard(info));
            });
        })
        .catch(() => {
            clearResults();
            showMessage("Error loading book data.");
        });
    }

    function createBookCard(info) {
        const col = document.createElement("div");
        col.className = "col-6 col-md-4 col-lg-3 mb-4 px-2";

        const card = document.createElement("div");
        card.className = "card h-100 d-flex flex-column";

        if (info.imageLinks?.thumbnail) {
        const img = document.createElement("img");
        img.src = info.imageLinks.thumbnail;
        img.alt = info.title || "Book cover";
        img.className = "card-img-top";
        card.appendChild(img);
        }

        const body = document.createElement("div");
        body.className = "card-body";

        const title = document.createElement("h5");
        title.className = "card-title";
        title.textContent = info.title || "No title";

        const author = document.createElement("p");
        author.className = "card-text fw-semibold";
        author.textContent = info.authors
        ? info.authors.join(", ")
        : "Unknown author";

        const description = document.createElement("p");
        description.className = "card-text";
        description.textContent = info.description
        ? info.description.substring(0, 150) + "…"
        : "No description available.";

        const detailsBtn = document.createElement("button");
        detailsBtn.className = "btn btn-light";
        detailsBtn.innerText = "More details";
        detailsBtn.onclick = () => {
            if (info.infoLink) {
                window.open(info.infoLink, "_blank");
            } else {
                alert("No details available for this book.");
            }
        };


        body.appendChild(title);
        body.appendChild(author);
        body.appendChild(description);
        body.appendChild(detailsBtn);

        card.appendChild(body);
        col.appendChild(card);

        return col;
    }

    function showLoading() {
        const p = document.createElement("p");
        p.className = "text-center w-100";
        p.textContent = "Loading recommendations...";
        resultsDiv.appendChild(p);
    }

    function showMessage(message) {
        const p = document.createElement("p");
        p.className = "text-center w-100";
        p.textContent = message;
        resultsDiv.appendChild(p);
    }

    function clearResults() {
        while (resultsDiv.firstChild) {
        resultsDiv.removeChild(resultsDiv.firstChild);
        }
    }
});
