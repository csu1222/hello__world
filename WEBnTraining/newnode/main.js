var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    
    if (pathname === '/'){
      if (queryData.id === undefined){
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'hello node.js practice';
          var list = template.List(filelist)
          var html = template.HTML(title, list, 
          `<h2>${title}</h2><p>${description}</p>`,
          '<a href="/create">create</a>');
      
          response.writeHead(200);
          response.end(html);
        });
      } else{
        fs.readdir('./data', function(error, filelist){
          var FilteredId = path.parse(queryData.id).base;
          fs.readFile(`./data/${FilteredId}`, 'utf-8', function(err, description){
            var title = queryData.id
            var list = template.List(filelist)
            var html = template.HTML(title, list, 
              `<h2>${title}</h2><p>${description}</p>`,
              `<a href="/create">create</a>
               <a href="/update?id=${title}">update</a>
               <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${title}">
                <input type="submit" value="delete">
               </form>`);
        
            response.writeHead(200);
            response.end(html);
          })
      });
      }
    }  else if (pathname === '/create') {
      fs.readdir('./data', function(error, filelist){
        var title = 'WEB - CREATE';
        var list = template.List(filelist)
        var html = template.HTML(title, list, 
        `
        <form action="/create_process" method="post">
          <p>
              <input type="text" name="title" placeholder="title">
          </p>
          <p>
              <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
              <input type="submit" value="create">
          </p>
        </form>
        `, '');
    
        response.writeHead(200);
        response.end(html);
      });
    } else if (pathname === '/create_process') {
      var body = '';
      request.on('data', function(data){
        body += data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        /*var title = new URLSearchParams(body).get('title');
        var description = new URLSearchParams(body).get('description');*/
        fs.writeFile(`data/${title}`, description, 'utf-8', function(err){
          response.writeHead(302, {location : `/?id=${title}`});
          response.end();
        });
      });
    } else if (pathname === '/update') {
      fs.readdir('./data', function(error, filelist){
        var FilteredId = path.parse(queryData.id).base;
        fs.readFile(`./data/${FilteredId}`, 'utf-8', function(err, description){
          var title = queryData.id
          var list = template.List(filelist)
          var html = template.HTML(title, list, 
            `
            <form action="/update_process" method="post">
              <p><input type="hidden" name="id" value="${title}"></p>
              <p>
                  <input type="text" name="title" value="${title}">
              </p>
              <p>
                  <textarea name="description">${description}</textarea>
              </p>
              <p>
                  <input type="submit" value="update">
              </p>
            </form>
            `,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
      
          response.writeHead(200);
          response.end(html);
        })
    });
    }else if (pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
        body += data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        fs.rename(`data/${id}`, `data/${title}`, function(err){
          fs.writeFile(`data/${title}`, description, 'utf-8', function(err){
            response.writeHead(302, {location : `/?id=${title}`});
            response.end();
          });
        })
        /*var title = new URLSearchParams(body).get('title');
        var description = new URLSearchParams(body).get('description');*/
        
      });

    } else if (pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
        body += data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var FilteredId = path.parse(id).base;
        /*var title = new URLSearchParams(body).get('title');
        var description = new URLSearchParams(body).get('description');*/
        fs.unlink(`data/${FilteredId}`, function(err){
          response.writeHead(302, {location : `/`});
          response.end();
        })
      });

    } else {
      response.writeHead(404);
      response.end('NOT FOUND');
    };
 
});
app.listen(3000);