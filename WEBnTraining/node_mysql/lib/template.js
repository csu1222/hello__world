
module.exports = {
    HTML : function(title, list, body, control){
      return`
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        <style>
          a {color : black;
            text-decoration: none;}
        </style>
      </head>
      <body>
        <h1>
          <a href="/">WEB</a>
        </h1>
        <a href="/author">author</a>
        ${list}
        ${control}
        ${body}
      </body>
      </html>`;
    },
    List : function (topics) {
      var list = '<ul>';
      var i = 0;
      while (i < topics.length){
        list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`
    
        i+=1
      }
      list = list + '</ul>';
      return list;
    },
    authorSelect : function(authors, author_id){
      var tag = '';
          for (var i=0; i < authors.length;i++){
            var selected = '';
            if (authors[i].id === author_id) {
              selected = ` selected`;
            }
            tag += `<option value="${authors[i].id}"${selected}>${authors[i].name}</option>`
          }
      return `
      <select name="author">
      ${tag}
      </select>
      `
    },
    authorTable : function(authors){
      var table = `<tr>
                <th>name</th>
                <th>profile</th>
                <th></th>
                <th></th>
                <tr>`;
      for (var i = 0; i < authors.length; i++){
        table += `<tr>
                <th>${authors[i].name}</th>
                <th>${authors[i].profile}</th>
                <th><a href="/author/update?id=${authors[i].id}">update</a></th>
                <th>
                  <form id="delete_id" action="/author/delete_process" method="post">
                    <input type="hidden" name="id" value="${authors[i].id}">
                    <input type="submit" value="delete">
                  </form>
                </th>
                <tr>`
      }//<a href="/author/delete_process" onclick="document.getElementById('delete_id').submit()">delete</a>
      return `
      <p>
      <style>
      table {border-collapse: collapse;}
      table, th, td {border: 1px solid grey;}
      </style>
      <table>
      ${table}
      </table>
      </p>`
    },
    authorCreate : function(authors){
      var table = `<tr>
                <th>name</th>
                <th>profile</th>
                <th></th>
                <th></th>
                <tr>`;
      for (var i = 0; i < authors.length; i++){
        table += `<tr>
                <th>${authors[i].name}</th>
                <th>${authors[i].profile}</th>
                <th><a href="/author/update?id=${authors[i].id}">update</a></th>
                <th>
                  <form id="delete_id" action="/author/delete_process" method="post">
                    <input type="hidden" name="id" value="${authors[i].id}">
                    <input type="submit" value="delete">
                  </form>
                </th>
                <tr>`
        }
        var result = `<p>
                      <style>
                      table {border-collapse: collapse;}
                      table, th, td {border: 1px solid grey;}
                      </style>
                      <table>
                      ${table}
                      </table>
                      </p>`
        result += `
        <form action="/author/create_process" method="post">
          <p>
            <input type="text" name="name" placeholder="name">
          </p>
          <p>
            <textarea name="profile" placeholder="profile"></textarea>
          </p>
          <p>
            <input type="submit" value="author create">
          </p>
        </form>`
        return result;
    },
    authorUpdate : function(authors, author_id){
      var table = `<tr>
                    <th>name</th>
                    <th>profile</th>
                    <th></th>
                    <th></th>
                  <tr>`;
      for (var i = 0; i < authors.length; i++){
        table += `<tr>
                    <th>${authors[i].name}</th>
                    <th>${authors[i].profile}</th>
                    <th><a href="/author/update?id=${authors[i].id}">update</a></th>
                    <th>
                      <form id="delete_id" action="/author/delete_process" method="post">
                        <input type="hidden" name="id" value="${authors[i].id}">
                        <input type="submit" value="delete">
                      </form>
                    </th>
                  <tr>`
          if (authors[i].id == author_id){
            var name = authors[i].name;
            var profile = authors[i].profile;
            var id = authors[i].id;
          }
        }
        var result = `<p>
                        <style>
                          table {border-collapse: collapse;}
                          table, th, td {border: 1px solid grey;}
                        </style>
                        <table>
                          ${table}
                        </table>
                      </p>`
        result += `
          <form action="/author/update_process" method="post">
            <input type="hidden" name="id" value="${id}">
            <p>
              <input type="text" name="name" value="${name}">
            </p>
            <p>
              <textarea name="profile" >${profile}</textarea>
            </p>
            <p>
              <input type="submit" value="author update">
            </p>
          </form>`
        return result;
    },
    Title : function(topics, queryData){
      for (var i = 0; i < topics.length; i++){
        if (topics[i].id == queryData.id){
          return topics[i].title;
        }
      }
    },
    Description : function(topics, queryData){
      for (var i = 0; i < topics.length; i++) {
        if (topics[i].id == queryData.id){
          return topics[i].description;
        }
      }
    }
  };
