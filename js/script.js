/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

import {data} from './data.js';

let ArrayNew = data;



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   let startIndex = (page * 9) - 9;
   let endIndex = page * 9;
   let ul = document.getElementsByClassName('student-list');
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




/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
let activePage = 1;
function addPagination(list) {
   let linkList = document.getElementsByClassName('link-list');
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


// Call functions

showPage(ArrayNew, 1)
addPagination(ArrayNew)

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
insertSearchBar();



const studentSearch = document.getElementById('studentSearch');
studentSearch.addEventListener('keyup', e => {
   let currentValue = e.target.value.toLowerCase();
   ArrayNew = data.filter(element => element.name.first.toLowerCase().includes(currentValue) || element.name.last.toLowerCase().includes(currentValue));
   console.log(ArrayNew)
   showPage(ArrayNew, 1)
   addPagination(ArrayNew)
});



