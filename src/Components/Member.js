import libraryFacade from "../Facade/libraryFacade"
import React, {useState, useEffect} from "react";

export default function Member() {
    const [allBooks, setAllBooks] = useState([]);
    const [input,setInput] = useState('');
    const [book, setBook] = useState([]);


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

    // ----------------- Form ------------------------
    function handleChange(event) {
      const target = event.target;
      const value = target.value;
      setInput(value);
    }

    function createList() {
      const found = allBooks.find(element => element.isbn === input 
                                    || element.title === input
                                    || element.authors === input
                                    || element.publisher === input);
      if (found !== undefined){
          console.log(found.id);

          return (
              <React.Fragment>
                  <p className="mt-3"><b>{found.title}</b></p>
                  <ul>
                      <li>ISBN: {found.isbn}</li>
                      <li>Title: {found.title}</li>
                      <li>Authors: {found.authors}</li>
                      <li>Publisher: {found.publisher}</li>
                      <li>Publish Year: {found.publishyear}</li>
                      <li>Library: {found.library}</li>
                  </ul>
              </React.Fragment>
          )
      } else {
          return (
              <React.Fragment>
                  <p className="mt-3"><b>The book does not exist.</b></p>
              </React.Fragment>
          )
      }
    }
      
    function handleFormSubmit(event) {
      event.preventDefault();
      setBook(createList);
    }


    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <h2>Member page</h2>
            <button type="button" className="btn btn-success mt-2" onClick={handleTable}>See all books</button>
            <div id="error"></div>
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

        <div className="row">
          <div className="col-6">
            <form onSubmit={handleFormSubmit} className="mt-4">
                <label htmlFor="exampleInputCharacterName">Book:</label>
                <input className="form-control" id="exampleInputCharacterName" 
                    aria-describedby="characterNameHelp" placeholder="Enter ISBN, title, author or publisher here." 
                    onChange={handleChange}/>  
                <button type="submit" className="btn btn-success mt-2">Find book</button>
            </form>
            {book}
          </div>
        </div>

      </div>

    );
}