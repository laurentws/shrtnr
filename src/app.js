const express = require('express')
const api = require('./routes/api')
const path = require("path");

const shortid = require('shortid')
const {isValidUrl} = require('../lib/utils')
const db = require('../db')

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// api
app.use('/api', api)

// front
app.get('/', (req, res) => {
    res.render('index', { data: {} })
})

app.post('/', (req, res) => {
    const url = req.body.url
    if (isValidUrl(url)) {
        let _found = db.find((u) => {
            if (u.originalUrl === url) {
                return true
            }
        })
        if (_found) {
            res.status(200)
            res.render('index', {
                data: _found
            })
        } else {
            const newUrl = {originalUrl: url, shortUrl: shortid.generate(), nbClicks: 0}
            db.push(newUrl)
            res.status(200)
            res.render('index', {
                data: newUrl
            })
        }
    }

})

app.get('/analytics', (req, res) => {
    res.status(200)
    res.render('analytics', {
        data: db
    })
})

module.exports = app