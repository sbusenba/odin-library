
let myLibrary = []
function Book(title,author,pages,read){
  this.title= title
  this.author=author
  this.pages = pages
  this.read = read
  this.info = function(){
    return (title+" by "+author +", " +pages +" pages"+ ((read)? " read": " unread" ))
    }
}
function addBookToLibrary (book){
    book['data-index'] = myLibrary.length
    myLibrary.push(book)
    updateLibrary()
}
function removeBook (){
    myLibrary.splice( this.parentNode.getAttribute('data-key') ,1)
    updateLibrary()

}
function toggleRead(){
    if (myLibrary[this.parentNode.getAttribute('data-key')].read){
        myLibrary[this.parentNode.getAttribute('data-key')].read = false
    } else{
        myLibrary[this.parentNode.getAttribute('data-key')].read = true
    }
updateLibrary()
}
function getBookFromUser(){
    let book = new Book
    book.title = prompt("title")
    book.author = prompt("author")
    book.pages = prompt("pages")
    book.read = prompt("read")
    addBookToLibrary(book)
    updateLibrary()
}


function updateLibrary(){
    libraryContainer.innerHTML=''
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
    })  

window.localStorage.setItem('library',JSON.stringify(myLibrary))
console.table(window.localStorage.getItem('library'))
}

let libraryContainer = document.querySelector(".content")
let storedLibrary = window.localStorage.getItem('library')
myLibrary = JSON.parse(storedLibrary)

document.querySelector(".addBook").addEventListener('click',getBookFromUser)

updateLibrary()

