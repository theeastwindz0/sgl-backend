const mongoose = require('mongoose');

const statsSchema = mongoose.Schema({
    totalVisitors: { type: Number, required: true,default:0 },
    totalTicketsSold: { type: Number, required: true,default:0 },
    totalRating: { type: Number, required: true,default:0 },
});

module.exports = mongoose.model('Stats', statsSchema);

