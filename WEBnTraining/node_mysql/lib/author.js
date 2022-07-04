var template = require('./template');
var db = require('./db');


exports.home = function(request, response){
    db.query(`SELECT * FROM topic`, function(error, topics){
        if (error){throw error;}
        db.query(`SELECT * FROM author`, function(error2, authors){
            if (error2){throw error2}
            var title = topics[0].title;
            var list = template.List(topics);
            var body = template.Table(authors);
            var control = `<a href="/create">create</a>`;
            var html = template.HTML(title, list, body, control);
            response.writeHead(200);
            response.end(html);

        });
    });
}