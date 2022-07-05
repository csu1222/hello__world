var template = require('./template');
var db = require('./db');
var url = require('url');

exports.home = function(request, response){
    db.query(`SELECT * FROM topic`, function(error, topics){
        if (error){throw error;}
        db.query(`SELECT * FROM author`, function(error2, authors){
            if (error2){throw error2}
            var title = 'author';
            var list = template.List(topics);
            var body = template.authorTable(authors);
            body += `<a href="/author/create">author create</a>`;
            var control = `<a href="/create">create</a>`;
            var html = template.HTML(title, list, body, control);
            response.writeHead(200);
            response.end(html);

        });
    });
}

exports.create = function(request, response){
    db.query(`SELECT * FROM topic`, function(error, topics){
        if (error){throw error;}
        db.query(`SELECT * FROM author`, function(error2, authors){
            if (error2){throw error2}
            var title = 'author';
            var list = template.List(topics);
            var body = template.authorCreate(authors);
            var control = `<a href="/create">create</a>`;
            var html = template.HTML(title, list, body, control);
            response.writeHead(200);
            response.end(html);

        });
    });
};

exports.create_process = function(request, response){
    var body = '';
    request.on('data', function(data){
        body += data;
        });
    request.on('end', function(){
        var name = new URLSearchParams(body).get('name');
        var profile = new URLSearchParams(body).get('profile');
        db.query(`INSERT INTO author(name, profile) VALUES (?, ?)`, [name, profile], 
        function(error, author){
            if (error){throw error};
            response.writeHead(302, {location : `/author`});
            response.end();
    })});
};

exports.update = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM topic`, function(error, topics){
        if (error){throw error;}
        db.query(`SELECT * FROM author`, function(error2, authors){
            if (error2){throw error2}
            var title = 'author - update';
            var list = template.List(topics);
            var body = template.authorUpdate(authors, queryData.id);
            var control = `<a href="/create">create</a>`;
            var html = template.HTML(title, list, body, control);
            response.writeHead(200);
            response.end(html);

        });
    });
};

exports.update_process = function(request, response){
    var body = '';
    request.on('data', function(data){
        body += data;
    });
    request.on('end', function(){
        var name = new URLSearchParams(body).get('name');
        var profile = new URLSearchParams(body).get('profile');
        var author_id = new URLSearchParams(body).get('id');
        db.query(`UPDATE author SET name=?, profile=? WHERE id=?`, [name, profile, author_id], function(error, author){
            if (error) {throw error};
            response.writeHead(302, {location : `/author`});
            response.end();
        });
    });
};

exports.delete_process = function(request, response) {
    var body = '';
    request.on('data', function(data){
        body += data;
    });
    request.on('end', function(){
        var author_id = new URLSearchParams(body).get('id');
        db.query(`DELETE FROM author WHERE id=?`, [author_id], function(error, author){
            if (error) {throw error};
            response.writeHead(302, {location : `/author`});
            response.end();
        });
    });
};