const { User } = require('../db');
const axios = require('axios');
const md5 = require('md5')
const {
    API_BASE,
    API_USERS,
    API_IMAGES,
} = process.env;

async function postUser(req, res) {
    const {
        name,
        email,
        city,
        company,
    } = req.body;

    try {

        let newUser = await User.create({
            name,
            email,
            city,
            company,
            avatar: API_IMAGES + md5(email),
        }, {
            fields: ["name", "email", "city", "company", "avatar",]
        })
        //-----------------------------------------------------------------------------
        if (newUser) {
            res.json({
                message: "User created successfully",
                user: newUser
            })
        }
        else {
            res.status(500).json({
                message: "Cant create the new user"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Cant create the new user",
            data: error,
            request: req.body
        })
    }
}

async function getUsers(req, res) {
    try {
        let users
        let awaitUser
        users = await User.findAll()
        const api = API_BASE + API_USERS
        if (users.length < 1) {
            awaitUser = await Promise.all(
                await (await axios.get(api)).data.map(async user => {
                    let newUser = await User.create({
                        name: user.name,
                        email: user.email,
                        city: user.address.city,
                        company: user.company.name,
                        avatar: API_IMAGES + md5(user.email)
                    }, {
                        fields: ["name", "email", "city", "company", "avatar",]
                    })
                    users.push(newUser);
                })
            )
        }
        if (awaitUser || users.length >= 1) {
            res.json({
                message: "users found",
                users
            })
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            message: "users not found :(",
            data: error
        })
    }
}

async function postUpdateUser(req, res) {
    const {
        id,
        name,
        email,
        city,
        company,
        avatar,
    } = req.body;

    console.log("req.body", req.body);

    try {

        // if (name) { user.name = name; }
        // if (email) { user.email = email; }
        // if (city) { user.city = city; }
        // if (company) { user.company = company; }
        // if (avatar) { user.avatar = avatar; }

        let user = await User.update({
            name,
            email,
            city,
            company,
            avatar,
        }, {
            where: {
                id
            },
            fields: ["name", "email", "city", "company", "avatar",]
        })
        //-----------------------------------------------------------------------------
        if (user) {
            res.json({
                message: "User updated successfully",
                user
            })
        }
        else {
            res.status(500).json({
                message: "Cant update the new user"
            })
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            message: "Cant update the new user",
            data: error,
            request: req.body
        })
    }
}

async function postDeleteUser(req, res) {
    const {
        id
    } = req.body;

    console.log("req.body", req.body);

    try {
        let deleteUser = await User.destroy({
            where: {
                id
            }
        })

        if (deleteUser) {
            res.json({
                message: "User deleted successfully",
                deleteUser
            })
        }
        else {
            res.status(500).json({
                message: "Cant delete the new user"
            })
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            message: "Cant delete the new user",
            data: error,
            request: req.body
        })
    }
}



module.exports = { postUser, getUsers, postUpdateUser, postDeleteUser }


