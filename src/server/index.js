import express from 'express'
import { renderToString } from 'react-dom/server'
import React from 'react';
import { Provider } from 'react-redux';

import webpackMiddleware from '../../webpack.dev'
import bodyParser from 'body-parser'
import fs from 'fs'
import path from 'path'
import mime from 'mime'


import {initStore} from '../shared/store'
import {App} from '../shared/components/App'
import youtubeDownload from './downloader'

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV !== 'production') {
    webpackMiddleware(app);
}

app.get('/', function (req, res) {
    res.end(renderPage())
});

var rootDir = path.dirname(require.main.filename);

app.get('/getfile', (req, res) => {
    var file = rootDir + '/' + req.query.id + '.mp4';

    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.on('end', function() {
        fs.unlink(file);
    });
    filestream.pipe(res);

})
app.post('/download', function (req, res) {
    youtubeDownload(req.body.id, () => {
        res.status(200).json({id : req.body.id})
    })
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