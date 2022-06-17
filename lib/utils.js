const URL = require('url').URL

// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function isValidUrl(url) {
    if(!url) return false;
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))|' + // OR ip (v4) address
        'localhost' + // OR localhost
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(url);
}

module.exports = { isValidUrl }