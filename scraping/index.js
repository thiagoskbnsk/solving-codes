// get all authors
// get by author

// all quotes
// quote by tag
// quote by author

const express = require('express');
const { Router } = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const init = async () => {
  const app = express();
  const routes = Router();
  const url = 'http://quotes.toscrape.com';

  let quotes = [];

  let i = 1;

  const getBiography = async (url, quotePosition) => {
    const bioResponse = await axios.get(url);
    const $bio = cheerio.load(bioResponse.data);
    const biography = $bio('div[class="author-description"]').text();
    quotes[quotePosition].biography = biography;
  }

  while (i) {
    const content = await axios.get(`${url}/page/${i}`);
    const $ = cheerio.load(content.data);

    $('[itemscope]').each(async (i, e) => {
      const quote = $(e).find('[itemprop="text"]').text();
      const author = $(e).find('[itemprop="author"]').text();
      const authorLink = $(e).find('[itemprop="author"] + a').attr('href');
      const tags = $(e).find('[itemprop="keywords"]').attr('content').split(',')
            
      const position = quotes.push({
        quote,
        author,
        tags,
        biography: null,
      });

      getBiography(`${url}${authorLink}`, position - 1);
    });

    const haveNext = $('[class="next"]')[0];

    i = haveNext ? i + 1 : 0;
  }

  const filterByAuthor = (quotes, author) => quotes.filter(quote => {
    return quote.author === author
  });

  const filterByTag = (quotes, tag) => quotes.filter(quote => {
    return quote.tags.includes(tag)
  });

  routes.get('/quotes', (req, res) => {
    const { tag, author } = req.query;

    let data = quotes;

    if (tag) {
      data = filterByTag(quotes, tag);
    } if (author) {
      data = filterByAuthor(quotes, author);
    }

    res.json({ data });
  });

  app.use(routes);
  app.listen(3000);
}

init();