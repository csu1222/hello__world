var fs = require('fs');
var qs = require('querystring');
module.exports = {
    HTML:function (title, list, body, control){
      return`
      <!doctype html>
      <html>
      <head>
        <title>WEB2 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${control}
        ${body}
      </body>
      </html>
      `
    },
    list:function (filelist){ 
      var list = `<ul>`;
      var i = 0;
      while(i < filelist.length){
        list = list+`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i = i + 1;
      };
      list = list + `</ul>`;
      return list;
    },
    home:function(response){
      fs.readdir('./data', function(error, filelist){
  
      var title = 'Welcome'
      var description = 'Hello, Node.js'
      var list = this.list(filelist);
      var html = this.HTML(title, list,
         `<h2>${title}</h2>${description}`, 
         `<a href="/create">create</a>`);
        response.writeHead(200);
        response.end(html);
      })
    },
    contents:function(queryData, response){
      fs.readdir('./data', function(error, filelist){
        fs.readFile(`data/${queryData.get('id')}`, 'utf-8', function(err, description){
          var title = queryData.get('id')
          var list = this.list(filelist);
          var html = this.HTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a> 
             <a href="/update?id=${title}">update</a>
             <form action="delete_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <input type="submit" value="delete">
             </form>`);
          response.writeHead(200);
          response.end(html);
          })
        })
    },
    create: function(response){
      fs.readdir('./data', function(error, filelist){
        var title = 'WEB - create';
        var list = this.list(filelist);
        var html = this.HTML(title, list,
           `
           <form action="/create_process" 
            method="post">
            <p>
                <input type="text" name="title" placeholder="title">
            </p>
            <p>
                <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
                <input type="submit">
            </p>
            </form>
           `, '');
          response.writeHead(200);
          response.end(html);
        });
    },
    createProcess: function(request, response){
      var body = '';
      request.on('data', function(data){
        body += data;
      });
      request.on('end', function(end){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        /*var title = new URLSearchParams(body).get('title');
        var description = new URLSearchParams(body).get('description');*/
        // 현재는 qs(querystring)을 쓰지 않고 주석 처럼 URLSearchParams(init)
        // 을 쓰는듯 합니다.
        fs.writeFile(`data/${title}`, description, 'utf-8', 
        function(err){
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        })
      });
    },
    update: function(queryData, response){
    fs.readdir('./data', function(error, filelist){
      fs.readFile(`data/${queryData.get('id')}`, 'utf-8', function(err, description){
        var title = queryData.get('id')
        var list = this.list(filelist);
        var html = this.HTML(title, list,
          `
          <form action="/update_process" method="post">
          <input type="hidden" name="id" value=${title}>
          <p>
              <input type="text" name="title" placeholder="title" value=${title}>
          </p>
          <p>
              <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
              <input type="submit">
          </p>
          </form>
          `,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
        response.writeHead(200);
        response.end(html);
      })
    })
    },
    updateProcess:function(request, response){
      var body = '';
      request.on('data', function(data){
        body += data;
      });
      request.on('end', function(end){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        var id = post.id;
        fs.rename(`data/${id}`, `data/${title}`, function(err){
          fs.writeFile(`data/${title}`, description, 'utf-8', 
          function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          })
        })
        /*var title = new URLSearchParams(body).get('title');
        var description = new URLSearchParams(body).get('description');*/
        // 현재는 qs(querystring)을 쓰지 않고 주석 처럼 URLSearchParams(init)
        // 을 쓰는듯 합니다.
      });
    },
    deleteProcess: function(request, response){
    var body = '';
    request.on('data', function(data){
      body += data;
    });
    request.on('end', function(end){
      var post = qs.parse(body);
      var id = post.id;
      fs.unlink(`data/${id}`, function(err){
        response.writeHead(302, {Location: `/`});
          response.end();
      })
    });
    }
  }

