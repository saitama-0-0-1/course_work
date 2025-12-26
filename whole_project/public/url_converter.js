
 //display the response from the server
 const sButton = document.getElementById('search-btn');
 sButton.addEventListener('click', displayResponse);
 
 function displayResponse() {
    //create xhttp request object 
    var xhr = new XMLHttpRequest();
    //open the request
    xhr.open("GET", "../product_data.json", true); 
    //set the response type to json 
    xhr.onload = function() {
        if (this.status == 200) {
            // Parse the JSON response
            const data = JSON.parse(this.responseText);
            // Display the data in the console or on the page
             console.log(data);
           const product_list = document.getElementById('c-l-i')
            //product_list.innerHTML = data; // Display the data in the response div
            var output = '';
            for (var i in data) {
              const imageUrl = data[i].image && data[i].image !== "No image" ? data[i].image : "path/to/fallback-image.jpg";
              output +=
                  '<div class="products">' +
                  '<img class="p-img" src="' + imageUrl + '" alt="Product image">' +
                  '<div class="p-det">' +
                  '<div class="p-info">' +
                  '<p>' + data[i].categories + '</p>' +
                  '<i id="p-ellipsis" onclick="ellipse()" class="hgi hgi-stroke hgi-more-vertical-circle-02"></i>' +
                  '<div id="p-tooltip" class="p-tooltip">' +
                  '<a href="' + data[i].link + '" class="option">source</a>' +
                  '<p class="option">share</p>' +
                  '<p class="option">add to chart</p>' +
                  '</div>' +
                  '</div>' +
                  '<div class="p-info">' +
                  '<p class="p-desc">' + data[i].discription + ' desc(stock number)</p>' +
                  '<p class="p-brand">brand</p>' +
                  '</div>' +
                  '<div class="p-info">' +
                  '<p class="p-price">' + data[i].price + '</p>' +
                  '<div class="p-rating">rating</div>' +
                  '</div>' +
                  '<div class="p-info p-info-b">' +
                  '<button class="p-b">buy now</button>' +
                  '<button class="p-b">preview</button>' +
                  '</div>' +
                  '</div>' +
                  '</div>';
            }
            product_list.innerHTML = output;

            // You can also manipulate the DOM to show the data on the page
        } else {
            console.error("Error fetching data: " + xhr.statusText);
        }
        
    };
    //send the request
    xhr.send();
  }
  //end of geting
let url;
function cust_url() {
    // Get the value from the input field
    const text = document.getElementById('search-bar').value;
    // Construct the URL using the input value
     url = "https://www.amazon.co.jp/s?k=" + encodeURIComponent(text);
    // Log the URL to the console
    //window.open(url,'_blank');
}
const inputField = document.getElementById('search-bar');
const postBtn = document.getElementById('search-btn');
// Add event listeners for both button click and Enter key press
postBtn.addEventListener('click', cust_url);
inputField.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        cust_url();
        postInfo(event);
    }
});
// const text = document.getElementById('inputField').value;
// url = "https://www.amazon.co.uk/s?k="+text;

//resquest to the server
const serverUrl = 'http://localhost:8383/'; // Replace with your server URL

//get the data from the server
// postBtn.addEventListener('click', getInfo);
// async function getInfo(e) {
//  e.preventDefault(); // Prevent the page from refreshing
//   const res = await fetch(serverUrl, {
//     method: 'GET'
//   });
//   console.log(res);
//   const data = await res.json();
//   inputField.value = data.info;
// }
//posting data to the server
//const postBtn = document.getElementById('search-btn');
postBtn.addEventListener('click', postInfo);

async function postInfo(e){
  e.preventDefault(); // Prevent the page from refreshing
  if (url === '') {
    alert('Please enter a search term');
    return;
  }
  const res = await fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ parcel: url }) // Send the URL as JSON
  });
}
