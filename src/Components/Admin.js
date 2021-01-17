

import libraryFacade from "../Facade/libraryFacade"
import React, {useState, useEffect} from "react";

export default function Admin() {
  
  

    const [id, setID] = useState(0);
    const [isbn, setIsbn] = useState('');
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState('');
    const [publisher, setPublisher] = useState('');
    const [year, setYear] = useState(0);
    const [library, setLibrary] = useState('');
    const [allBooks, setAllBooks] = useState([]);

    function handleIsbn(event) {
      const target = event.target;
      const value = target.value;
      setIsbn(value);
    }
    function handleTitle(event) {
      const target = event.target;
      const value = target.value;
      setTitle(value);
    }
    function handleAut(event) {
      const target = event.target;
      const value = target.value;
      setAuthors(value);
    }
    function handlePub(event) {
      const target = event.target;
      const value = target.value;
      setPublisher(value);
    }
    function handleYear(event) {
      const target = event.target;
      const value = target.value;
      setYear(value);
    }
    function handleLib(event) {
      const target = event.target;
      const value = target.value;
      setLibrary(value);
    }

    function handleFormSubmit(event) {
      event.preventDefault();
      const newBook = {
        isbn,
        title,
        authors,
        publisher,
        year,
        library,
      }

        libraryFacade.addBook(newBook)
          .then(document.getElementById("error").innerHTML = 
            `<p class="alert alert-success" role="alert">Book Added!</p>`
          )
          .catch(err =>{
            if(err.status){
              err.fullError.then(e=> document.getElementById("error").innerHTML = 
              `<p class="alert alert-danger" role="alert">${e.message}</p>`)
            }
            else{console.log("Network error"); }
          });
      
      

    }

    function makeBooksTable(){
      libraryFacade.getAllBooks()
      .then(data => {
        setAllBooks(data.all);
        const books = data.all;
        const tableRows = books.map(book => `
        <tr>
          <td>${book.isbn}</td>
          <td>${book.title}</td>
          <td>${book.authors}</td>
          <td>${book.publisher}</td>
          <td>${book.publishyear}</td>
          <td>${book.library}</td>
        </tr>  
        `)
        const tableRowsAssString = tableRows.join("");
        document.getElementById("tbody").innerHTML = tableRowsAssString;
        document.getElementById("error").innerHTML = "";
      })
      .catch(err =>{
        if(err.status){
          err.fullError.then(e=> document.getElementById("error").innerHTML = 
          `<p class="alert alert-danger" role="alert">${e.message}</p>`)
        }
        else{console.log("Network error"); }
      });
    }

    function handleTable(event) {
      event.preventDefault();
      makeBooksTable();
    }

    function getBook() {
      const found = allBooks.find(element => element.isbn === isbn);
      if (found !== undefined){
          return found;
      } else {
          return null;
      }
    }

    function handleDelete(event) {
      event.preventDefault();
      setID(getBook.id);
      
      libraryFacade.deleteBook(id)
        .then(document.getElementById("error").innerHTML = "", 
          document.getElementById("error").innerHTML = 
          `<p class="alert alert-success" role="alert">The book with ISBN ${isbn} is deleted! Reload the table to see!</p>`)
        .catch(err =>{
          if(err.status){
            err.fullError.then(e=> document.getElementById("error").innerHTML = 
            `<p class="alert alert-danger" role="alert">${e.message}</p>`)
          }
          else{console.log("Network error"); }
      });
      
    }

    function handleEdit(event) {
      event.preventDefault();

      const found = allBooks.find(element => element.isbn === isbn);
      setID(found.id);

      if(title !== found.title){
        setTitle(found.title);
      } else if (authors !== found.authors) {
        setAuthors(found.authors);
       } else if (publisher !== found.publisher) {
        setPublisher(found.publisher)
       } else if (year !== found.year) {
        setYear(found.publishyear)
       } else if (library !== found.library) {
        setLibrary(found.library)
       }

      const newBook = {
        id,
        isbn,
        title,
        authors,
        publisher,
        year,
        library,
      }
console.log(title);

      libraryFacade.editBook(newBook)
        .then(document.getElementById("error").innerHTML = "", 
          document.getElementById("error").innerHTML = 
          `<p class="alert alert-success" role="alert">The book with ISBN ${isbn} is edited! Reload the table to see!</p>`)
        .catch(err =>{
          if(err.status){
            err.fullError.then(e=> document.getElementById("error").innerHTML = 
            `<p class="alert alert-danger" role="alert">${e.message}</p>`)
          }
          else{console.log("Network error"); }
      });
      
      

    }


    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-6">
            <h2>Admin page</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <div id="error"></div>

            <form onSubmit={handleFormSubmit} className="mt-4">
                <label>ISBN</label>
                <div id="isbnEdit" className="font-weight-bold">
                <input className="form-control" id="isbn" 
                    aria-describedby="isbnHelp" placeholder="Enter ISBN" 
                    onChange={handleIsbn}/>  
                </div>

                <label >Title</label>
                <input className="form-control" id="title" 
                    aria-describedby="titleHelp" placeholder="Enter Title" 
                    onChange={handleTitle}/> 

                <label >Authors</label>
                <input className="form-control" id="authors" 
                    aria-describedby="authorsHelp" placeholder="Enter Authors" 
                    onChange={handleAut}/> 

                <label>Publisher</label>
                <input className="form-control" id="publisher" 
                    aria-describedby="publisherHelp" placeholder="Enter Publisher" 
                    onChange={handlePub}/> 

                <label>Publish Year</label>
                <input className="form-control" id="year" 
                    aria-describedby="yearHelp" placeholder="Enter Year" 
                    onChange={handleYear}/> 

                <label>Library</label>
                <input className="form-control" id="library" 
                    aria-describedby="libraryHelp" placeholder="Enter Library" 
                    onChange={handleLib}/> 

                  <button type="submit" id="add" className="btn btn-success mt-2">Add Book</button>
                  <button type="submit" onClick={handleEdit} id="edit" className="btn btn-info mt-2 ml-3">Edit Book</button>
                  <br/>
                  <label>Edit book by typing an existing ISBN number and fill out the rest of the form</label>
            </form>

          
          </div>

          <div className="col-9">

            <div id="error"></div>

            <form onSubmit={handleDelete} className="mt-4">
                  <label>Delete book by intering it's ISBN number</label>
                  <input className="form-control" id="isbn" 
                      aria-describedby="isbnHelp" placeholder="Enter ISBN" 
                      onChange={handleIsbn}/> 

                  <button type="submit" className="btn btn-danger mt-2">Delete Book</button>
            </form>

            <button type="button" className="btn btn-success mt-2" onClick={handleTable}>See all books</button>

              <table className="table">
                <thead>
                  <tr>
                    <td><b>ISBN</b></td>
                    <td><b>Title</b></td>
                    <td><b>Author</b></td>
                    <td><b>Publisher</b></td>
                    <td><b>Publish Year</b></td>
                    <td><b>Library</b></td>
                  </tr>
                </thead>
                <tbody id="tbody"></tbody>
              </table>
          </div>


        </div>
      </div>
    );
}
