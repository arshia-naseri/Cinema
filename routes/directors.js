const express = require('express')
const router = express.Router()

const Director = require('../modules/director')

// All directors
router.get('/', async (req,res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const directors = await Director.find(searchOptions)
        res.render('directors/index',{directors:directors , searchOptions: req.query})
    }catch{
        res.redirect('/')
    }
    
})

// New director
router.get('/new', (req,res) => {
    res.render('directors/new',{ director: new Director()})
})

router.post('/', async (req,res) => {
    const director = new Director({
        name: req.body.name
    })

    try{
        const newDirector = await director.save()
        res.redirect('directors')
    }catch{
        res.render('directors/new',{
            director: director,
            errorMessage: 'Error Creating director'
        })
    }

})

module.exports = router