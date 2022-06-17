const express = require('express')
const app = require('./src/app')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server is listening... on  http://localhost:${PORT}`))