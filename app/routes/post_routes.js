module.exports = function (app, db) {

    var ObjectID = require('mongodb').ObjectID;

    app.get('/posts/:id', (req, res) => {
        const id = req.params.id;
        const myPost = {
            '_id': new ObjectID(id)
        };
        db.collection('posts').findOne(myPost, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send(item);
            }
        });
    });
    app.post('/posts', (req, res) => {
        const post = {
            text: req.body.body,
            title: req.body.title
        };
        db.collection('posts').insert(post, (err, result) => {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.put('/posts/:id', (req, res) => {
        const id = req.params.id;
        const myPost = {
            '_id': new ObjectID(id)
        };
        const post = {
            text: req.body.body,
            title: req.body.title
        };
        db.collection('posts').update(myPost, post, (err, result) => {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send(post);
            }
        });
    });
    app.delete('/posts/:id', (req, res) => {
        const id = req.params.id;
        const myPost = {
            '_id': new ObjectID(id)
        };
        db.collection('posts').remove(myPost, (err, item) => {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send('Your post with id ' + id + ' has been deleted');
            }
        });
    });
};