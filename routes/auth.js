const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const crypto = require('crypto')

const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys')
const requireLogin = require('../middleware/requireLogin')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const { SENDGRID_API, EMAIL } = require('../config/keys')


const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: SENDGRID_API
    }
}))


router.get('/protected', requireLogin, function (req, res) {
    res.send("hello user protected user")
})

router.post('/signup', function (req, res) {
    const { name, email, password, pic } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    User.findOne({ email: email })
        .then(function (savedUser) {
            if (savedUser) {
                return res.status(422).json({ error: "user already exists" })
            }
            bcrypt.hash(password, 12)
                .then(hashedpassward => {
                    const user = new User({
                        email,
                        password: hashedpassward,
                        name,
                        pic,
                        
                    })
                    user.save()
                        .then(user => {

                            if (!user.isverified) {
                                crypto.randomBytes(32, (err, buffer) => {
                                    if (err) {
                                        console.log(err)
                                    }
                                    const token = buffer.toString("hex")
                                    user.resetToken = token
                                    user.expireToken = Date.now() + 3600000
                                    user.save().then((result) => {
                                        transporter.sendMail({
                                            to: user.email,
                                            from: "sherukhansde@gmail.com",
                                            subject: "apnainsta email verification",
                                            html: `
                                    <h1>Please verify email</h1>
                                    <h3>click in this <a href="${EMAIL}/emailverify/${token}">link</a> to verify your email within 1 hour</h3>
                                    <h5> if click do not work , please copy and paste on address bar below given link</h5>
                                      <a>${EMAIL}/emailverify/${token}</a>
                                    `
                                        })
                                        res.json({ message: "check your email for verification" })
                                    })



                                })
                            }




                        })
                        .catch(err => {
                            console.log(err)
                        })

                })

        })
        .catch(err => {
            console.log(err)
        })


})

router.post('/signin', function (req, res) {
    const { email, password } = req.body
    
    if (!email || !password) {
        return res.status(422).json({ error: "add password or email" })
    }
    User.findOne({ email: email })
    .populate("bookmark","_id photo title")
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid email or password" })
            }
           
            if (!savedUser.isverified) {
                crypto.randomBytes(32, (err, buffer) => {
                    if (err) {
                        console.log(err)
                    }
                    const token = buffer.toString("hex")
                    savedUser.resetToken = token
                    savedUser.expireToken = Date.now() + 3600000
                    savedUser.save().then((result) => {
                        transporter.sendMail({
                            to: savedUser.email,
                            from: "sherukhansde@gmail.com",
                            subject: "apnainsta email verification",
                            html: `
                            <p>Please verify email</p>
                            <h5>click in this <a href="${EMAIL}/emailverify/${token}">link</a> to verify your email within 1 hour</h5>
                            <h5> if click do not work , please copy and paste on address bar below given link</h5>
                            <a>${EMAIL}/emailverify/${token}</a>
                            `
                        })
                        return res.status(422).json({ error: "please verify your email before sign-in" })
                    })



                })
            }
            else {
                bcrypt.compare(password, savedUser.password)
                    .then(doMatch => {
                        if (doMatch) {
                            //res.json({message:"successfully sign in"})
                            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                            const { _id, name, email, followers, following, pic, bookmark } = savedUser
                            res.json({ token, user: { _id, name, email, followers, following, pic, bookmark} })
                            transporter.sendMail({
                                to: email,
                                from: "sherukhansde@gmail.com",
                                subject: "apnainsta signin success",
                                html: `
                        <p>Welcome to apnainsta </p>
                        <h1>You have just signed in as ${name} </h1>
                        `
                            })

                        }
                        else {
                            return res.status(422).json({ error: "Invalid email or password" })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }


        })
})






router.post('/reset-password', (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(422).json({ error: "User dont exists with that email" })
                }
                user.resetToken = token
                user.expireToken = Date.now() + 3600000
                user.save().then((result) => {
                    transporter.sendMail({
                        to: user.email,
                        from: "sherukhansde@gmail.com",
                        subject: "apnainsta password reset",
                        html: `
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
                    `
                    })
                    res.json({ message: "check your email" })
                })

            })
    })
})


router.post('/new-password', (req, res) => {
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
        .then(user => {
            if (!user) {
                return res.status(422).json({ error: "Try again session expired" })
            }
            bcrypt.hash(newPassword, 12).then(hashedpassword => {
                user.password = hashedpassword
                user.resetToken = undefined
                user.expireToken = undefined
                user.save().then((saveduser) => {
                    res.json({ message: "password updated success" })
                })
            })
        }).catch(err => {
            console.log(err)
        })
})


router.post('/email-verify', (req, res) => {

    const sentToken = req.body.token
    User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
        .then(user => {
            if (!user) {
                return res.status(422).json({ error: "Try again session expired" })
            }

            user.resetToken = undefined
            user.expireToken = undefined
            user.isverified = true
            user.save().then((saveduser) => {
                res.json({ message: "email verified successfully" })
            })

        }).catch(err => {
            console.log(err)
        })
})


module.exports = router