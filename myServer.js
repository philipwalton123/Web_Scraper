const express = require('express')
const cors = require('cors')
const getFilms = require('./getFilms')

const myServer = express()

myServer.use(cors())

myServer.get('/', (req, res, next) => {
	console.log("get / request received")
	res.json({msg: 'This is CORS-enabled for all origins!'})
  })

  myServer.get('/films/:actor', (req, res, next) => {
	console.log("get /films/:actor request received")
	const roles = getFilms(req.params.actor).then(roles=>{
		console.log("myServer has the films back from getFilms")
		res.json({msg: 'This is CORS-enabled for all origins!', roles})
	})
	
	
  })
   
  myServer.listen(8080, function () {
	console.log('CORS-enabled web server listening on port 8080')
  })