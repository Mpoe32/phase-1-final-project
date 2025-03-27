/**
 * Book Review Application
 * 
 * This script handles all CRUD operations for the book review app:
 * - Fetching and displaying existing reviews
 * - Adding new reviews
 * - Deleting reviews
 * - Updating reviews
 */

// Wait for DOM to be fully loaded before executing scripts
document.addEventListener("DOMContentLoaded", () => {
    fetchReviews();
    
    // Add event listener for form submission
    const form = document.getElementById("reviewForm");
    form.addEventListener("submit", addReview);
});

/**
 * Fetches all reviews from the server and displays them
 * @returns {Promise<void>}
 */
function fetchReviews() {
    fetch("http://localhost:3000/reviews")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const reviewsContainer = document.getElementById("reviews");
            reviewsContainer.innerHTML = ""; // Clear existing reviews
            
            if (data.length === 0) {
                reviewsContainer.innerHTML = "<p>No reviews yet. Be the first to add one!</p>";
                return;
            }
            
            // Create and end each review element
            data.forEach(review => {
                const reviewElement = createReviewElement(review);
                reviewsContainer.appendChild(reviewElement);
            });
        })
        .catch(error => {
            console.error("Error fetching reviews:", error);
            document.getElementById("reviews").innerHTML = 
                "<p>Error loading reviews. Please try again later.</p>";
        });
}

/**
 * Creates a DOM element for a single review
 * @param {Object} review - The review object
 * @returns {HTMLElement} The created review element
 */
function createReviewElement(review) {
    const div = document.createElement("div");
    div.className = "review-item";
    
    div.innerHTML = `
        <h3>${review.title} by ${review.author}</h3>
        <p>${review.review}</p>
        <p class="rating">Rating: ${review.rating}/5</p>
        <div class="review-actions">
            <button onclick="updateReview(${review.id})">Edit</button>
            <button onclick="deleteReview(${review.id})">Delete</button>
        </div>
    `;
    
    return div;
}

/**
 * Handles form submission to add a new review
 * @param {Event} event - The form submission event
 */
function addReview(event) {
    event.preventDefault();
    
    const newReview = {
        title: document.getElementById("title").value.trim(),
        author: document.getElementById("author").value.trim(),
        review: document.getElementById("review").value.trim(),
        rating: parseInt(document.getElementById("rating").value),
    };
    
    // Basic validation
    if (!newReview.title || !newReview.author || !newReview.review) {
        alert("Please fill in all fields");
        return;
    }
    
    if (newReview.rating < 1 || newReview.rating > 5) {
        alert("Rating must be between 1 and 5");
        return;
    }
    
    // Send POST request to add new review
    fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(newReview)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to add review");
        }
        return response.json();
    })
    .then(() => {
        fetchReviews(); // Refresh the reviews list
        document.getElementById("reviewForm").reset(); // Clear the form
    })
    .catch(error => {
        console.error("Error adding review:", error);
        alert("Error adding review. Please try again.");
    });
}

/**
 * Deletes a review from the server
 * @param {number} id - The ID of the review to delete
 */
function deleteReview(id) {
    if (!confirm("Are you sure you want to delete this review?")) {
        return;
    }
    
    fetch(`http://localhost:3000/reviews/${id}`, { 
        method: "DELETE" 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to delete review");
        }
        fetchReviews(); // Refresh the reviews list
    })
    .catch(error => {
        console.error("Error deleting review:", error);
        alert("Error deleting review. Please try again.");
    });
}

/**
 * Updates an existing review
 * @param {number} id - The ID of the review to update
 */
function updateReview(id) {
    const newReviewText = prompt("Enter your updated review:");
    
    if (newReviewText && newReviewText.trim() !== "") {
        fetch(`http://localhost:3000/reviews/${id}`, {
            method: "PATCH",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ 
                review: newReviewText.trim() 
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to update review");
            }
            fetchReviews(); // Refresh the reviews list
        })
        .catch(error => {
            console.error("Error updating review:", error);
            alert("Error updating review. Please try again.");
        });
    }
}
