
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
    let title = prompt("title")
    let author = prompt("author")
    let pages = prompt("pages")
    let read = Boolean(prompt("read"))
    let book = new Book(title,author,pages,read)
    addBookToLibrary(book)
    updateLibrary()
}


function updateLibrary(){
    libraryContainer.innerHTML=''
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

window.localStorage.setItem('library',JSON.stringify(myLibrary))

}

let libraryContainer = document.querySelector(".content")
let storedLibrary = window.localStorage.getItem('library')
if (storedLibrary!= null){
    myLibrary = JSON.parse(storedLibrary)
}
document.querySelector(".addBook").addEventListener('click',getBookFromUser)

updateLibrary()

