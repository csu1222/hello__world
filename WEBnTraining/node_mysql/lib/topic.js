var db = require('./db');
var template = require('./template');
var url = require('url');
var sanitizeHtml = require('sanitize-html');


exports.home =function(request, response){ 
    db.query(`SELECT * FROM topic`, function(error, topics){
        var title = 'Welcome';
        var description = 'hello node.js practice';
        var list = template.List(topics)
        var html = template.HTML(title, list, 
        `<h2>${title}</h2><p>${description}</p>`,
        `<a href="/create">create</a> 
        ${template.SearchForm()}`);
    response.writeHead(200);
    response.end(html);
});
}

exports.content = function(request, response){
     //생활코딩에서 알려주신 상세보기 페이지 구현
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
     db.query(`SELECT * FROM topic`, function(error,topics){
        if(error){
          throw error;
        }
        db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`,[queryData.id], function(error2, topic){ 
          if(error2){                  // mysql 라이브러리를 이용해서 구현하셨습니다. 
            throw error2;
          }
         var title = topic[0].title;
         var description = topic[0].description;
         var list = template.List(topics);
         var html = template.HTML(title, list,
           `<h2>${sanitizeHtml(title)}</h2>${sanitizeHtml(description)}
           <p>by ${sanitizeHtml(topic[0].name)}</p>`,
           ` <a href="/create">create</a>
               <a href="/update?id=${queryData.id}">update</a>
               ${template.SearchForm()}
               <form action="delete_process" method="post">
                 <input type="hidden" name="id" value="${queryData.id}">
                 <input type="submit" value="delete">
               </form>`
         );
         response.writeHead(200);
         response.end(html);
        })
     });
}

exports.create = function(request, response){
    db.query(`SELECT * FROM topic`, function(error, topics){
        if (error) {
          throw error;
        }
        db.query(`SELECT * FROM author`,function(error2, authors){
          if(error2){throw error2};
          var tag = template.authorSelect(authors);
          var title = sanitizeHtml(topics[0].title)
          var list = template.List(topics);
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
                  ${tag}
                </p>
                <p>
                    <input type="submit" value="create">
                </p>
              </form>
              `, '');
              response.writeHead(200);
              response.end(html);
        });
      });
}

exports.create_process = function(request, response){
    var body = '';
    request.on('data', function(data){
      body += data;
    });
    request.on('end', function(){
      var author = new URLSearchParams(body).get('author');
      var title = new URLSearchParams(body).get('title');
      var description = new URLSearchParams(body).get('description');
      db.query(`INSERT INTO topic (title, description, created, author_id) 
                VALUES (?, ?, NOW(), ?)`, [title, description, author],
                function(error, result){
                  if (error){throw error};
                  response.writeHead(302, {location : `/?id=${result.insertId}`});
                  response.end();
                })
    });
}

exports.update = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM topic`, function(error, topics){
        if (error) {
          throw error;
        }
        db.query(`SELECT * FROM topic WHERE id=?`,[queryData.id],function(error2, topic){
         if (error2){throw error2};
         db.query(`SELECT * FROM author`,function(error2, authors){
          if (error2){throw error2}
          var tag = template.authorSelect(authors, topic[0].author_id);
          var title = sanitizeHtml(topic[0].title);
          var description = sanitizeHtml(topic[0].description);
          var list = template.List(topics);
          var html = template.HTML(title, list,
            `
              <form action="/update_process" method="post">
              <p><input type="hidden" name="id" value="${queryData.id}"></p>
                <p>
                    <input type="text" name="title" value=${title}>
                </p>
                <p>
                    <textarea name="description" >${description}</textarea>
                </p>
                <p>
                ${tag}
                </p>
                <p>
                    <input type="submit" value="update">
                </p>
              </form>
              `, '');
              response.writeHead(200);
              response.end(html);
        });});
        });
};

exports.update_process = function(request, response){
    var body = '';
    request.on('data', function(data){
      body += data;
    });
    request.on('end', function(){
      var author = new URLSearchParams(body).get('author');
      var id = new URLSearchParams(body).get('id');
      var title = new URLSearchParams(body).get('title');
      var description = new URLSearchParams(body).get('description');
      db.query(`UPDATE topic SET title = ?, description = ?, author_id = ? WHERE id = ?`,[title, description, author, id],
       function(error, topics){
        if (error){throw error}
        response.writeHead(302, {location : `/?id=${id}`});
        response.end();
      })
    });
}

exports.delete_process = function(request, response){
    var body = '';
    request.on('data', function(data){
      body += data;
    });
    request.on('end', function(){
      var id = new URLSearchParams(body).get('id');
      db.query(`DELETE FROM topic WHERE id=?`, [id],function(error, topics){
        if (error){throw error}
        response.writeHead(302, {location : `/`});
        response.end();
      })
    });
}

exports.search = function(request, response){
  //생활코딩에서 알려주신 상세보기 페이지 구현
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  if (queryData.about == 'title'){
    db.query(`SELECT * FROM topic`, function(error,topics){
      if(error){
        throw error;
      }
      db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.title=?`,[queryData.search_word], function(error2, topic){ 
        if(error2){                  // mysql 라이브러리를 이용해서 구현하셨습니다. 
          throw error2;
        } 
        response.writeHead(302, {location : `/?id=${topic[0].id}`});
        response.end();
      })
    });
  } else if (queryData.about == 'author'){
    db.query(`SELECT * FROM topic`, function(error,topics){
      if(error){
        throw error;
      }
      db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE author.name=?`,[queryData.search_word], function(error2, topic){ 
        if(error2){                  // mysql 라이브러리를 이용해서 구현하셨습니다. 
          throw error2;
        }
        response.writeHead(302, {location : `/?id=${topic[0].id}`});
        response.end();
      })
    });
  };
}