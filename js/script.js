document.addEventListener("DOMContentLoaded", fetchReviews); //DOM fully load 

const form = document.getElementById("reviewForm");
form.addEventListener("submit", addReview);// get the review form element and adding event listener for form submissiion


function fetchReviews() {
    fetch("http://localhost:3000/reviews")
        .then(response => response.json())
        .then(data => {
            document.getElementById("reviews").innerHTML = "";
            data.forEach(review => {
                const div = document.createElement("div");// loop through each review and create a div element to display
                div.innerHTML = `
                    <h3>${review.title} by ${review.author}</h3>
                    <p>${review.review}</p>
                    <p>Rating: ${review.rating}/5</p>
                    <button onclick="deleteReview(${review.id})">Delete</button>
                    <button onclick="updateReview(${review.id})">Edit</button>
                `;
                document.getElementById("reviews").appendChild(div);// append the newly created review element to the review section
            });
        });
}
//functiion to add a new review when the form is submitted
function addReview(event) {
    event.preventDefault();//prevent default form submission
    const newReview = {
        title:document.getElementById("title").value,
        author:document.getElementById("author").value,
        review:document.getElementById("review").value,
        rating:document.getElementById("rating").value,
    }
}
 //send a post request to add the new review to the server
 fetch("http://localhost:3000/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newReview)
})
.then(() => fetchReviews());

//functiion to delete a review
function deleteReview(id) {
    fetch(`http://localhost:3000/reviews/${id}`, { method: "DELETE" })
        .then(() => fetchReviews());
    }
    
    //function to update a review
    function updateReview(id) {
    const newReviewText = prompt("Enter new review:");
    if (newReviewText) {
        fetch(`http://localhost:3000/reviews/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ review: newReviewText })
        })
        .then(() => fetchReviews());
    }
    }
    


    



 