const puppeteer = require('puppeteer');
const config = require('../config.json');

const { fileName, email, password } = config;

const featureCollection = require(`../${fileName}`);

const fetchGoogleUrls = (collection) => {
  return collection.features.map((feature) => {
    return feature.properties['Google Maps URL'];
  });
};

const uniqValues = array => Array.from(new Set(array));

const googleMapUrls = fetchGoogleUrls(featureCollection);
const urls = uniqValues(googleMapUrls);

(async () => {
   const browser = await puppeteer.launch({ headless: false });
   const page = await browser.newPage();
   await page.goto('https://accounts.google.com/signin/v2');

   await page.type('input[type="email"]', email);
   await page.click('#identifierNext');

   await page.waitFor(1000);

   await page.type('input[type="password"]', password);
   await page.click('#passwordNext');

   // wait for 2 factor authentication;
   await page.waitFor('header[role="banner"]');

   for(let i = 0; i < urls.length; i += 1) {
     console.log(`${i}: ${urls[i]}`);

     try {
       await page.goto(urls[i]);
       await page.waitFor('#searchbox');
       await page.waitFor(2000);
       await page.click('[aria-label="SAVE"]');
       await page.click('.maps-sprite-pane-action-ic-list-starred-fg');
       await page.waitFor(2000);
       console.log(`${i}: Saved`);
     } catch (e) {
       console.log(`${i}: Failed to save`);
     }
   }

   await browser.close();
})()
