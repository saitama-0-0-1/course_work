/*
// This is a simple Express server that listens on port 8383

const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const cors = require('cors');
const port = 8383;

app.use(cors()); // Enable CORS for all routes
app.use(express.static('public'));// Serve static files from the 'public' directory

app.use(express.json()); // Parse JSON request bodies let express know it will be requesting json
// app.get('/info', (req, res) => {
//     res.status(200).json({info: 'Server is running'}); // Respond with a JSON object
// });
app.post('/', (req, res) => {
    const parcel = req.body; // Get the parsed JSON data from the request body
    console.log(parcel); // Log the received data to the console
    if (!parcel) {
        return res.status(400).send({status: 'No data received'}); // Send a 400 Bad Request response if no data is received
    }
    res.status(200).send({status:'recieved'}); // Respond with the same data
})

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
*/
const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const app = express();
const fs = require('fs');
const port = 8383;

let data; // Variable to store the scraped data
let parcel; // Variable to store the URL



app.use(cors()); // Enable CORS for all routes
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(express.json()); // Parse JSON request bodies

app.post('/', async (req, res) => {
    const parcel = req.body.parcel; // Extract the URL from the request body
    console.log(parcel); // Log the received data to the console

    if (!parcel) {
        return res.status(400).send({ status: 'No data received' }); // Send a 400 Bad Request response if no data is received
    }

    try {
        // were scraping the page using puppeteer beginning here

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Navigate to the URL
        await page.goto(parcel);

        // Set screen size
        await page.setViewport({ width: 1080, height: 1024 });

        // Example Puppeteer actions (customize as needed)

        const title = await page.title(); // Get the page title
        const searchResults = await page.waitForSelector('.s-main-slot .s-result-item'); // Wait for an element to load (example)

        const results = await page.evaluate(() => {
            const productList = Array.from(document.querySelectorAll('.s-main-slot .s-result-item'));
            return productList.map(item => {
                const categories = item.querySelector('.a-color-secondary ')?.innerText || 'No title';
                const price = item.querySelector('.a-price ')?.innerText || 'No price';
                const discription = item.querySelector('.s-title-instructions-style')?.innerText || 'No description';
                const image = item.querySelector('.s-image')?.src || 'No image';
                const link = item.querySelector('.a-link-normal')?.href || 'No link';
                return { categories, price , discription , image, link };
            });
        });
        
        data = JSON.stringify(results, null, 2); // Convert the results to a JSON string
      
        console.log(data); // Log the page title and search results
     

        await browser.close();

        //it ends here
        
 // file magic begins here
 const filePath = './product_data.json'; // Path to the JSON file

// Read the existing file and handle empty or invalid JSON
// Load existing data
let existingData = [];
if (fs.existsSync(filePath)) {
    try {
        existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
        console.error('Error parsing JSON file. Initializing with an empty array.');
        existingData = [];
    }
}

// New data to be added or replace existing data

// Replace or add new data
results.forEach(newItem => {
    const existingIndex = existingData.findIndex(d => d.link === newItem.link || d.image === newItem.image);    // Corrected variable usage
    if (existingIndex !== -1) {
        // Replace the existing item
        existingData[existingIndex] = newItem;
    } else {
        // Add the new item if it doesn't exist
        existingData.push(newItem);
    }
});

// Save the updated data back to the file
fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');

        // Respond with success and the page title
        res.status(200).send({ status: 'received', title });
    } catch (error) {
        console.error('Error with Puppeteer:', error);
        res.status(500).send({ status: 'error', message: error.message });
    }
});


app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
