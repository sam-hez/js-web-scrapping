//importing necessary tools we need axios, cheerio and fs
const axios = require('axios');
const cheerio = require('cheerio');
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
        const $ = cheerio.load(html);
        const quotes = [];

        $('div.quote').each((i, el) => {
            const text = $(el).find('span.text').text().trim();
            const author = $(el).find('small.author').text().trim();
            const tags = [];
            $(el).find('div.tags a.tag').each((_, t) => tags.push($(t).text().trim()));
            quotes.push({ text, author, tags });
        });

        fs.mkdirSync('output', { recursive: true });
        fs.writeFileSync('output/quotes.json', JSON.stringify(quotes, null, 2), 'utf8');
        console.log('Wrote', quotes.length, 'quotes to output/quotes.json');
        console.table(quotes);

    } catch (error){
        console.log ('Error scrapping quotes: ', error.message);
    }
}

quotesScraper();
