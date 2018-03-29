const express = require ('express') //menambahkan library express ke dalam project
const router = express.Router()//membuat router

//rute utama
router.get('/',(req,res,next)=>{//jika terdapat request get pada home, lalu akan lanjut ke middelware 
    res.locals.username=req.cookies.username // mendeklarasikan bahwa nilai username pada locals sama dengan cookies nya
    if(req.cookies.username){// jika sudah punya cookie maka akan merender ke index
        res.render("index") //merespon dengan merender index
    }
    else{//jika cookiesnya tidak ada, maka akan diarahkan ke hello.pug untuk mengisi nama
        // let bikinError = new Error("Ga ada username")
        // next(bikinError)
        res.redirect("hello") //merespin dengan mengarahkan ke hello.pug
    }
})


router.get('/hello',(req,res)=>{//jika terdapat request get pada hello makaa akan dilanjut ke middleware
   if(req.cookies.username){// jika ternyata sudah ada cookie(username) maka akan diarahkan ke home (index.pug)
        res.redirect('/')
     }
    else{
        res.render("hello")//jika belum ada maka akan  merender hello untuk mengisi username
    }
   
})
router.post('/hello',(req,res)=>{//jika terdapat  request post pada hello maka akan lanjut ke middleware 
    res.locals=req.body// username yang diisikan pada req.body akan ditampung di locals
    res.cookie("username",req.body.username)//username yang di dapat lalu akan disimpan sebagai cookie
    res.redirect('/')// setelah itu maka akan di arahkan ke home (index.pug)
    
})


router.post('/goodbye',(req,res)=>{//jika terdapat request pada goodbye maka akan lanjut ke middleware
    res.clearCookie("username")//maka akan menghapus cookies yang sudah tersimpan
    res.redirect('/')//lalu akan di redirect/ diarahkan ke home(index.pug)
    
})



module.exports =router ///mengekspor router agar bisa digunakan selain di card.js