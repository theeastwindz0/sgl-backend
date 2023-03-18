const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    from:{
        type: Date,
        required: true,
    },
    to:{
        type: Date,
        required: true,
    },
    isDisabled:{
        type: Boolean,
        default: false,
    },
},{
    timestamps: true,
});

const Voucher = mongoose.model('Voucher', voucherSchema);
module.exports = Voucher;