const express = require("express")
const app = express();
const mongoose = require("mongoose");
const ShortUrl = require('./models/shortUrl')
mongoose.set("strictQuery", false);
app.use(express.urlencoded({extended: false}))
mongoose.connect('mongodb+srv://amar_1318:amaramar13@cluster0.7qwxtnv.mongodb.net/test', {
    useNewUrlParser: true, useUnifiedTopology: true
})
app.set('view engine', 'ejs' )
app.get("/", async(req, res)=>{
    const shortUrls = await ShortUrl.find()
    res.render('index', {shortUrls: shortUrls});
})

app.post('/shortUrls', async (req, res)=>{
    await ShortUrl.create({full: req.body.fullUrl})
    res.redirect('/')
})
app.get('/:shortUrl', async(req, res)=>{
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()
  
    res.redirect(shortUrl.full)
})
app.listen(process.env.PORT || 5000)