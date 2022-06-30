
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
