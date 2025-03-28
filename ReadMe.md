Book Review App

Description

The Book Review App allows users to add, view, edit, and delete book reviews. It utilizes JavaScript, Fetch API, and JSON Server to store and retrieve reviews dynamically.


---

Features

✅ Add a new book review (Title, Author, Review, Rating)
✅ Display a list of all reviews
✅ Edit an existing review
✅ Delete a review
✅ Fetch data using Fetch API
✅ Uses JSON Server for backend storage


---

Project Structure

/book-review-app
├── index.html         # Main HTML file
├── css/
│   ├── styles.css     # Stylesheet
├── js/
│   ├── script.js      # JavaScript file
├── db.json            # JSON Server database
├── README.md          # Project documentation


---

Technologies Used

HTML – Structuring the application

CSS – Styling the form and reviews

JavaScript (ES6) – Dynamic functionality

Fetch API – Making HTTP requests

JSON Server – Mock backend for storing reviews



---

Installation & Setup

1. Clone the Repository

git clone https://github.com/your-username/book-review-app.git
https://vercel.com/mpoe32s-projects/phase-1-final-project/3Dv9auuQjKbTeUofXKxjPYn4DA3n
cd book-review-app

2. Install JSON Server

npm install -g json-server

3. Start the JSON Server

json-server --watch db.json --port 3000

The server will run at http://localhost:3000/reviews.

4. Open the App in Browser

Open index.html in your browser or use Live Server in VS Code.


---

Usage

1. Enter book details (Title, Author, Review, Rating).


2. Click "Add Review" to submit.


3. View, edit, or delete reviews as needed.




---

Contributing

Feel free to fork this repository, create a new branch, and submit a pull request.


---

License

This project is free to use under the MIT License.

