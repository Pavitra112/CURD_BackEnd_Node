const Post = require('../services/Post');

const multer = require("multer");
const postSchema = require('../validationSchema/postSchema');
const { upload } = require('../config/storage');



exports.getAllPosts = async (req, res) => {

    try {
        const posts = await Post.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getPostById = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.getPostById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.createPost = async (req, res) => {
    upload.single('file')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            console.error(err);
            return res.status(500).json({ message: 'File upload failed' });
        } else if (err) {
            console.error(err);
            return res.status(500).json({ message: 'File upload failed' });
        }
        const { error } = postSchema.validate({
            title: req.body.title,
            content: req.body.content,
            filename: req.file.filename
        });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { title, content } = req.body;
        const file = req.file;
        try {
            const post = await Post.createPost(title, content, file.filename);
            res.status(201).json({ message: 'Post created successfully', post });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Server Error' });
        }
    });
};


exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    console.log(req.body);
    upload.single('file')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            console.error(err);
            return res.status(500).json({ message: 'File upload failed' });
        } else if (err) {
            console.error(err);
            return res.status(500).json({ message: 'File upload failed' });
        }
        const { error } = postSchema.validate({
            title: req.body.title,
            content: req.body.content,
            filename: req.body.file ? req.body.file : req.file.filename
        });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        try {
            const fileName = req.body.file ? req.body.file : req.file.filename;

            const { title, content } = req.body;
            const result = await Post.updatePost(postId, title, content, fileName);
            if (!result) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json({ message: 'Post updated successfully' });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Server Error' });
        }
    });
};

exports.deletePost = async (req, res) => {
    const postId = req.params.id;
    try {
        const result = await Post.deletePost(postId);
        if (!result) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};
