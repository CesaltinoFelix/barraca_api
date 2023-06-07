const express = require("express");
const Products = require("../database/products");
const router = express.Router();




router.post('/upload-img/:id', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "img") to retrieve the uploaded file
            let img = req.files.img;
            let id = req.params.id

            //Use the mv() method to place the file in the upload directory (i.e. "uploads")
            img.mv('./uploads/' + img.name);

            await Products.update({ img: img.name }, {
                where: {
                  id: id
                }
              });
            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: img.name,
                    mimetype: img.mimetype,
                    size: img.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


module.exports = router; 