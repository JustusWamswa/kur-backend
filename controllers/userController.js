const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const saltRounds = 10;

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '14d' })
}

// create a user
const createUser = async (req, res) => {
    if (req.body.googleToken) {
        // google signup
        const { email } = req.body

        if (!validator.isEmail(email)) {
            console.log("Invalid email")
            return res.status(400).json({ error: 'Email is not valid' })
        }

        // check if a user with the provided email already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            console.log("Error: The email provided has already been taken")
            return res.status(400).json({ error: "The email provided is already in use.", status: 400 })

        }
        // Create a new user with hashed password 
        try {
            const user = await User.create({ ...req.body })
            //create a jwt
            const token = createToken(user._id)
            // res.status(200).json(user)
            res.status(200).json({
                message: "User signup successfull", token: token,
                status: 200, email: email, profilePicture: user.profilePicture, admin: user.admin,
                firstName: user.firstName, lastName: user.lastName, id: user._id, verified: user.verified
            })
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }

    } else {
        // form signup
        const { password, email } = req.body

        // use return res instead of throw
        // if ( !email || !password) {
        //     throw Error('All required fields must be filled')
        // }
        if (!validator.isEmail(email)) {
            console.log("Invalid email")
            res.status(400).json({ error: 'Email is not valid' })
            return
        }
        if (!validator.isStrongPassword(password)) {
            console.log("Invalid password")
            res.status(400).json({ error: "Password requirements: minimum of 8 characters, uppercase letter, lowercase letter, number, symbol" })
            return
        }

        // check if a user with the provided email already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            console.log("Error: The email provided has already been taken")
            res.status(400).json({ error: "The email provided is already in use.", status: 400 })
            return
        }
        // Hash the user's password
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                console.error('Password hashing error:', err);
                return res.status(500).json(err);
            }

            // Create a new user with hashed password 
            try {
                const user = await User.create({ ...req.body, password: hash })
                //create a jwt
                const token = createToken(user._id)
                // res.status(200).json(user)
                res.status(200).json({
                    message: "User has been created successfully", token: token,
                    status: 200, email: email, profilePicture: user.profilePicture, admin: user.admin,
                    firstName: user.firstName, lastName: user.lastName, id: user._id
                })
            } catch (error) {
                console.log(error)
                res.status(500).json(error)
            }

        })
    }
}

// read users information
const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ updatedAt: -1 })
        const newUsers = users.map((user) => ({
            email: user.email, status: 200, profilePicture: user.profilePicture, graduationYear: user.graduationYear,
            admin: user.admin, firstName: user.firstName, lastName: user.lastName, id: user._id, phone: user.phone
        }))
        res.status(200).json(newUsers)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }
}

// read single user information
const getUser = async (req, res) => {
    const { id } = req.body
    if (!id) {
        console.log("Error: Provide user's id")
        return res.status(400).json({ error: "Provide user's id" })
    }
    try {
        const user = await User.findById(id)
        res.status(200).json({
            email: user.email, status: 200, profilePicture: user.profilePicture, graduationYear: user.graduationYear,
            admin: user.admin, firstName: user.firstName, lastName: user.lastName, id: user._id, phone: user.phone
        })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }
}

// login user
const loginUser = async (req, res) => {

    if (req.body.googleToken) {
        // google sign in
        const { email } = req.body
        try {
            const user = await User.findOne({ email })

            // check if a user with the provided email already exists
            if (!user) {
                console.log('Email does not exist')
                return res.status(400).json({ error: 'The provided email does not exist.' })
            }
            //create a jwt
            const token = createToken(user._id)

            res.status(200).json({
                message: "User login successfull", email, token, status: 200, profilePicture: user.profilePicture,
                admin: user.admin, firstName: user.firstName, lastName: user.lastName, id: user._id
            })

        } catch (error) {
            console.log(error)
            res.status(500).json(error)

        }

    } else {
        const { email, password } = req.body
        if (!email) {
            console.log("Error: Provide your email")
            res.status(400).json({ error: "Provide your email" })
            return
        }

        if (!password) {
            console.log("Error: Provide your password")
            res.status(400).json({ error: "Provide your password" })
            return
        }
        try {
            const user = await User.findOne({ email })
            if (!user) {
                console.log('Email is incorrect')
                return res.status(400).json({ error: 'Email is incorrect' })
            }
            if (!user.password) return res.status(400).json({ error: 'Password is incorrect' })
            const matchPassword = await bcrypt.compare(password, user.password)

            if (!matchPassword) {
                console.log('Password is incorrect')
                res.status(400).json({ error: 'Password is incorrect' })
                return
            }

            //create a jwt
            const token = createToken(user._id)

            res.status(200).json({
                email, token, status: 200, profilePicture: user.profilePicture,
                admin: user.admin, firstName: user.firstName, lastName: user.lastName, id: user._id
            })

        } catch (error) {
            console.log(error)
            res.status(500).json(error)

        }
    }
}

// update user information
const updateUser = async (req, res) => {
    const { id } = req.body

    if (!id) {
        console.log("Error: Provide user's id")
        return res.status(400).json({ error: "Provide user's id" })
    }

    // Hash the user's password if it is being updated
    if (req.body.password) {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                console.error('Password hashing error:', err);
                return res.status(500).json(err);
            }

            // update user with hashed password
            try {
                const user = await User.findByIdAndUpdate(id, { ...req.body, password: hash }, { new: true })
                res.status(200).json(user)

            } catch (error) {
                console.log(error)
                res.status(500).json(error)
            }

        })
        return
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true })
        console.log(updatedUser)
        res.status(200).json({
            email: updatedUser.email, status: 200, profilePicture: updatedUser.profilePicture, graduationYear: updatedUser.graduationYear,
            admin: updatedUser.admin, firstName: updatedUser.firstName, lastName: updatedUser.lastName, id: updatedUser._id, phone: updatedUser.phone
        })
        return

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// delete user
const deleteUser = async (req, res) => {
    const { id } = req.body
    if (!id) {
        console.log("Error: Provide user's id")
        return res.status(400).json({ error: "Provide user's id" })
    }
    try {
        const user = await User.findByIdAndDelete(id)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = { createUser, getUsers, getUser, loginUser, updateUser, deleteUser }