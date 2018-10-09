const perf = require('execution-time')();
const parser = require('node-html-parser').parse;
const axios = require('axios');
const fs = require('fs');
const download = require('image-downloader');
const del = require('delete');

// start timer
perf.start();

// Get the csvfile path
const csvFile = process.argv[2] ? process.argv[2] : 'veg.csv';

// Config the scrapper
const config = {
    // Number of images to get on each picture, if not set, set default to 4
    Samples: (process.argv[3]) ? process.argv[3] : 4,
    // Where to store the downloaded image, if not set, set default to ./images
    store: "./images/"
};


// Function to prepare the URL
function URL(veg) {
    return `https://ecosia.org/images?q=${veg}`;
}



// Function to download the image
async function downloadIMG(options) {
    try {
        var {
            filename,
            image
        } = await download.image(options);
        console.log("", "", "[Info] Downloaded: " + filename); // => /path/to/dest/image.jpg 

    } catch (e) {
        console.error("", "", "[Info] Error: Unable to download " + filename);
    }
}


// function to scrape the page
async function scrap(url, name) {
    try {
        // Request the page
        var response = await axios.get(url);
        console.log("[INFO]:", "Scrapping " + name);
        // create a folder where to store the images if it does not exits
        if (!fs.existsSync(config.store + name)) {
            fs.mkdirSync(config.store + name);
        } else {
            // if it exists delete and recreate
            del.sync(config.store + name);
            fs.mkdirSync(config.store + name);
        }

        //parse the response
        var dom = parser(response.data);
        var imgs = dom.querySelectorAll("a.image-result");
        for (var x = 0; x < imgs.length; x++) {
            // console.log(imgs[x].attributes.href);
            await downloadIMG({
                url: imgs[x].attributes.href,
                dest: config.store + name
            });
            if (x >= (config.Samples - 1)) break;
        }

    } catch (e) {
        console.error("", "[Info] Error: Unable to GET " + url);
        console.log(e);
    }
}


//load and read csv file
var contents = fs.readFileSync(csvFile, 'utf8');
var vegetables = contents.split(",");

async function initScrap() {
    for (var i = 0; i < vegetables.length; i++) {
        await scrap(URL(vegetables[i]), vegetables[i]);
        if (i == (vegetables.length - 1)) console.log("[Info]  Done in", ((perf.stop()).time / 1000).toFixed(2) + "s");
    }
}

initScrap();