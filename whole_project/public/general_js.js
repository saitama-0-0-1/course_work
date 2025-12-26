// for menu toggle
const dashboard =document.getElementById("dashboard");
const main_body =document.getElementById("main-body");

function toggle_menu(){ 
    //dashboard.style.display = "none";
   if (dashboard.style.display=="none"){ 
        dashboard.style.display="flex";
        main_body.style.display="grid";
    }
    else{
        dashboard.style.display="none"
        main_body.style.display="inline-flex";
    } 
}
//function for product
//p-ellipse
function ellipse(){
  const ellipse = document.getElementById('p-tooltip');
  if (ellipse.style.visibility === "hidden") {
    ellipse.style.visibility = "visible";
  }
  else {
    ellipse.style.visibility = "hidden";
  }
}
//function for css loader to be added
function css_loader() {
  // Get the page element
  const page = document.getElementById('page');

  // Clear the current content of the page
  page.innerHTML = '';

  // Create a span element for the loader
  const loader = document.createElement('span');
  loader.className = 'loader';

  // Append the loader to the page element
  page.appendChild(loader);

}
/*ajax request*/

//declearing variables
 const pr_set = document.getElementById('pr_set');
 const page = document.getElementById('page');

//creation eventlistener
//pr_set.addEventListener('click',loadPage);

// function loadPage() {
//  css_loader(); // Call the css_loader function to show the loader`

//   //creating xhr object
//   var xhr = new XMLHttpRequest();

//   //creating a request
  
//   xhr.open('GET', 'pr_set.html', true);

//   //setting the response type
//   xhr.onload= function(){

//       if (this.status == 200) {
//           page.innerHTML = this.responseText;
//       }
//       else {
//         console.error('Element with id "page" not found.');
//     }
//   };

//   //sending the request
//   xhr.send();
  
// };

//function for corusel

// let list = document.querySelector(' .hero_section .list ');
// let items = document.querySelectorAll('.hero_section .list .item');
// let dots = document.querySelectorAll('.hero_section .dots li ');
// let next = document.getElementById('next');
// let prev = document.getElementById('prev');

// let active = 0;
// let lengthItems = items.length - 1;

//  function next_onclick(){
  
//    if(active + 1 > lengthItems){
//      active = 0;

//    }
//    else{
//      active = active + 1;
//    }
   
//    reloadslider();
//  };
//  function prev_onclick(){
  
//  if(active - 1 < 0){
//    active = lengthItems;
//  }
//  else{
//    active = active - 1;
//  }
//  reloadslider();
// };

// let refreshSlider = setInterval(() => {
//  next.click();
// }, 6000);

//   function reloadslider(){
//    let checkleft = items[active].offsetLeft;
//    list.style.left = -checkleft + 'px';

//    let lastActiveDot = document.querySelector('.hero_section .dots li.active');
//    lastActiveDot.classList.remove('active');
//    dots[active].classList.add('active');
//  };

//  dots.forEach((li, key) => {
//    li.addEventListener('click', () => {
//      active = key;
//      reloadslider();
//    });
//  });
//filter search scroling
document.addEventListener("DOMContentLoaded", () => {
  const filterSearch = document.querySelector(".filter-search");
  const prevButton = document.getElementById("s_prev");
  const nextButton = document.getElementById("s_next");

  // Scroll left when the previous button is clicked
  prevButton.addEventListener("click", () => {
   
      filterSearch.scrollBy({
          left: -700, // Adjust the scroll amount as needed
          behavior: "smooth", // Smooth scrolling
      });
    
  });

  // Scroll right when the next button is clicked
  nextButton.addEventListener("click", () => {
    
      filterSearch.scrollBy({
          left: 700, // Adjust the scroll amount as needed
          behavior: "smooth", // Smooth scrolling
      });
     
  });

   // Function to check the scroll position
   function checkScrollPosition() {
    const isAtStart = filterSearch.scrollLeft === 0;
    const isAtEnd = filterSearch.scrollLeft + filterSearch.clientWidth >= filterSearch.scrollWidth;

    // Show or hide the previous button
    if (isAtStart) {
        prevButton.style.display = "none";
    } else {
        prevButton.style.display = "block";
    }

    // Show or hide the next button
    if (isAtEnd) {
        nextButton.style.display = "none";
    } else {
        nextButton.style.display = "block";
    }
}
 // Attach the scroll event listener to dynamically check the scroll position
 filterSearch.addEventListener("scroll", checkScrollPosition);

 // Initial check to set button visibility on page load
 checkScrollPosition();
});
