const express = require('express')
const cors = require('cors');
const fs = require('fs');
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");
const https = require('https');
const {VK} = require('vk-io');
const path = require('path');
const FormData = require('form-data');
const { pipeline } = require('stream');

const app = express()
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use(express.json())

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// Add middleware to set CORS headers
app.use((req, res, next) => {
  // Set the 'Access-Control-Allow-Origin' header to '*'
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Set other necessary headers such as 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers', etc.
  // ...
  next();
});


// Set up the OAuth2 client
const clientId = "52664846243-b8aushlrclrjme723ao2ih5mjujag1b9.apps.googleusercontent.com";
const clientSecret = "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";
const redirectUri = "https://www.google.com";

const oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);

// Route to initiate the OAuth2 authorization flow
app.get('/api/get/auth', (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/youtube.upload']
  });
  res.json(authUrl);
});
const axios = require('axios').default;

// Use a keep-alive agent to avoid network resets
const httpAgent = new https.Agent({
  keepAlive: true,
  maxSockets: Infinity,
  rejectUnauthorized: false
});

// Route to initiate the OAuth2 authorization flow
app.get('/', (req, res) => {
res.send('IPO HEWANI SERVER YA D2SERVER')
});



// Define API endpoint to generate VK API access token
app.get('/get-vk-token', async (req, res) => {
  try {
    // Make a request to the VK API to generate an access token
    let urlRed = 'https://thoughtful-gold-leg-warmers.cyclic.app/get-vk-token'
   // urlRed ='http://localhost:8080/get-vk-token'
    const response = await axios.get('https://oauth.vk.com/access_token', {
      params: {
        client_id:'51571058',
        client_secret: 'PhzD0xkirNTaZJzfsJfp',
        redirect_uri: urlRed, // Replace with your API endpoint
        code: req.query.code,
      },
    });

    // Send the access token back to the client
    res.send(response.data.access_token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to generate VK API access token' });
  }
});

app.post('/api/auth/callback', async (req, res) => {
  const videoFilePath = './myVideo.mp4'; // Change this to your desired file path
  try {
    res.set({
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/plain'
    });
    const { code } = req.query;
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    // VK----------------------------
    const { vkToken } = req.body;
    console.log('Fetching VK API upload server URL...');
    const vk = new VK({
      token: vkToken
    });
    const uploadServer = await vk.api.video.save({
      name: 'My Video',
      description: 'This is a description of my video.',
      is_private: 0,
      v: "5.131"
    });
    console.log('Uploading video to VK API server...');
    // Gdrive-------------------------
    const fileId = req.body.url;
    if (!fileId) {
      console.error('Google Drive file ID is not provided');
      res.status(400).send('Google Drive file ID is not provided');
      return;
    }
    const drive = google.drive({
      version: "v3",
      auth: oAuth2Client,
      httpAgent: httpAgent
    });
    console.log('Getting video from Google Drive...');
    let endpoint = uploadServer.upload_url;
    // Create a new FormData object to send the video to VK API
    const form = new FormData();
    form.append('name', 'My Video testing again');
    // Create a writable stream to save the video to disk
    const videoBuffer = [];
    // Fetch the stream object from Google Drive
    const fileStream = drive.files.get(
      { fileId, alt: "media" },
      {
        responseType: 'stream',
        httpAgent: httpAgent
      }
    ).then(res =>{
      console.log('completely received')
      form.append('video_file', res.data);
      // Pipe the Google Drive stream to the video file on disk
      
      console.log('Form data ready for upload.');
      // Send the multipart/form-data request to the VK API
      console.log('Send the multipart/form-data request to the VK API')
       // Calculate the total length of the form data
  form.getLength(async (err, length) => {
    if (err) {
      console.error('Error calculating form data length:', err);
      return res.json({ error: err }).status(500);
    }

   // Update the Content-Length header
   const headers = {
    ...form.getHeaders(),
    'Content-Length': length
  };
    axios.post(endpoint, form, {
        headers:headers,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      })
      .then(response => {
        console.log(response.data)
      return res.send(response.data)
      })
      .catch(error => {
        console.error(error)
        return res.json({ error: error}).status(500)
      });
    return res.data
    
  })
 
    });


    // Pipe the stream to the form object and then to the VK API endpoint
    // pipeline(
    //   fileStream,
    //   form,
    //   (error) => {
    //     if (error) {
    //       console.error('Pipeline failed.', error);
    //     } else {
      
    //     }
    //   }
    // );
  } catch (error) {
    
    console.error('Error uploading video to VK API', error);
    res.status(500).send('Error uploading video to VK API');
  }
});




app.listen(port,()=>{
    console.log('server listen in port ',port);
})