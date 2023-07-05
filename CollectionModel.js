const mongoose = require("mongoose");

const collectionSchema = mongoose.Schema({ 
    name: String, 
    images: [], 
    maxPerWallet: Number, 
    contractAddress: String, 
    conditions: {
        link: String,
        pdf: String
    },
    whitelist: {
        startDate: String,
        endDate: String,
        isRunning: {
            type: Boolean,
            default: false
        }
    },
    presale: {
        startDate: String,
        endDate: String,
        isRunning: {
            type: Boolean,
            default: false
        }
    },
    publicMint: {
        startDate: String,
        endDate: String,
        isRunning: {
            type: Boolean,
            default: false
        }
    }
}, {
    timestamps: true
})

const Collection = mongoose.model("Collection", collectionSchema)
module.exports = Collection
