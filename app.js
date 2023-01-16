const title = document.getElementById("title");
const author = document.getElementById("author");
const addBtn = document.querySelector(".add-btn");
const table = document.querySelector(".table");

class Book {
  constructor(isim, author) {
    this.title = isim;
    this.author = author;
    this.id = Math.floor(Math.random() * 1000000);
  }
}

class LS {
  static controle() {
    let data;
    if (localStorage.getItem("list") === null) {
      data = [];
    } else {
      data = JSON.parse(localStorage.getItem("list"));
    }
    return data;
  }
  static ekle(kitap) {
    const data = this.controle();
    data.push(kitap);
    localStorage.setItem("list", JSON.stringify(data));
  }

  static bak() {
    const data = this.controle();
    data.forEach((element) => {
      UI.addBook(element);
    });
  }
  static sil(e) {
    const id = parseInt(e.target.parentElement.className.split(" ")[1]);
    const data = this.controle();
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        data.splice(i, 1);
        localStorage.setItem("list", JSON.stringify(data));
      }
    }
  }
}

class UI {
  //Add new book
  static addBook(kitap) {
    if (kitap !== null) {
      const table = document.querySelector(".table");
      const tableItem = document.createElement("div");

      tableItem.classList.add("table-item");
      tableItem.classList.add(`${kitap.id}`);
      tableItem.innerHTML = `
          <p>${kitap.title}</p>
          <p>${kitap.author}</p>
          <button class="delete-btn"><span>Delete</span></button>`;
      table.appendChild(tableItem);

      this.clearText();
    }
  }
  static clearText() {
    title.value = "";
    author.value = "";
  }
  static deleteItem(e) {
    table.removeChild(e.target.parentElement);
  }
}
addBtn.addEventListener("click", (e) => {
  let check = true;
  const kitap = new Book(title.value, author.value);
  const data = LS.controle();
  for (let i = 0; i < data.length; i++) {
    if (kitap.title == data[i].title && kitap.author == data[i].author) {
      check = false;
      alert("You have already add this item");
    }
  }
  if (check == true) {
    LS.ekle(kitap);
    UI.addBook(kitap);
  }
});

table.addEventListener("click", (e) => {
  if (e.target.className === "delete-btn") {
    UI.deleteItem(e);
    LS.sil(e);
  }
});
addEventListener("DOMContentLoaded", LS.bak());
