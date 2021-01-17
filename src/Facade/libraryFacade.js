
import URL from "../settings";
// URL=http://localhost:8080/miadefries3sem/

function makeOptions(method, body) {
    var opts =  {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    }
    if(body){
      opts.body = JSON.stringify(body);
    }
    return opts;
}
  
function handleHttpErrors(res){
    console.log(res)
    if(!res.ok){
    return Promise.reject({status: res.status, fullError: res.json() })
    }
    return res.json();
}

function getAllBooks(){
    return fetch(URL + "api/library/all")
        .then(handleHttpErrors)
}

function getBook(input){
    return fetch(URL + "api/library/searchbook/"+input)
        .then(handleHttpErrors)
}


function addBook(book){
    const options = makeOptions("POST", book)
    return fetch(URL+"api/library", options)
        .then(handleHttpErrors)
}

function deleteBook(id){
    const options = makeOptions("DELETE");
    return fetch(URL + "api/library/" + id, options)
    .then(handleHttpErrors)
}

function editBook(book){
    const options = makeOptions("PUT", book);
    return fetch(URL + "api/library/" + book.id, options)
    .then(handleHttpErrors)
}

const personFacade = {
    getAllBooks,
    getBook,
    addBook,
    deleteBook,
    editBook,
}

   
export default personFacade;



