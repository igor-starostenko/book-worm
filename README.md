# book-worm
Google maps bookmark import tool. Using [Puppeteer](https://github.com/GoogleChrome/puppeteer/)

Want to migrate your Google maps starred places to a new account? **book-worm** can help you with it!

### Clone the repo

```
  git clone https://github.com/igor-starostenko/book-worm.git
```

### Installing dependencies

```
  npm install
```

Make sure you have [NodeJS](https://nodejs.org/en/) installed.

### Export bookmarks
Go to https://takeout.google.com/settings/takeout and download the archive of your starred places from “Maps (your places)”.

Open the archive and look for the `.json` file called **Saved Places.json**

Copy the file to the **book-worm** directory.

If the name of the `.json` file is different from **Saved Places.json** then you need to use the right name in the **config.json**.

### Setting up user
Open **config.json** and put email and password of the google account to which you want the bookmarks to be imported to.

### Running the import
Simply run `node src/run.js`

This will start the *Electron* browser that will log in to your google account, and save all the bookmarks from the exported file.

#### 2-factor authentication

If your account requires a 2 factor authentication, you can enter the code directly in the browser.
