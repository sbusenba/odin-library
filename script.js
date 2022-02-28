
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
function clearAll(){
while (libraryContainer.firstChild){
    libraryContainer.removeChild(libraryContainer.firstChild)
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
    clearAll()
    let newBookDiv = document.createElement('form')
    newBookDiv.setAttribute("novalidate","novalidate")
    let titleLabel = document.createElement('label')
    titleLabel.setAttribute("for", "title")
    titleLabel.innerText = "Title:"
    let titleInput = document.createElement('input')
    titleInput.setAttribute("type","text")
    titleInput.setAttribute("name","title")
    titleInput.setAttribute("required","required")
    titleInput.setAttribute("minlength","8")
    
    titleLabel.appendChild(titleInput)
    newBookDiv.appendChild(titleLabel)
    let authorLabel = document.createElement('label')
    authorLabel.setAttribute("for","author")
    authorLabel.innerText = "Author:"
    let authorInput = document.createElement('input')
    authorInput.setAttribute("type","text")
    authorInput.setAttribute("name","author")
    authorLabel.appendChild(authorInput)
    newBookDiv.appendChild(authorLabel)
    let pagesLabel = document.createElement('label')
    pagesLabel.setAttribute("for","pages")
    pagesLabel.innerText = "Pages:"
    let pagesInput = document.createElement('input')
    pagesInput.setAttribute("name", "pages")
    pagesInput.setAttribute("type","text")
    pagesLabel.appendChild(pagesInput)
    newBookDiv.appendChild(pagesLabel)
    let readLabel = document.createElement('label')
    readLabel.setAttribute('for','read')
    readLabel.innerText = "Read?"
    let readInput = document.createElement('input')
    readInput.setAttribute("name","read")
    readInput.setAttribute("type","checkbox")
    
    readLabel.appendChild(readInput)
    newBookDiv.appendChild(readLabel)
    let submitButton = document.createElement('button')
    submitButton.addEventListener('click',(event)=>{
        console.log(titleInput.validity.valid)
        if (titleInput.validity.valid){

            let book = new Book(titleInput.value,authorInput.value,pagesInput.value,readInput.checked)
            addBookToLibrary(book)
            updateLibrary()
        } else {
            event.preventDefault()
        }
    });
    submitButton.innerText="Add"
    newBookDiv.appendChild(submitButton)
    libraryContainer.appendChild(newBookDiv)

}


function updateLibrary(){
    clearAll();
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

