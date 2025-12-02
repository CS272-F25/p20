//console.log("our website's javascript file!");

const bookListNode = document.getElementById("book-list");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const API= '';

searchBtn.addEventListener("click", () => {
    const query = searchInput.value;
    if (query) {
      fetchBooks(query || "bestsellers");
    }
});

function fetchBooks(query) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&orderBy=relevance&maxResults=10&key=${API}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const books = (data.items || [])
            .filter(b => b.volumeInfo) 
            .filter(b => b.volumeInfo.title) 
            .filter(b => b.volumeInfo.authors) 
            .filter(b => b.volumeInfo.description)
            .filter(b => b.volumeInfo.imageLinks?.thumbnail)
            .filter(b => b.volumeInfo.language && b.volumeInfo.language.startsWith("en"));
    
        bookListNode.replaceChildren();
        books
            .map(bookData => createBookComponent(bookData))
            .forEach(node => bookListNode.appendChild(node));
    })
    .catch(err => console.error("Error fetching books:", err));
}

function createBookComponent(bookData) {
    const info = bookData.volumeInfo;
    const title = info.title || "Untitled";
    const authors = info.authors ? info.authors.join(", ") : "Unknown";
    const thumbnail =
    info.imageLinks.extraLarge ||
    info.imageLinks.large ||
    info.imageLinks.medium ||
    info.imageLinks.smallThumbnail ||
    info.imageLinks.thumbnail ||
    "https://via.placeholder.com/200x300?text=No+Cover";
    const description = info.description
    ? info.description.substring(0, 120) + "..."
    : "No description available.";

    const colDiv = document.createElement("div");
    colDiv.className = "col-6 col-md-4 col-lg-3 mb-4 px-2";

    const cardDiv = document.createElement("div");
    cardDiv.className = "card h-100 d-flex flex-column";

    const imgNode = document.createElement("img");
    imgNode.src = thumbnail;
    imgNode.className = "card-img-top book-cover";

    const titleNode = document.createElement("h5");
    titleNode.className = "card-title";
    titleNode.innerText = title;

    const authorNode = document.createElement("p");
    authorNode.className = "card-text";
    authorNode.innerText = `Author: ${authors}`;

    const descNode = document.createElement("p");
    descNode.className = "card-text";
    descNode.innerText = description;

    const detailsBtn = document.createElement("button");
    detailsBtn.className = "btn btn-light";
    detailsBtn.innerText = "More details";
    detailsBtn.onclick = () => {
        const googleUrl = bookData.volumeInfo.infoLink; 
        if (googleUrl) {
            window.open(googleUrl, "_blank"); 
        } else {
            alert("No details available for this book.");
        }
    };

    cardDiv.appendChild(titleNode);
    cardDiv.appendChild(imgNode);
    cardDiv.appendChild(authorNode);
    cardDiv.appendChild(descNode);
    cardDiv.appendChild(detailsBtn);

    colDiv.appendChild(cardDiv);

    return colDiv;
}


fetchBooks();