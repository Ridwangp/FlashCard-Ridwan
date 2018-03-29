const express = require ('express') //menambahkan library express ke dalam project
const router = express.Router()
const data = require('../Data/flashCardData.json').data // menambahkan flashCardData.json ke project, dan langsung menapilakan isinya saja
// const cards = data.cards // mendeklarasikan bahwa cards adalah isi dari data
const {cards}=data 

//kalau ada yang buka /cards maka id akan diberikan secara random
router.get('/',(req,res)=>{
    let totalCards = cards.length
    let randomId = Math.floor(Math.random()*totalCards)//untuk merandom id dari 0-4,ketika di buka halaman cards

    res.redirect(`/cards/${randomId}?side=soal`)
})

router.get('/:id',(req,res)=>{ //id adalah variable penampung yang bersifat dinamis
    // res.locals.variabel = "Aku siapa template?" // cara lain untuk menuliskan via locals, sama saja
    // res.locals.hint ="pernah ketemu kah kita?"

const {id} =req.params // id adalah variabel dinamis yang panjangnya
const {side}= req.query // side diisi tergantung degan pertanyaan atau jawaban, seuai dengan form yang diisi
const text = cards[id][side] // text yang ditampilkan akan sesuai dengan side, bisa soal atau jawaban, lalu yang ditampilkan sesuai dengan id nya
const {hint} = cards[id] // menampilkan hint sesuai dengan id card nya
let templateData = {id,text,hint} // menampung template untuk soal

if(side=="jawaban"){
    templateData = {id,text} // jika sidenya adalah jawaban maka template Data berubah jadi hanya jawaban saja , tidak ada hint
    // alamat yang dituju jika side to display di klik adalah a(href=`/cards/${id}?side=${sidenya}`) #{SideToDisplay} 
    templateData.sidenya="soal" // maka sidenya akan berubah menjadi soal
    templateData.SideToDisplay="Lihat Soal"// menampilkan tulisan "Lihat Soal"
} else if(side=="soal"){// jika sidenya adalah soal maka template akan tetap ada hintnya
    templateData.sidenya="jawaban"//maka side akan berubah menjadi  jawaban
    templateData.SideToDisplay="Lihat jawaban"// menampilkan tulisan "Lihat Jawaban"

} else if(!side){
    res.redirect(`/cards/${id}?side=soal`)//jika side tidak ada, maka akan di arahkan/redrect ke cards dengan side adalah soal
}

    res.locals =templateData
    res.render("cards")//data local
})

module.exports =router//mengekspor router agar bisa digunakan selain di card.js