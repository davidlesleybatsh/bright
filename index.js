import axios from "axios";
import * as cheerio from 'cheerio';
import express, { response } from "express";
import getenv from "getenv";

// const env = getenv();
const PORT = 3000;
let search = "";

const app = express();

const url = `https://www.kleinanzeigen.de/s-umzug-berlin/k0`;
// const url = `https://www.theguardian.com/uk`;

axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const articles = [];

        console.log("Show me some Html", html)

        $('.SOME__CLASS', html).each(function() {
            const title = $(this).text();
            const link = $(this).find('a').attr('href');

            articles.push({
                title,
                link
            })
        })
        console.log("Articles", articles);
    }).catch(err => console.log(err));


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
