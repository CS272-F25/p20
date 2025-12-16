function loadReviews() {
    const list = document.getElementById("reviews-list");
    const saved = JSON.parse(localStorage.getItem("communityReviews")) || [];

    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    if (saved.length === 0) {
        const noReviewsMessage = document.createElement("p");
        noReviewsMessage.classList.add("text-center");
        noReviewsMessage.textContent = "No reviews yet. Be the first!";
        list.appendChild(noReviewsMessage);
        return;
    }

    saved.forEach(review => {
        const div = document.createElement("div");
        div.classList.add("storybook-box", "my-3");

        const h3 = document.createElement("h3");
        h3.textContent = review.book;
        div.appendChild(h3);

        const reviewerParagraph = document.createElement("p");
        const reviewerStrong = document.createElement("strong");
        reviewerStrong.textContent = "Reviewer: ";
        reviewerParagraph.appendChild(reviewerStrong);
        reviewerParagraph.appendChild(document.createTextNode(review.author));
        div.appendChild(reviewerParagraph);

        const ratingParagraph = document.createElement("p");
        const ratingStrong = document.createElement("strong");
        ratingStrong.textContent = "Rating: ";
        ratingParagraph.appendChild(ratingStrong);
        ratingParagraph.appendChild(document.createTextNode(review.rating));
        div.appendChild(ratingParagraph);

        const textParagraph = document.createElement("p");
        textParagraph.textContent = review.text;
        div.appendChild(textParagraph);

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
