
module.exports = {
    HTML : function(title, list, body, control){
      return`
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
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
    Table : function(authors){
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
                <th><a href="/author/update">update</a></th>
                <th><a href="/author/delete_process">delete</a></th>
                <tr>`
      }
      return `
      <p>
      <style>
      table, th, td {border: 1px solid black;}
      </style>
      <table>
      ${table}
      </table>
      </p>`
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
