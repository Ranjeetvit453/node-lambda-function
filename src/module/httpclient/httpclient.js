"use strict"

module.exports = class httpclient {

    //#region client ctor
    constructor(url) {
        this._url = url;
        this._urlparser = require('url');
        this._parsedUrl = this._urlparser.parse(this._url, true, true);
        this._lib = this._parsedUrl.protocol.startsWith('https') ? require('https') : require('http');
        this._defaultport = this._parsedUrl.protocol.startsWith('https') ? 443 : 80;
    }
    //#endregion client ctor

    //#region HTTP GET
    //Get the document for the given URL and return the response payload
    get() {
        return new Promise((resolve, reject) => {
            const request = this._lib.get(this._url, (response) => {
                if (response.statusCode < 200 || response.statusCode > 299) {
                    return reject(new Error('Failed to load page, status code: ' + response.statusCode));
                }
                const body = [];
                response.on('data', (chunk) => body.push(chunk));
                response.on('end', () => {
                    return resolve(body.join(''));
                });
            });
            request.on('error', (err) => {
                return reject(err);
            })
        })
    }
    //#endregion HTTP GET

    //#region HTTP POST
    //Post data to given URL and return the response payload
    post(custom_headers, post_data, cert, key, contentType, pfx, passphrase) {

        return new Promise((resolve, reject) => {

            var post_options = {
                host: this._parsedUrl.hostname,
                port: this._parsedUrl.port === null ? this._defaultport : this._parsedUrl.port,
                path: this._parsedUrl.path,
                method: 'POST',
                headers: {
                    'Content-Length': Buffer.byteLength(post_data),
                    'Content-Type': contentType ? contentType.toString() : 'application/json'
                }
            };

            //set timeout in ms
            if (process.env.httpClientTimeout) post_options.timeout = parseInt(process.env.httpClientTimeout);

            //set optional http(s) option values
            if (cert) post_options.cert = cert;
            if (key) post_options.key = key;
            if (pfx) post_options.pfx = pfx;
            if (passphrase) post_options.passphrase = passphrase;

            for (var attributename in custom_headers) {
                post_options.headers[attributename] = custom_headers[attributename];
            }

            const request = this._lib.request(post_options, (response) => {

                if (response.statusCode !== 400 && (response.statusCode < 200 || response.statusCode > 299)) {
                    return reject(new Error('Failed to load page, status code: ' + response.statusCode));
                }
                const body = [];
                response.on('data', (chunk) => body.push(chunk));
                response.on('end', () => {
                    return resolve(body.join(''));
                });
            });

            // use its "timeout" event to abort the request
            request.on('timeout', () => {
                request.destroy();
            });

            request.on('error', (err) => {
                return reject(err);
            });
            request.write(post_data);
            request.end();
        });

    }
    //#endregion HTTP POST
};