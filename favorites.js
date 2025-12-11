//**Favorites localStorage**//
function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}
  
function saveFavorites(favs) {
    localStorage.setItem("favorites", JSON.stringify(favs));
}
  
function toggleFavorite(book) {
    const favs = getFavorites();
    const exists = favs.some(f => f.id === book.id);
  
    let updated;
    if (exists) {
        updated = favs.filter(f => f.id !== book.id);
    } else {
        updated = [...favs, book];
    }
    saveFavorites(updated);
}

function createBookCard(book) {
    const card = document.createElement("div");
    card.className = "col-md-3 mb-4";

    const wrapper = document.createElement("div"); 
    wrapper.className = "book-card";
    wrapper.style.position = "relative";

    const img = document.createElement("img");
    img.className = "book-thumbnail";
    img.src = book.thumbnail || "";
    img.alt = book.title || "Book cover";
    wrapper.appendChild(img);

    const title = document.createElement("h5");
    title.className = "book-title";
    title.textContent = book.title;
    wrapper.appendChild(title);

    const author = document.createElement("p");
    author.className = "book-author";
    author.textContent = book.authors || "Unknown Author";
    wrapper.appendChild(author);

    const heart = document.createElement("button");
    heart.className = "favorite-heart";
    heart.textContent = "♥"; 
    heart.addEventListener("click", () => {
        toggleFavorite(book);
        card.remove(); 
    });
    wrapper.appendChild(heart);
    card.appendChild(wrapper);
    return card;
}

document.addEventListener("DOMContentLoaded", () => {
    const favContainer = document.getElementById("favorites-list");
    const favs = getFavorites();

    if (favs.length === 0) {
        const msg = document.createElement("p");
        msg.textContent = "No favorites yet.";
        favContainer.appendChild(msg);
        return;
    }

    favs.forEach(book => {
        favContainer.appendChild(createBookCard(book));
    });
});
