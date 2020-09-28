const express = require('express');
const mongodb = require('mongodb');

const mongodbUrl = 'mongodb+srv://Chhunly:0965361563@my-tasklist.ic9ui.mongodb.net/Chhunly?retryWrites=true&w=majority';

const router = express.Router();
//get post
router.get('/', async (req, res) => {
    const posts = await loadPosts();
    res.send(await posts.find({}).toArray());
})

//add post

router.post('/', async (req, res) => {
    const posts = await loadPosts();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

//delete post

router.delete('/:id', async (req, res) => {
    const posts = await loadPosts();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})


async function loadPosts() {
    const client = await mongodb.MongoClient.connect(mongodbUrl , 
    {
        useNewUrlParser: true
    });

    return client.db('my_tasklist').collection('posts');
}

module.exports = router;