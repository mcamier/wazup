import express from 'express';
import React from 'React';
import ReactDOMServer from 'react-dom/server';

import App from '../components/App';
import {port} from './config';

const server = express();

server.use(express.static('dist'));

server.get('/', (req, res) => {
  const initialMarkup = ReactDOMServer.renderToString(<App />);

  res.send(`
        <html>
            <head>
                <title>Sample React Application</title>
                <link href="https://fonts.googleapis.com/css?family=Titillium+Web&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="./main.css">
            </head>

            <body>
                <div id='mountNode'>${initialMarkup}</div>
                <script src="/main.js"></script>
            </body>
        </html>
    `);
});

server.listen(port, () => console.log('server is running...'));