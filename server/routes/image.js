const router = require('express').Router();
const { db } = require('../../database/index');

//mock data
const { images } = require('../../database/mock-image-data');

router.get('/:id', (req, res) =>{
    const id = req.params.id - 1;
    if(images[id]){
        console.log(`Grabbing image at id: ${id + 1}`)
        res.send(images[id])
    } else {
        res.sendStatus(404);
    }
})

router.get('/business/:id', (req, res) => {
    const businessId = parseInt(req.params.id)
    const businessImages = images.filter((image) => {
        return  (image.id_business === businessId)
    })
    if (businessId > 0){
        res.send(businessImages);
    } else {
        res.sendStatus(404);
    }
}) 

module.exports = router;