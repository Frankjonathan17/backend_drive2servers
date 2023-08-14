const express = require('express');
const router = express.Router();
const Jimp = require('jimp');
const formidable = require('formidable');
const axios = require('axios');
const sharp = require('sharp');
const FormData = require('form-data');

router.post('/', async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: err,
        message: 'Failed to parse form data',
      });
    }

    try {
      
      // Download image from URL and convert to buffer
      const imageUrl = fields.url; // Assuming the URL of the image is passed in 'url' field
      let imageBuffer = '';
      console.log(fields)
    if(fields.buffer !== undefined){
      
      imageBuffer = Buffer.from( JSON.parse(fields.buffer), 'binary');
      console.log('buffer found')
    }else{
      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      imageBuffer = Buffer.from(imageResponse.data, 'binary');
    }
      
      if(fields.mimetype === 'image/webp'){
        // Convert webp image to jpg using sharp
        const sharpBuffer = await sharp(imageBuffer).jpeg().toBuffer();
        imageBuffer = sharpBuffer;
      //  console.log('converted from webp to jpeg')
      }

      // Create Jimp image object from buffer
      const image = await Jimp.read(imageBuffer);
      let quality = 28;
      let level = 12;
      if(fields.quality !== undefined){
        quality = Number(fields.quality);
      }
      if(fields.level !== undefined){
        level = Number(fields.level);
      }
      // Compress image to reduce size up to 80%
      image.quality(quality); // Adjust quality level as needed, lower values result in higher compression

      // Apply blur effect
      image.blur(level);

      // Convert blurred image to buffer
      const buffer = await image.getBufferAsync(Jimp.AUTO);

      // Convert buffer to base64 string
      const base64Image = buffer.toString('base64');
if(fields.backdata!==undefined){
  return res.json({ message: 'Image blurred', results: base64Image });
}
      // Upload blurred image to imgBB API
      const imgBBAPIKey = 'c90d79fbc9f40f3d28ad6e44830bf9aa'; // Replace with your own imgBB API key
      const imgBBUploadUrl = 'https://api.imgbb.com/1/upload';
      const formData = new FormData();
      formData.append('key', imgBBAPIKey);
      formData.append('image', base64Image);
      formData.append('name', fields?.name);
      const response = await axios.post(imgBBUploadUrl, formData, {
        headers: formData.getHeaders()
      });

      // Extract URL of blurred image from imgBB API response
      const blurredImage = response.data.data;

      return res.json({ message: 'Image blurred and uploaded to imgBB', results: blurredImage });
    } catch (error) {
   //   console.error(error);
      return res.json({ error, message: 'Failed to blur and upload image to imgBB' });
    }
  });
});

module.exports = router;
