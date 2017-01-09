import express from 'express'
import { renderToString } from 'react-dom/server'
import React from 'react';
import { Provider } from 'react-redux';

import webpackMiddleware from '../../webpack.dev'

import {initStore} from '../shared/store'
import {App} from '../shared/components/App'


var app = express();

if (process.env.NODE_ENV !== 'production') {
    webpackMiddleware(app);
}

app.get('/', function (req, res) {
    res.end(renderPage())
});

function renderPage(){

    const store = initStore()

    const componentHTML = renderToString(<Provider store={store}>
                                        <App />
                                    </Provider>);
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Youtube downloader example</title>

          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
          
        </head>
        <body>
          <div id="app">${componentHTML}</div>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>
      `;

}

export default app