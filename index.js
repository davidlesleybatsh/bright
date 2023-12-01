import axios from "axios";
import * as cheerio from 'cheerio';
import express, { response } from "express";
import getenv from "getenv";

// const env = getenv(); fix it, Felix Junior, Ralphs Wrecking
const PORT = 3000;
const app = express();

try {
    const axioResponse = await axios.request({
        method: "GET",
        url: "https://www.kleinanzeigen.de",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    })
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const articles = [];

            console.log("Show me some Html", html)

            // just Any Class. POC - Ebay does pre/re/MagicAgain/ChangeDOM
            $('.position-relative', html).each(function () {
                const title = $(this).text();
                const link = $(this).find('h3').attr('href');

                console.log("Articles", html);
                articles.push({
                    title,
                    link
                })
            })
            console.log("Articles", articles);
        }).catch(err => console.log(err));

} catch {
    err => console.log(err);
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
