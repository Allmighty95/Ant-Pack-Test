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




// async function getVideoGames(req, res) {
//     try {
//         const api = "https://api.rawg.io/api/games?key=88fa6c562137423bb02ac50039e5769a"

//         const { name, page } = req.query;

//         let videoGames
//         let apiVideoGames

//         if (name) {
//             videoGames = (await Videogame.findAll({
//                 where: {
//                     name: {
//                         [Op.like]: `%${name}%`
//                     }
//                 }
//             })).map(game => {
//                 return {
//                     id: game.id,
//                     name: game.name,
//                     description: game.description,
//                     background_image: game.background_image,
//                     releasedate: game.releasedate,
//                     rating: game.rating,
//                     platforms: game.platforms,
//                     gender: game.gender ? game.gender : [],
//                     api: false
//                 }
//             })
//             apiVideoGames = await (await axios.get(api + "&search=" + name)).data.results.map(game => {
//                 return {
//                     id: game.id,
//                     name: game.name,
//                     description: game.description,
//                     background_image: game.background_image,
//                     releasedate: game.released,
//                     rating: game.rating,
//                     platforms: game.platforms,
//                     gender: game.genres,
//                     api: true
//                 }
//             })
//         }
//         else if (page) {
//             videoGames = (await Videogame.findAll()).map(game => {
//                 return {
//                     id: game.id,
//                     name: game.name,
//                     description: game.description,
//                     background_image: game.background_image,
//                     releasedate: game.releasedate,
//                     rating: game.rating,
//                     platforms: game.platforms,
//                     gender: game.gender ? game.gender : [],
//                     api: false
//                 }
//             })

//             apiVideoGames = await (await axios.get(api + "&page=" + page)).data.results.map(game => {
//                 return {
//                     id: game.id,
//                     name: game.name,
//                     description: game.description,
//                     background_image: game.background_image,
//                     releasedate: game.released,
//                     rating: game.rating,
//                     platforms: game.platforms,
//                     gender: game.genres,
//                     api: true
//                 }
//             })
//         }
//         else {
//             videoGames = (await Videogame.findAll()).map(game => {
//                 return {
//                     id: game.id,
//                     name: game.name,
//                     description: game.description,
//                     background_image: game.background_image,
//                     releasedate: game.releasedate,
//                     rating: game.rating,
//                     platforms: [],
//                     gender: [],
//                     api: false
//                 }
//             })

//             apiVideoGames = await (await axios.get(api)).data.results.map(game => {
//                 return {
//                     id: game.id,
//                     name: game.name,
//                     description: game.description,
//                     background_image: game.background_image,
//                     releasedate: game.released,
//                     rating: game.rating,
//                     platforms: game.platforms,
//                     gender: game.genres,
//                     api: true
//                 }
//             })
//         }
//         if (videoGames || apiVideoGames) {
//             res.json({
//                 message: "videogames found",
//                 results: videoGames.concat(apiVideoGames),
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             message: "videogames not found :(",
//             data: error
//         })
//     }
// }

// async function getOneVideoGame(req, res) {
//     const { id } = req.params
//     const { api } = req.query;
//     try {
//         //------------------------------------------------------------
//         let videoGames
//         let genres
//         let platforms

//         if (api) {
//             const rawgApi = "https://api.rawg.io/api/games/" + id + "?key=88fa6c562137423bb02ac50039e5769a"
//             console.log("rawgApi", rawgApi);
//             videoGames = await (await axios.get(rawgApi)).data
//             genres = videoGames.genres
//             platforms = videoGames.platforms.map(p => {
//                 return p.platform
//             })
//             console.log("platforms", platforms);
//             // console.log("videoGames", videoGames);
//         }
//         else {
//             videoGames = await Videogame.findOne({
//                 where: {
//                     id
//                 }
//             })
//             genres = await videoGames.getPosts()
//             videoGames.genres = genres

//             platforms = await videoGames.getPlatforms()
//             videoGames.platforms = platforms
//         }
//         //------------------------------------------------------------
//         if (videoGames) {
//             res.json({
//                 message: "videogames found",
//                 data: {
//                     id: videoGames.id,
//                     name: videoGames.name,
//                     description: videoGames.description,
//                     background_image: videoGames.background_image,
//                     releasedate: videoGames.releasedate,
//                     rating: videoGames.rating,
//                     genres,
//                     platforms,
//                 },
//             })
//         }
//         else {
//             res.status(500).json({
//                 message: "videogames not found :(",
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             message: "videogames not found :(",
//             data: error
//         })
//     }
// }




// module.exports = {
//     getVideoGames,
//     getOneVideoGame
// }


// const { Videogame, Post, Platform } = require('../db.js');

// async function postVideoGame(req, res) {
//     const {
//         name,
//         description,
//         background_image,
//         releasedate,
//         rating,
//         platforms,
//         gender,
//     } = req.body;

//     console.log("req.body", req.body);

//     try {
//         //-----------------------------------------------------------------------------
//         let posts = []
//         let platformsDB = []
//         gender.map(async gen => {
//             let createdPost = await Post.create({
//                 name: gen.name
//             }, {
//                 fields: ['name']
//             })
//             posts.push(createdPost)
//         })

//         platforms.map(async plat => {
//             let createdPlatform = await Platform.create({
//                 name: plat.name
//             }, {
//                 fields: ['name']
//             })
//             platformsDB.push(createdPlatform)
//         })


//         let newVideoGame = await Videogame.create({
//             name,
//             description,
//             background_image,
//             releasedate,
//             rating,
//             platform: platforms,
//             gender
//         }, {
//             fields: ['name', 'description', 'background_image', 'releasedate', 'rating', 'platform', 'gender']
//         })
//         //-----------------------------------------------------------------------------
//         if (newVideoGame) {
//             newVideoGame.setPosts(posts).then(sc => {
//                 console.log(sc);
//             });
//             newVideoGame.setPlatforms(platformsDB).then(sc => {
//                 console.log(sc);
//             });
//             res.json({
//                 message: "Videogame Created Successfully",
//                 data: newVideoGame
//             })
//         }
//         else {
//             res.status(500).json({
//                 message: "Videogame Not Created"
//             })
//         }
//     } catch (error) {
//         console.log("error", error);
//         res.status(500).json({
//             message: "Videogame not created :(",
//             data: error,
//             request: req.body
//         })
//     }
// }

// module.exports = postVideoGame