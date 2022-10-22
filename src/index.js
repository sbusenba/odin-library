'use strict';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { 
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
  } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR9cH8iFBbQ5dR-4zjfEjPbh5M_uMblQE",
  authDomain: "stevens-odin-library.firebaseapp.com",
  projectId: "stevens-odin-library",
  storageBucket: "stevens-odin-library.appspot.com",
  messagingSenderId: "713537663214",
  appId: "1:713537663214:web:bff2aa36df95f666e143ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let myLibrary = []
class Book{
    constructor(title,author,pages,read){
        this.title= title
        this.author=author
        this.pages = pages
        this.read = read
    }
    info(){
        return (title+" by "+author +", " +pages +" pages"+ ((read)? " read": " unread" ));
    }
}   

async function addBookToLibrary (book){
    try {
        await addDoc(collection(getFirestore(), 'books'), {
          title: book.title,
          author: book.author,
          pages: book.pages,
          read: book.read
        });
      }
      catch(error) {
        console.error('Error writing new book to Firebase Database', error);
      }

}
function removeBook (){
    myLibrary.splice( this.parentNode.getAttribute('data-key') ,1)

}
function toggleRead(){
    if (myLibrary[this.parentNode.getAttribute('data-key')].read){
        myLibrary[this.parentNode.getAttribute('data-key')].read = false
    } else{
        myLibrary[this.parentNode.getAttribute('data-key')].read = true
    }
}
function getBookFromUser(){
    let titleEntry = document.querySelector("#titleinput");
    let title = titleEntry.value;
    titleEntry.value = '';
    let authorEntry = document.querySelector("#authorinput")
    let author = authorEntry.value;
    authorEntry.value = '';
    let pagesEntry = document.querySelector("#pagesinput")
    let pages = pagesEntry.value;
    pagesEntry.value  = ''
    let readEntry = document.querySelector("#readinput")
    let read = readEntry.checked;
    readEntry.checked = false;
    bookEntry.classList.toggle('visible')
    let book = new Book(title,author,pages,read)
    addBookToLibrary(book)
}


function updateLibrary(){
    while(libraryContainer.firstChild){
       libraryContainer.firstChild.remove()
    }
    if(myLibrary != null ){
    myLibrary.forEach((book,index) =>{ 

        let bookDiv  = document.createElement('div')
        bookDiv.setAttribute('data-key',index)
        bookDiv.classList.add('bookdiv')
        let titleDiv = document.createElement('div')
        titleDiv.classList.add('titlediv')
        let authorDiv = document.createElement('div')
        let pagesDiv = document.createElement('div')
        let readButton = document.createElement('button')
        let removeButton = document.createElement('button')
        titleDiv.innerText = book.title
        authorDiv.innerText = book.author
        pagesDiv.innerText = book.pages
        console.log(`${book.title} : ${book.read}`)
        if (book.read ===true){
            readButton.innerText = 'read'
        }else{
            readButton.innerText= 'unread'}
        readButton.addEventListener('click',toggleRead)
        removeButton.innerText = "remove"
        removeButton.addEventListener('click',removeBook)
        bookDiv.appendChild(titleDiv)
        bookDiv.appendChild(authorDiv)
        bookDiv.appendChild(pagesDiv)
        bookDiv.appendChild(readButton)
        bookDiv.appendChild(removeButton)
        libraryContainer.appendChild(bookDiv)
    }) } 


}
function displayBook(id,title,author,pages,read){
    let bookDiv  = document.createElement('div')
    bookDiv.setAttribute('data-key',id)
    bookDiv.classList.add('bookdiv')
    let titleDiv = document.createElement('div')
    titleDiv.classList.add('titlediv')
    let authorDiv = document.createElement('div')
    let pagesDiv = document.createElement('div')
    let readButton = document.createElement('button')
    let removeButton = document.createElement('button')
    titleDiv.innerText = title
    authorDiv.innerText = author
    pagesDiv.innerText = pages
    readButton.checked = read
    removeButton.addEventListener('click',()=>{
        deleteBook(id)
    })

    
}
function deleteBook (id){

    var div = document.querySelector("[data-key=id]");
    // If an element for that message exists we delete it.
    if (div) {
        div.parentNode.removeChild(div);
    }

}

function loadBooks(){
    //create query, listens for new boosk
    const newBookQuery= query(collection(getFirestore(),'books'),orderBy('title','desc'),limit(1000));
      //start listening to query
      onSnapshot(newBookQuery, function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
          if (change.type === 'removed') {
            deleteBook(change.doc.id);
          } else {
            var book = change.doc.data();
            displayBook(change.doc.id, book.title, book.author,
                          book.pages, book.read);
          }
        });
      });


}


let libraryContainer = document.querySelector(".content")
let bookEntry = document.querySelector(".bookentry")
console.log(bookEntry)
query(collection(getFirestore(),'books'),orderBy('title','desc'),limit(1000)).forEach(
    (book)=>{
    console.log(book)
});

loadBooks()
document.querySelector(".addbook").addEventListener('click',()=>{bookEntry.classList.toggle('visible')})
document.querySelector("#addbutton").addEventListener('click',getBookFromUser)

