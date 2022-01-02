// const getSums=( arr )=> {
//     const arr2 = [];
//     console.log(arr2);
//     arr.reduce((acc, item) => {
//         acc += item;
//         arr2.push(acc);
//         return acc
//     }, 0); return arr2;
// }
// getSums([1,2,3,4,5]);
// -------------------------
// document.querySelectorAll('.b-index-lastsongs-item__pic').forEach(elem => elem.firstElementChild.style.borderColor = '#ff0000')
// ------------------------------

const books=[
	{
		id: '1',
		title: `Apple. Эволюция компьютера`,
		author: `Владимир Невзоров`,
		img: `https://bukva.ua/img/products/449/449532_200.jpg`,
		plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно 
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории 
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, 
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники. 
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
	},
	{
		id: '2',
		title: `Как объяснить ребенку информатику`,
		author: `Кэрол Вордерман`,
		img: `https://bukva.ua/img/products/480/480030_200.jpg`,
		plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах 
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, 
    оставаясь в безопасности. 
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, 
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном 
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - 
    объясняются наглядно с помощью иллюстраций и схем.`,
	},
	{
		id: '3',
		title: `Путь скрам-мастера. #ScrumMasterWay`,
		author: `Зузана Шохова`,
		img: `https://bukva.ua/img/products/480/480090_200.jpg`,
		plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. 
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными 
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, 
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, 
    какими инструментами ему нужно пользоваться.`,
	},
];
const booksFromLS = localStorage.getItem("books");
// console.log(booksFromLS);
if (booksFromLS === null) {
    localStorage.setItem("books", JSON.stringify(books))
}
const divEl = document.querySelector("#root");
const div1 = document.createElement("div");
const div2 = document.createElement("div");

divEl.append(div1, div2)

divEl.firstElementChild.classList.add("leftSide")
divEl.lastElementChild.classList.add("rightSide")

const title = document.createElement("h1");
title.classList.add("title");
title.textContent = "Books";
const list = document.createElement("ul");
const btn = document.createElement("button");
btn.classList.add("btn__add");
btn.textContent = "Add";


div1.append(title, list, btn);

const bookList = document.querySelector("ul");
const btnAdd = document.querySelector(".btn__add")
btnAdd.addEventListener('click', addBook)

function renderList() {
const books=JSON.parse(localStorage.getItem('books'))
    const bookMarkup = books.map(book => {
        return `<li class="item" id=${book.id}>
        <p class="book__title">${book.title}</p>
        <button class="btn__del">Delete</button>
        <button class="btn__ed">Edit</button></li>`
    }).join("")
    bookList.insertAdjacentHTML("afterbegin", bookMarkup);

    document.querySelectorAll(".book__title").forEach(element => {
        element.addEventListener("click", renderPreview)
    });
    document.querySelectorAll(".btn__del").forEach(btn => {
        btn.addEventListener("click", renderButtonDel)
    });
    document.querySelectorAll(".btn__ed").forEach(btn => {
        btn.addEventListener("click", renderButtonEdit)
    });
    
    
    
}
renderList();

function renderPreview(e) {
const books = JSON.parse(localStorage.getItem("books"));
    const curBook = books.find(book=>book.title===e.currentTarget.textContent)
    // console.log(book);
    renderBookMarkup(curBook);
    div2.innerHTML=''
    div2.insertAdjacentHTML("afterbegin", renderBookMarkup(curBook));
}

function renderBookMarkup(book) {
    // div2.innerHTML=""
    return `<h2>${book.title}</h2>
    <p>${book.author}</p>
    <img src="${book.img}" alt="${book.title}">
    <p>${book.plot}</p>`
}

function renderButtonDel(e) {
    const books = JSON.parse(localStorage.getItem("books"));
    console.log(e.target.parentNode.id);
    const curIndex = books.findIndex((book) => book.id === e.target.parentNode.id)
    console.log(curIndex);

    const renderPrevEl = div2.querySelector("h2");
     console.log(renderPrevEl);
    
   
    
    
    if (renderPrevEl) {
        const renderTitleEl = div2.querySelector("h2").textContent;
        console.log(renderTitleEl);
        console.log(books[curIndex].title);
    if (books[curIndex].title === renderTitleEl) {
        div2.innerHTML=""
    } }

    // books.splice(curIndex, 1);    
    bookList.innerHTML=''
    const updatedBooks = books.filter((book) => e.target.parentNode.id !== book.id);
  localStorage.setItem("books", JSON.stringify(updatedBooks));
    renderList()
   
}
function renderButtonEdit(e) {
    console.log("edit");
}

function addBook(e) {
    const newBook = {
        id: `${Date.now()}`,
        title: '',
        author: '',
        img: '',
        plot: '',
    };
    // div2.innerHTML = '';
    div2.insertAdjacentHTML('afterbegin', renderFormMarkup());

    formFunction(newBook);

    const btnSubmit = document.querySelector(".submit");

    btnSubmit.addEventListener('click', saveChanges);


    function saveChanges(e) {
        console.log(newBook);
        console.log(newBook.title);
        console.log(newBook.author);
        console.log(newBook.img);
        console.log(newBook.plot);
        if (newBook.title && newBook.author && newBook.img && newBook.plot) {
            const books = JSON.parse(localStorage.getItem("books"));
            console.log(books);
            console.log(newBook);
            books.push(newBook);
            localStorage.setItem("books", JSON.stringify(books));
            bookList.innerHTML = '';
            renderList();
            // renderBookMarkup(newBook);
            div2.innerHTML=""
            div2.insertAdjacentHTML("afterbegin", renderBookMarkup(newBook));
        }
        console.log(newBook);
        console.log(books);
    }
}

function renderFormMarkup() {
    return `<form action="">
  <label for="">Name
    <input type="text" name="title">
  </label>
  <label for="">Author
    <input type="text" name="author">
  </label>
  <label for="">Image
    <input type="text" name="img">
  </label>
  <label for="">plot
    <input type="text" name="plot">
    <button type ='button' class='submit'>Add</button>
  </label>  
</form>`
}

function formFunction(book) {
    document.querySelectorAll('input').forEach((el) =>
        el.addEventListener('change', fillObject));
    function fillObject(e) {        
        book[e.target.name] = e.target.value;
}
}