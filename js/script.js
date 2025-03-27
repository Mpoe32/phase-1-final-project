document.addEventListener("DOMContentLoaded", () => {
    fetchReviews();
    
    const form = document.getElementById("reviewForm");
    form.addEventListener("submit", addReview);
});

function fetchReviews() {
    
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const reviewsContainer = document.getElementById("reviews");
    reviewsContainer.innerHTML = ""; 
    
    if (reviews.length === 0) {
        reviewsContainer.innerHTML = "<p>No reviews yet. Be the first to add one!</p>";
        return;
    }
    
    reviews.forEach(review => {
        const reviewElement = createReviewElement(review);
        reviewsContainer.appendChild(reviewElement);
    });
}

function createReviewElement(review) {
    const div = document.createElement("div");
    div.className = "review-item";
    
    div.innerHTML = `
        <h3>${review.title} by ${review.author}</h3>
        <p>${review.review}</p>
        <p class="rating">Rating: ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
        <div class="review-actions">
            <button onclick="updateReview('${review.id}')">Edit</button>
            <button onclick="deleteReview('${review.id}')">Delete</button>
        </div>
    `;
    
    return div;
}

function addReview(event) {
    event.preventDefault();
    
    const newReview = {
        id: Date.now().toString(), 
        title: document.getElementById("title").value.trim(),
        author: document.getElementById("author").value.trim(),
        review: document.getElementById("review").value.trim(),
        rating: parseInt(document.getElementById("rating").value),
    };
    
    if (!newReview.title || !newReview.author || !newReview.review) {
        alert("Please fill in all fields");
        return;
    }
    
    if (newReview.rating < 1 || newReview.rating > 5) {
        alert("Rating must be between 1 and 5");
        return;
    }
    
    
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    
    fetchReviews();
    document.getElementById("reviewForm").reset();
}
 
function deleteReview(id) {
    if (!confirm("Are you sure you want to delete this review?")) {
        return;
    }
    
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const updatedReviews = reviews.filter(review => review.id !== id);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    fetchReviews();
}

function updateReview(id) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const reviewToUpdate = reviews.find(review => review.id === id);
    
    if (!reviewToUpdate) return;
    
    const newTitle = prompt("Update book title:", reviewToUpdate.title);
    const newAuthor = prompt("Update author:", reviewToUpdate.author);
    const newReviewText = prompt("Update your review:", reviewToUpdate.review);
    const newRating = prompt("Update rating (1-5):", reviewToUpdate.rating);
    
    if (newTitle && newAuthor && newReviewText && newRating) {
        reviewToUpdate.title = newTitle.trim();
        reviewToUpdate.author = newAuthor.trim();
        reviewToUpdate.review = newReviewText.trim();
        reviewToUpdate.rating = Math.min(5, Math.max(1, parseInt(newRating) || reviewToUpdate.rating));
        
        localStorage.setItem('reviews', JSON.stringify(reviews));
        fetchReviews();
    }
}