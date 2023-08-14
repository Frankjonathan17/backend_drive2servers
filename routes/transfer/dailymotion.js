const router = require('express').Router()
const https = require('https');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const axios = require('axios').default;
const Dailymotion = require('dailymotion-sdk').Dailymotion;
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");

router.post('/api/auth/callback', async (req, res) => {
    // Set up the OAuth2 client
const clientId = "52664846243-b8aushlrclrjme723ao2ih5mjujag1b9.apps.googleusercontent.com";
const clientSecret = "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";
const redirectUri = "https://www.google.com";
const oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);

    const { code } = req.query;
    try {
  
      const { tokens } = await oAuth2Client.getToken(code);
      console.log('tokens ni ',tokens)
      oAuth2Client.setCredentials(tokens);
  
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
  
      let totalSize = 0
      console.log('Getting video from Google Drive...');
      const video = await drive.files.get({ fileId, alt: "media" }, { responseType: "stream", httpAgent: httpAgent })
        .then(res => {
          const videoSize = res.headers['content-length'];
          console.log(`Video size: ${videoSize} bytes`);
          totalSize = videoSize
          return res.data;
        })
        .catch(err => {
          console.error('Error getting video from Google Drive', err);
          res.status(500).send('Error getting video from Google Drive');
          return;
        });
  
      if (!video || typeof video.pipe !== 'function') {
        console.error('Invalid video data');
        res.status(500).send('Invalid video data');
        return;
      }
  
      console.log('Video data received');
  
      // Set up Dailymotion API client
      const apiBase = "https://api.dailymotion.com";
      const accessTokenResponse = await axios.post(`${apiBase}/oauth/token`,
        {
          grant_type: "client_credentials",
          client_id: "YOUR_CLIENT_ID",
          client_secret: "YOUR_CLIENT_SECRET",
          scope: "manage_videos",
        }
      );
      const accessToken = accessTokenResponse.data.access_token;
      const dailymotion = axios.create({
        baseURL: apiBase,
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        httpAgent: httpAgent
      });
  
      // Get the upload URL for Dailymotion
      const uploadUrlResponse = await dailymotion.post('/file/upload');
      const uploadUrl = uploadUrlResponse.data.upload_url;
  
      // Create the upload request
      const uploadRequest = {
        url: uploadUrl,
        method: 'put',
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Length': totalSize
        },
        data: video
      };
  
      // Upload the video to Dailymotion
      console.log('Uploading video to Dailymotion...');
      const uploadResponse = await axios(uploadRequest);
      const videoId = uploadResponse.data.id;
      console.log(`Video uploaded to Dailymotion with ID ${videoId}`);
  
      // Set the video properties
      const videoProperties = {
        url: `https://www.dailymotion.com/video/${videoId}`,
        title: "My Video",
        description: "This is a description of my video."
      };
  
      // Publish the video on Dailymotion
      console.log('Publishing video on Dailymotion...');
      const publishResponse = await dailymotion.post('/me/videos', videoProperties);
      console.log('Video published on Dailymotion');
  
      return res.send({ success: true });
  
    } catch (error) {
      console.error('Error uploading video to Dailymotion')
    }
})

module.exports = router