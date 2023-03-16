const Gallery = require('../model/gallery');

exports.getGallery = async (req, res, next) => {
    try {
        const gallery = await Gallery.find();
        return res.status(200).json({
            message: 'Gallery fetched successfully',
            gallery: gallery,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Something went wrong',
            error: err,
        });
    }
}

exports.postGallery = async (req, res, next) => {
    try {
        const { isImage,url} = req.body;
        if (!isImage) {
            return res.status(400).json({
                message: 'isImage and url are required',
            });
        }
        let fileUrl;
        if(!req.file){
            fileUrl = url;
        }else{
            fileUrl = req.file.path;
        }

        const gallery = await Gallery.create({
            isImage: isImage,
            url: fileUrl,
        });
        return res.status(201).json({
            message: 'Gallery created successfully',
            gallery: gallery,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Something went wrong',
            error: err.message,
        });
    }
}

exports.deleteGallery = async (req, res, next) => {
    try {
        const gallery = await Gallery.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: 'Gallery deleted successfully',
            gallery: gallery,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Something went wrong',
            error: err,
        });
    }
}