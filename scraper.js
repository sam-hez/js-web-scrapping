//importing necessary tools we need axios, cheerio and fs
const axios = require('axios');
const cheerio = require('axios');
const fs = require('fs');

//sources with the quotes to extract
const url = 'https://quotes.toscrape.com';

//async function to open url and scrape data we need
async function quotesScraper() {
    try {

        //download html from quotes to scrape page
        const response = await axios.get(url);
        const html = response.data;

        //load the html into cheerio library so we can query it for the data we need
    } catch (error){
        console.log ('Error scrapping quotes: ', error.message)
    }
}
