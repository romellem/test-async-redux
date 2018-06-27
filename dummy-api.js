const express = require('express');
const cors = require('cors');
const app = express();

// Dummy data
const faker = require('faker');
const changeCase = require('change-case');

const ARTICLES = {};
let id = 0;

// Generate 20 articles
for (let i = 0; i < 20; i++) {
    id++;
    ARTICLES[id] = {
        id,
        title: changeCase.title(faker.lorem.words(5)),
        body:
            '<p>' +
            Array(5)
                .fill()
                .map(() => faker.lorem.paragraph())
                .join('</p><p>') +
            '</p>',
    };
}
const ARTICLES_LIST = [];
for (let id in ARTICLES) {
    ARTICLES_LIST.push({
        id,
        title: ARTICLES[id].title,
    });
}

// Routes
app.use(express.json());
app.use(cors());

app.get('/api/article', (req, res) => {
    // Wait between 250ms and 1000ms before response
    let delay = Math.round(Math.random() * 750) + 250;
    console.log(`Waiting ${delay}ms for API response from "${req.url}"`);
    setTimeout((req, res) => res.json(ARTICLES_LIST), delay, req, res);
});

app.get('/api/article/:id', (req, res) => {
    const { id } = req.params;
    if (!ARTICLES[id]) {
        let error = `ERROR in looking up article "${id}"`;
        console.error(error);
        return res.status(500).send({ error });
    }

    // Wait between 250ms and 1000ms before response
    let delay = Math.round(Math.random() * 750) + 250;
    console.log(`Waiting ${delay}ms for API response from "${req.url}"`);
    setTimeout((req, res) => res.json(ARTICLES[id]), delay, req, res);
});

app.get(`*`, (req, res) => {
    // All other paths
    res.status(400).send({
        error: 'Invalid route. Valid routes are: "' + '/api/article' + '" and "' + '/api/article/:id' + '"',
    });
});

const SERVER_PORT = 6060;
server = app.listen(SERVER_PORT);

console.log(`Running API Server on port: ${SERVER_PORT}`);
