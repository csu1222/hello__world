var http = require('http');
var url = require('url');
var template = require('./lib/template.js');
var db = require('./lib/db');
var topic = require('./lib/topic');
var author = require('./lib/author');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if (pathname === '/'){
      if (queryData.id === undefined){
        topic.home(request, response);
      // ./lib/topic.js 로 옮겼습니다.
      } else{
        topic.content(request, response);
      }
      //   db.query(`SELECT * FROM topic`, function(error, topics){ // 제 나름대로 구현 해봤는데 어느쪽이 좋은지 모르겠습니다.
      //     if (error) {
      //       throw error;
      //     }
      //     console.log(queryData);
      //     var title = template.Title(topics, queryData);
      //     var sanitizedTitle = sanitizeHtml(title);
      //     var description = template.Description(topics, queryData);
      //     var sanitizedDescription = sanitizeHtml(description);
      //     var list = template.List(topics)
      //     var html = template.HTML(sanitizedTitle, list, 
      //             `<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`,
      //             `<a href="/create">create</a>
      //               <a href="/update?id=${sanitizedTitle}">update</a>
      //               <form action="delete_process" method="post">
      //               <input type="hidden" name="id" value="${sanitizedTitle}">
      //               <input type="submit" value="delete">
      //               </form>`);
      //   response.writeHead(200);
      //   response.end(html);
      // })
      // }
    }  else if (pathname === '/create') {
      topic.create(request, response);
    } else if (pathname === '/create_process') {
      topic.create_process(request, response);
    } else if (pathname === '/update') {
      topic.update(request, response);
    }else if (pathname === '/update_process'){
      topic.update_process(request, response);
    } else if (pathname === '/delete_process'){
      topic.delete_process(request, response);
    } else if (pathname == '/author') {
      author.home(request, response);
    } else {
      response.writeHead(404);
      response.end('NOT FOUND');
    };
 
});
app.listen(3000);