const express = require("express")
const fs = require('fs');
const cors = require("cors")
const multer = require('multer')
const mongoose = require("mongoose")
const Collection = require("./CollectionModel")

// constants
const PORT = 8080
const mongoURI = "mongodb+srv://alfazsozib:gjbq4U1apVx2HOV6@cluster0.fgytv0f.mongodb.net/ondrej?retryWrites=true&w=majority"
const upload = multer({ dest: 'public/files/' });

const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(express.json())

// Routes
app.get("/api/all-collections", async (req, res) => {
    const collections = await Collection.find({});
    res.json(collections)
})

app.delete("/api/delete-collection", async (req, res) => {
    const { id } = req.query;
    await Collection.deleteOne({ _id: id });
    res.json({ status: true })
})

app.get("/api/create-collection", async (req, res) => {
    const collection = new Collection({ name: "new collections" });
    await collection.save();
    res.json({ status: true })
})
app.get("/api/collection", async (req, res) => {
    try {
        const { id } = req.query;
        const collection = await Collection.findOne(id ? { _id: id } : { name: "ondrej" });
        res.json(collection)
    } catch (err) {
        const collection = await Collection.findOne({ name: "ondrej" });
        res.json(collection)
    }
})

 
const cpUpload = upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'images', maxCount: 10 }])
app.post('/api/upload-collection-files', cpUpload, async (req, res) => {
    const { id } = req.query;
    try {
        const collection = await Collection.findOne(id ? { _id: id } : { name: "ondrej" });
        if (req.files.images) collection.images = req.files['images'].map(file => file.filename);
        if (req.files.pdf) collection.conditions.pdf = req.files['pdf'][0].filename + ".pdf";
        // rename uploaded pdf file to .pdf
        if (req.files.pdf) fs.renameSync(`public/files/${req.files['pdf'][0].filename}`, `public/files/${req.files['pdf'][0].filename}.pdf`);
        await collection.save();

        res.json({ message: 'Uploaded successfully.' });
    } catch (error) {
        console.log(error)
        res.json({ message: 'Error uploading images.' });
    }
}); 

app.post("/api/update-data", async (req, res) => {
    const { id } = req.query;
    await Collection.findOneAndUpdate(id ? { _id: id } : { name: "ondrej" }, req.body);
    res.json({ message: 'Updated successfully.' });
})


mongoose.set('strictQuery', false);
mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected!"))
    .catch(console.log)


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
