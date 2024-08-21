const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data/db.json'), 'utf-8'))

// guesslike
// audiobook
// ranking
router.get('/', (req, res) => {
  const tag = req.query.tag
  const queryData = data[tag]
  res.send({
    message: queryData ? '获取成功' : `${tag} 不存在`,
    data: queryData
  })
})

module.exports = router