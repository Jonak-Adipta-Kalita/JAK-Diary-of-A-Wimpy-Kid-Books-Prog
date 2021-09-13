const dex = document.getElementById('dex');
const fetchBooks = async () => {
    const url = "/books.json";
	const res = await fetch(url);
	const data = await res.json();
	console.log(data);
	const books = data.book.map((result, index) => ({
		...result,
		id: index + 1,
		image: `./images/${result.image}`
	}));
	displayBooks(books);
};

const displayBooks = (books) => {
    const elementsHTMLString = books
        .map((book) => (`
			<li class="card" onclick="selectBook(${book.id})">
				<img class="card-image" src="${book.image}"/>
				<h2 class="card-title">${book.id}. ${book.name}</h2>
			</li>
		`)).join('');
    dex.innerHTML = elementsHTMLString;
};

const selectBook = async (id) => {
	const url = `\\books.json`;
	const res = await fetch(url);
	const booke = await res.json();
	displayPopup(booke, id);
};

const displayPopup = (booke, id) => {
	const book_ = booke.book[id - 1];
	const image = `./images/${book_.image}`;

	const htmlString = `
		<div class="popup">
			<button id="closeBtn" onclick="closePopup()">Close</button>
			<div class="card">
				<img class="card-image" src="${image}" />
				<h2 class="card-title">
					${book_.id + 1}. ${book_.name}
				</h2>
				<p><small>Published: </small>${book_.published}</p>
			</div>
		</div>
	`;
	dex.innerHTML = htmlString + dex.innerHTML;
};

const closePopup = () => {
	const popup = document.querySelector('.popup');
	popup.parentElement.removeChild(popup);
};

fetchBooks();
