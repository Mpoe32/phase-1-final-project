document.addEventListener("DOMContentLoaded", fetchReviews); //DOM fully load 

const form = document.getElementById("reviewForm");
form.addEventListener("submit", addReview);// get the review form element and adding event listener for form submissiion

function fetchReviews() {
    fetch("http://localhost:3000/reviews")//fetch data from JSON serrver
    .then(Response => Response.json())
    .then(data => {
        document.getElementById("reviews").innerHTML = "";
    })
}



