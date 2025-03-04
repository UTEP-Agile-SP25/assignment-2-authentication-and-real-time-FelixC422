import { db } from "./config";
import { collection, getDocs, doc, deleteDoc, onSnapshot, getDoc, setDoc } from "firebase/firestore";

async function fetchDocument() {
    const docRef = doc(db, "books", "Diary of a Wimpy Kid");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document Data: ", docSnap.data());
    } else {
        console.log("No document found");
    }
}

fetchDocument();

async function getBooks() {
    try {
        const booksCol = collection(db, "books");
        const snapshot = await getDocs(booksCol);
        const books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const bookListDiv = document.getElementById("bookList");
        if (!bookListDiv) {
            console.error("bookList div not found");
            return;
        }

        if (books.length === 0) {
            bookListDiv.innerHTML = "<p>No books found.</p>";
            return;
        }

        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
        `;

        books.forEach(book => {
            tableHTML += `
                <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.year}</td>
                    <td>${book.rating}</td>
                </tr>
            `;
        });

        tableHTML += `</tbody></table>`;
        bookListDiv.innerHTML = tableHTML;
    } catch (error) {
        console.error("Error getting books", error);
    }
}


getBooks();

const saveBook = async function () {
    const bookTitle = document.getElementById("title").value;
    const bookAuthor = document.getElementById("author").value;
    const bookYear = parseInt(document.getElementById("year").value);
    const bookRating = parseInt(document.getElementById("rating").value);
    
    try {
        const bookRef = doc(db, "books", bookTitle);
        await setDoc(bookRef, {
            title: bookTitle,
            author: bookAuthor,
            year: bookYear,
            rating: bookRating
        });

        alert("Your book is saved!");
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("year").value = "";
        document.getElementById("rating").value = "";

    } catch (error) {
        console.log("Error saving the book", error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const addForm = document.querySelector("#addBookForm");
    if (addForm) {
        addForm.addEventListener("submit", (event) => {
            event.preventDefault();
            saveBook();
            getBooks();
        });
    } else {
        console.error("addBookForm not found");
    }

    const deleteBook = async function () {
        const bookTitle = document.getElementById("deleteTitle").value;

        try {
            const bookRef = doc(db, "books", bookTitle);
            await deleteDoc(bookRef);

            alert(`Book has been deleted`);
            document.getElementById("deleteTitle").value = "";
            getBooks();
        } catch (error) {
            console.error("Error deleting the book", error);
        }
    };

    const deleteForm = document.querySelector("#deleteBookForm");
    if (deleteForm) {
        deleteForm.addEventListener("submit", (event) => {
            event.preventDefault();
            deleteBook();
        });
    } else {
        console.error("deleteBookForm not found");
    }
});
