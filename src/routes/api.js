const express = require('express')
const shortid = require('shortid')
const {isValidUrl} = require('../../lib/utils')
const db = require('../../db')
const router = express.Router()

router.post('/shorturl/', (req, res) => {
    const url = req.body.url


    if (isValidUrl(url)) {
        let _found = db.find((u) => {
            if (u.originalUrl === url) {
                return true
            }
        })
        if (_found) {
            res.status(200)
            res.json(_found)
        } else {
            const newUrl = {originalUrl: url, shortUrl: shortid.generate(), nbClicks: 0}
            db.push(newUrl)
            res.status(200)
            res.json(newUrl)
        }
    }
})

router.get('/shorturl/analytics', (req, res) => {
    res.status(200)
    res.json(db)
})

router.get('/shorturl/:shorturl', (req, res) => {
    let shorturl = req.params.shorturl
    let _found = db.find((u) => {
        if (u.shortUrl === shorturl) {
            return true
        }
    })
    if (_found) {
        _found.nbClicks++
        res.status(302)
        res.redirect(_found.originalUrl)
    } else {
        res.status(404)
        res.send("Not found...")
    }

})

module.exports = router