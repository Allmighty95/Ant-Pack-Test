const { Router } = require("express");
const { getUsers, postDeleteUser, postUpdateUser, postUser } = require("../controllers/UsersController");

const router = Router();

router.get('/', getUsers)
router.post('/create', postUser)
router.put('/update', postUpdateUser)
router.delete('/delete', postDeleteUser)

module.exports = router;