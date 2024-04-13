const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User.js');
const Place = require('./models/Places.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'thiennghia';
const imageDownloader = require('image-downloader')
const multer = require('multer');
const fs = require('fs');

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
// TRHMzqLgS55G1FXf

mongoose.connect(process.env.MONGO_URL);

app.post('/register', async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post('/login', async(req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email: email });
    if (userDoc) {
        const passOK = bcrypt.compareSync(password, userDoc.password);
        if (passOK) {
            jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            })

        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async(err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id })
        })
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);

})

app.post('/upload-by-link', async(req, res) => {
    const { link } = req.body;
    const name = 'photo' + Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + name,
    })
    res.json(name)
})

const photoMiddleware = multer({ dest: 'uploads/' });
app.post('/upload', photoMiddleware.array('photos', 100), (req, res) => {
    const upLoadFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newName = path + '.' + ext;
        fs.renameSync(path, newName);
        upLoadFiles.push(newName.replace('uploads\\', ''));
    }

    res.json(upLoadFiles);
})

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const {
        title,
        address,
        addPhoto,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuest
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async(err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title,
            address,
            addPhoto,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuest
        })
        res.json(placeDoc);
    })

})

app.get('/places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async(err, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }))
    })
});

app.listen(4000)