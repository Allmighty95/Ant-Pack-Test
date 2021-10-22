const { Router } = require("express");
const { getPosts, postDeletePost, postUpdatePost, postPost } = require("../controllers/PostsController");

const router = Router();

router.get('/', getPosts)
router.post('/create', postPost)
router.put('/update', postUpdatePost)
router.delete('/delete', postDeletePost)

module.exports = router;