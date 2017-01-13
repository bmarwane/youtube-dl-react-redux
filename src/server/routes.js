import fs from 'fs'
import path from 'path'
import mime from 'mime'

import bodyParser from 'body-parser'
import youtubeDownload from './downloader'

export default (app) => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.post('/download', function (req, res) {
        youtubeDownload(req.body.id, () => {
            res.status(200).json({id : req.body.id})
        })
    });

    app.get('/getfile', (req, res) => {
        var rootDir = path.dirname(require.main.filename);

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



}