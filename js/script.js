document.addEventListener("DOMContentLoaded", fetchReviews); //DOM fully load 

const form = document.getElementById("reviewForm");
form.addEventListener("submit", addReview);// get the review form element and adding event listener for form submissiion


function fetchReviews() {
    fetch("http://localhost:3000/reviews")
        .then(response => response.json())
        .then(data => {
            document.getElementById("reviews").innerHTML = "";
            data.forEach(review => {
                const div = document.createElement("div");
                div.innerHTML = `
                    <h3>${review.title} by ${review.author}</h3>
                    <p>${review.review}</p>
                    <p>Rating: ${review.rating}/5</p>
                    <button onclick="deleteReview(${review.id})">Delete</button>
                    <button onclick="updateReview(${review.id})">Edit</button>
                `;
                document.getElementById("reviews").appendChild(div);
            });
        });
}
        
    



