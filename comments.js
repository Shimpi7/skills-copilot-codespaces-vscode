// Create web server
const express = require('express');
const app = express();

// Create port
const port = 3000;

// Create middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/express-demo', { useNewUrlParser: true, useUnifiedTopology: true });

// Create schema
const commentSchema = new mongoose.Schema({
    name: String,
    content: String
});

// Create model
const Comment = mongoose.model('Comment', commentSchema);

// Create route
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/comments', (req, res) => {
    Comment.find().then(comments => {
        res.render('comments', { comments: comments });
    });
});

app.post('/comments', (req, res) => {
    const newComment = new Comment({
        name: req.body.name,
        content: req.body.content
    });
    newComment.save().then(() => {
        console.log('New comment created');
    });
    res.redirect('/comments');
});

// Create template engine
app.set('view engine', 'pug');
app.set('views', './views');

// Listen port
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});