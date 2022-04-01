const path= require('path')
const express= require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.port || 3000

// Define paths for Express config
const publicDirectoryPath= path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partials = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partials)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

 app.get('', (req,res) => { 
     res.render('index', { 
         title:'Weather',
         name: 'Ayush Agarwal'
     })
 })

 app.get('/about', (req,res) => {
     res.render('about', {
         title: 'About me',
         name: 'Ayush Agarwal'
    })
 })

 app.get('/help', (req, res) => { 
     res.render('help', { 
         helpText: 'This is some helpful text.',
         title: 'help',
         name: 'Ayush Agarwal'
     })
 })
// app.get('', (req, res) => { 
//     res.send('<h1> Weather</h1>')
// })

// app.get('/help', (req,res) => { 
//      res.send([{
//          name: 'Ankit'
//      },{
//          name: 'Ayush',
//          age: 26
//      }])
// } )

// app.get('/about', (req, res) => { 
//     res.send('<h1> About page</h1>')
// })

app.get('/weather', (req, res) => { 

    if(!req.query.address){ 
        return res.send ({
            error: 'You must provide an address!'
        })
    }
     forecast(req.query.address, (error, data) => { 
         if(error) {
             return res.send({error})
         }

         res.send({
             forecast: data,
             address: req.query.address
         })
     })
    // res.send({ 
    //     forecast:'It is snowing',
    //     location: "Philadelphia",
    //     address: req.query.address
    // })
})

app.get('/product', (req,res) => { 
    if(!req.query.search) { 
        return res.send({ 
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({ 
        product: []
    })
})

app.get('/help/*', (req,res) => { 
    // res.send('Help article not found')
    res.render('404', {
        title: '404',
        name: 'Ayush Agarwal',
        errorMessage: 'Help article not  found.'
    })
})

app.get('*', (req,res) => { 
    // res.send('My 404 page')

    res.render('404', {
        title: '404',
        name: 'Ayush Agarwal', 
        errorMessage: 'Page not found.'
    })
})
//app.com 
//app.com/about
//app.com/help

// app.listen(3000, () => { 
//     console.log('Server is up on port 3000.')
// })
app.listen(port, () => { 
        console.log('Server is up on port.'+ port)
     })