import express from 'express'
import { renderToString } from 'react-dom/server'
import React from 'react';
import { Provider }              from 'react-redux';



import {initStore} from '../shared/store'


var app = express();

app.get('/', function (req, res) {
    res.end(renderPage())
});

function renderPage(){

    const store = initStore()

    const componentHTML = renderToString(<Provider store={store}>
                                            <h1>Hello boy</h1>
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
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>
      `;

}

export default app