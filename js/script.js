// Gloabl Variables

import {data} from './data.js';

let ArrayNew = data;
let ul = document.getElementsByClassName('student-list');
let linkList = document.getElementsByClassName('link-list');
let studentSearch;
let activePage = 1;


// showPage function - display 9 students on each page

function showPage(list, page) {
   let startIndex = (page * 9) - 9;
   let endIndex = page * 9;
   ul[0].innerHTML = "";
   for (let i = startIndex; i >= startIndex && i < endIndex && i < list.length ; i++) {
      let studentHTML = 
      `
      <li class="student-item cf">
         <div class="student-details">
            <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
         </div>
      </li>
      `;
      ul[0].insertAdjacentHTML("beforeend", studentHTML);
   }
}


// addPagination Function - insert pagination buttons


function addPagination(list) {
   linkList[0].innerHTML = "";
   let numberOfButtons = Math.ceil(list.length / 9);
   for (let i = 0; i < numberOfButtons; i++) {
      if (i + 1 == activePage) {
      let button = 
         `
         <li>
            <button type="button" class="active">${i + 1}</button>
         </li>
         `;
         linkList[0].insertAdjacentHTML("beforeend", button);
      } else {
         let button = 
         `
         <li>
            <button type="button">${i + 1}</button>
         </li>
         `;
         linkList[0].insertAdjacentHTML("beforeend", button);
      }
   }
   eventButtons();
}


// Function for Event Listeners on Pagination Buttons

function eventButtons() {
let buttons = document.querySelectorAll("button");
for (let i = 0; i < buttons.length; i++) {
   buttons[i].addEventListener("click", e => {
      activePage = e.target.innerHTML;
      showPage(ArrayNew, e.target.innerHTML);
      addPagination(ArrayNew)
   })
}
}

// Function to insert search bar on page

function insertSearchBar() {
   let header = document.querySelector("header");
   let searchBarHTML = 
   `
   <div class="student-search">
   <input type="text" id="studentSearch" class="studentSearch" placeholder="Search by name...">
   <button>
      <img src="../img/icn-search.svg">
   </button>
   </div>
   `;
   header.insertAdjacentHTML("beforeend", searchBarHTML)
}

// Call functions for showPage, addPagination, and insertSearchBar

showPage(ArrayNew, 1)
addPagination(ArrayNew)
insertSearchBar();


// Event listener for student search bar

studentSearch = document.getElementById('studentSearch');
studentSearch.addEventListener('keyup', e => {
   let currentValue = e.target.value.toLowerCase();
   ArrayNew = data.filter(element => element.name.first.toLowerCase().includes(currentValue) || element.name.last.toLowerCase().includes(currentValue));
   if (ArrayNew.length == 0) {
      ul[0].innerHTML = "<h1>No Results</h1>"
      linkList[0].innerHTML = "";
   } else {
   showPage(ArrayNew, 1)
   addPagination(ArrayNew)
}
});



