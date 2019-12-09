import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Product = new Schema ({
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    status: {
        type: String,
        default: 'Available'
    }
});

export default mongoose.model('Product', Product);