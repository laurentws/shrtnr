const request = require('supertest')
const {isValidUrl} = require('../lib/utils')

describe('utils', () => {
    test('https://google.com is a valid url', () => {
        expect(isValidUrl('https://google.com')).toBeTruthy()
    })
    test('https:/google.com is not a valid url', () => {
        expect(isValidUrl('https:/google')).toBeFalsy()
    })
    test('empty string is not a valid url', () => {
        expect(isValidUrl('')).toBeFalsy()
    })
    test('undefined is not a valid url', () => {
        expect(isValidUrl(undefined)).toBeFalsy()
    })
    test('void is not a valid url', () => {
        expect(isValidUrl()).toBeFalsy()
    })
})