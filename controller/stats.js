const StatsService = require('../model/stats');

exports.getStats = async (req, res) => {
    try {
        const stats = await StatsService.find();
        return res.status(200).json({
            message: 'Stats fetched successfully.',
            stats: stats
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Fetching stats failed.'
        });
    }
}

exports.updateStats = async (req, res, next) => {
    try{
        const stats = await StatsService.find();
        if(stats.length === 0){
            const newStats = new StatsService({
                totalVisitors: 2000,
                totalTicketsSold: 1000,
                totalRating: 4.7,
            });
            await newStats.save();
            return res.status(200).json({
                message: 'Stats updated successfully.',
                stats: newStats
            });

    }
    else{
        const newStats = await StatsService.findOneAndUpdate(
            { _id: stats[0]._id },
            {
                $inc: {
                    totalVisitors: 3,
                    totalTicketsSold: 3,
                },
                $set: {
                    totalRating: 4.7,
                },
            },
            { new: true }
        );

        return res.status(200).json({
            message: 'Stats updated successfully.',
            stats: newStats
        });
    }
    }catch(err){
        return res.status(500).json({
            message: 'Updating stats failed.'
        });
    }
}



