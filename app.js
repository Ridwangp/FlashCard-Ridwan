const express = require ('express') //menambahkan library express ke dalam project
const app= express() // mendeklarasikan bahwa app adalah salah satu fungsi dari express

const bodyParser = require('body-parser') //menambahkan library body-parser ke dalam project, memparsing bagian middle ware
const cookieParser = require('cookie-parser') // menamabahkan library cookie-parse ke dalam project

const mainRoutes = require ('./routes/index.js')//memanggil index.js dari folder routes
const cardsRoutes = require ('./routes/cards.js')// memanggil card.js dari folder routes

const port =16169 // mendeklarasikan bahwa port adalah 14042

app.use(bodyParser.urlencoded({extended:false})) //menjalankan fungsi body parser untuk mengencoded url
app.use(cookieParser())// menjalankan fungsi cookieParser

app.use('/public',express.static('public')) // membuatfolder /public jadi static, dengan nama "public"

app.set('view engine','pug') //pasang mesin template, yaitu pug


//rute-rutenya
app.use(mainRoutes) //memanggil main routes
app.use('/cards',cardsRoutes)// menggunakan cardRoutes pada cards.js

//bikin error jika tidak ada rute yang cocok
app.use((req,res,next)=>{
    let errornya = new Error("ga ada Coy!!")
    errornya.status =404
    next(errornya)
})


//error middleware
app.use((err,req,res,next)=>{
    res.locals.status=err.status
    res.locals.errorMessage=err.message
    res.render('error')
})

//menghubungkan server dengan nilai port yang sudah didefiniskan
app.listen(port,()=>{
    console.log("udah nyala nih")//jika sudah terhubung maka akan ada log udah nyla nihs
})
