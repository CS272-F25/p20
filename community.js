function loadReviews() {
    const list = document.getElementById("reviews-list");
    const saved = JSON.parse(localStorage.getItem("communityReviews")) || [];

    list.innerHTML = "";

    if (saved.length === 0) {
        list.innerHTML = "<p class='text-center'>No reviews yet. Be the first!</p>";
        return;
    }

    saved.forEach(review => {
        const div = document.createElement("div");
        div.classList.add("storybook-box", "my-3");

        div.innerHTML = `
            <h3>${review.book}</h3>
            <p><strong>Reviewer:</strong> ${review.author}</p>
            <p><strong>Rating:</strong> ${review.rating}</p>
            <p>${review.text}</p>
        `;

        list.appendChild(div);
    });
}


document.getElementById("reviewForm").addEventListener("submit", function(e){
    e.preventDefault();

    const book = document.getElementById("review-book").value;
    const author = document.getElementById("review-author").value;
    const rating = document.getElementById("review-rating").value;
    const text = document.getElementById("review-text").value;

    const review = { book, author, rating, text };

    const saved = JSON.parse(localStorage.getItem("communityReviews")) || [];
    saved.push(review);
    localStorage.setItem("communityReviews", JSON.stringify(saved));

    this.reset();
    loadReviews();
});


loadReviews();