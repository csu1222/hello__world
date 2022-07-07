var http = require('http');
var url = require('url');
var db = require('../lib/db');

var app = http.createServer(function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if (pathname == '/'){
        var html = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - test GET</title>
          <meta charset="utf-8">
          <style>
            a {color : black;
              text-decoration: none;}
          </style>
        </head>
        <body>
            <form action="/test_get" method="get">
            <p>
                <input type="text" name="name" placeholder="name">
            </p>
            <p>
                <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
                <input type="submit">
            </p>
            </form>
        </body>
        </html>`;
        response.writeHead(200);
        response.end(html);
    } else if (pathname == '/test_get') {
        var body = '';
        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(){
            //var name = new URLSearchParams(body).get('name');
            //var description = new URLSearchParams(body).get('description');
            var name = queryData.name;
            var description = queryData.description;
            var html = `
            <!doctype html>
            <html>
            <head>
            <title>WEB1 - test GET</title>
            <meta charset="utf-8">
            <style>
                a {color : black;
                text-decoration: none;}
            </style>
            </head>
            <body>
            <h2> name : ${name}</h2>
            <p> description : ${description}</p>
            </body>
            </html>`;
            console.log(queryData)
            response.writeHead(200);
            response.end(html);
        });
    }
});

app.listen(2000);