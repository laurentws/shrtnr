const request = require('supertest')
const app = require('../src/app')

describe("smoke & some api tests...", () => {
    test("GET /api/shorturl/analytics", (done) => {
        request(app)
            .get("/api/shorturl/analytics")
            .expect(200)
            .expect([
                {'originalUrl':'https://google.com','shortUrl':'xxxxxx','nbClicks':0},
                {'originalUrl':'https://lunii.com','shortUrl':'yyyyyy','nbClicks':10}])
            .end((err, res) => {
                if (err) return done(err)
                return done()
            })
    })
    test("POST /api/shorturl", (done) => {
        request(app)
            .post("/api/shorturl")
            .send({'url': 'http://localhost:3000'})
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                return done()
            });
    })
    test("GET /api/shorturl/xxxxxx redirects to google.com", (done) => {
        request(app)
            .get("/api/shorturl/xxxxxx")
            .expect(302)
            .expect('Location', 'https://google.com')
            .end((err, res) => {
                if (err) return done(err)
                return done()
            });
    })
    test("GET /api/shorturl/xxxxxx redirects to lunii.com", (done) => {
        request(app)
            .get("/api/shorturl/yyyyyy")
            .expect(302)
            .expect('Location', 'https://lunii.com')
            .end((err, res) => {
                if (err) return done(err)
                return done()
            })
    })
    test("GET /api/shorturl/zzzzzz 404", (done) => {
        request(app)
            .get("/api/shorturl/zzzzzz")
            .expect(404, done)
    })

})