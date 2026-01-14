# Social Page

This project is a simple, single-page "link-in-bio" style landing page for a business called "Decor Drapes Instyle". It provides links to their website, social media profiles, and displays their Google Reviews dynamically.

## Features

-   **Social Media Links:** A list of links to the company's various online presences (Website, WhatsApp, Facebook, Instagram, IndiaMART).
-   **Dynamic Google Reviews:** A card that displays the company's average Google rating, total number of reviews, and a snippet from a recent positive review. This data is fetched live.

## How it Works

The project is built with plain HTML, CSS, and JavaScript. It uses a serverless function to fetch Google Reviews data from an external API and then dynamically updates the content of the reviews card on the page.

The project is configured for deployment on Netlify.

### Files

-   `index.html`: The main and only HTML file for the landing page. It contains the structure, styling, and client-side JavaScript.
-   `Logo.svg`: The company logo.
-   `netlify.toml`: The configuration file for Netlify, which specifies the directory for serverless functions.
-   `functions/fetch.js`: A Netlify serverless function written in JavaScript. It fetches review data from a private API endpoint.

### Serverless Function

The `fetch.js` function is responsible for making a server-side request to an API to get the latest Google Reviews data. This is done to hide the actual API endpoint and any necessary keys from the public client-side code.

**Note:** For the function to work, it requires an environment variable named `KYA_KAR_RAHA_HAI_YAHA` to be set in the Netlify deployment environment. This variable should contain the full URL to the API endpoint that provides the Google Reviews data in JSON format.
