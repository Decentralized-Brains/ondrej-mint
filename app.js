const express = require("express")
const mongoose = require("mongoose")
const fs = require('fs');
const cors = require("cors")
const multer = require('multer')

// constants
const PORT = 8080
const mongoURI = "mongodb+srv://alfazsozib:gjbq4U1apVx2HOV6@cluster0.fgytv0f.mongodb.net/ondrej?retryWrites=true&w=majority"
const Collection = mongoose.model('Collection', { name: String, images: [], maxPerWallet: Number, contractAddress: String, conditions: {} });
const upload = multer({ dest: 'public/files/' });

const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(express.json())

// Routes
app.get("/api/collection", async (req, res) => {
    const collection = await Collection.findOne({ name: "ondrej" });
    res.json(collection)
})

app.post('/api/upload-collection-images', upload.array('images', 10), async (req, res) => {
    try {
        const collection = await Collection.findOne({ name: "ondrej" });

        // delete old images
        await Promise.all(
            collection.images.map(async (filename) => {
                await fs.promises.unlink(`public/files/${filename}`);
            })
        )

        // save new images
        collection.images = req.files.map(file => file.filename);
        await collection.save();

        res.json({ message: 'Images uploaded successfully.' });
    } catch (error) {
        console.log(error)
        res.json({ message: 'Error uploading images.' });
    }
}); 

app.post("/api/update-data", upload.single('pdf'), async (req, res) => {
    const { contractAddress, maxPerWallet } = req.body;
    const updatedObject = {}
    if (contractAddress) updatedObject.contractAddress = contractAddress;
    if (maxPerWallet) updatedObject.maxPerWallet = maxPerWallet;
    if (req.body.link) updatedObject.conditions = { link: req.body.link }
    if (req.file) updatedObject.conditions = { pdf: req.file.filename }

    await Collection.findOneAndUpdate({ name: "ondrej" }, updatedObject);
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
