const { Post } = require('../db');
const axios = require('axios');
const {
    API_BASE,
    API_POSTS,
} = process.env;

async function postPost(req, res) {
    const {
        userId,
        title,
        body,
    } = req.body;

    console.log("req.body", req.body);

    try {
        let newPost = await Post.create({
            userId,
            title,
            body,
        }, {
            fields: ["userId", "title", "body"]
        })

        if (newPost) {
            res.json({
                message: "Post created successfully",
                post: newPost
            })
        }
        else {
            res.status(500).json({
                message: "Cant create the new post"
            })
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            message: "Cant create the new post",
            data: error,
            request: req.body
        })
    }
}


async function getPosts(req, res) {
    try {
        let posts
        let awaitPosts
        posts = await Post.findAll()
        const api = API_BASE + API_POSTS
        if (posts.length < 1) {
            awaitPosts = await Promise.all(
                await (await axios.get(api)).data.map(async post => {
                    let newPost = await Post.create({
                        id: post.id,
                        userId: post.userId,
                        title: post.title,
                        body: post.body,
                    }, {
                        fields: ["userId", "title", "body"]
                    })
                    posts.push(newPost);
                })
            )
        }
        if (awaitPosts || posts.length >= 1) {
            res.json({
                message: "posts found",
                posts,
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "posts not found :(",
            data: error
        })
    }
}

async function postUpdatePost(req, res) {
    const {
        id,
        userId,
        title,
        body,
    } = req.body;

    console.log("req.body", req.body);

    try {

        // if (name) { user.name = name; }
        // if (email) { user.email = email; }
        // if (city) { user.city = city; }
        // if (company) { user.company = company; }
        // if (avatar) { user.avatar = avatar; }

        let post = await Post.update({
            userId,
            title,
            body,
        }, {
            where: {
                id
            },
            fields: ["userId", "title", "body"]
        })
        //-----------------------------------------------------------------------------
        if (post) {
            res.json({
                message: "Post updated successfully",
                post
            })
        }
        else {
            res.status(500).json({
                message: "Cant update the post"
            })
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            message: "Cant update the post",
            data: error,
            request: req.body
        })
    }
}

async function postDeletePost(req, res) {
    const {
        id
    } = req.body;

    console.log("req.body", req.body);

    try {
        let deletePost = await Post.destroy({
            where: {
                id
            }
        })

        if (deletePost) {
            res.json({
                message: "Post deleted successfully",
                deletePost
            })
        }
        else {
            res.status(500).json({
                message: "Cant delete the new post"
            })
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            message: "Cant delete the new post",
            data: error,
            request: req.body
        })
    }
}



module.exports = { postPost, getPosts, postUpdatePost, postDeletePost }



