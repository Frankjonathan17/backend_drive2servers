const router = require('express').Router()
const ffmpeg = require("fluent-ffmpeg");
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");




const driveApiKey = '';

router.post('/', async(req,res)=>{
    
    try{

 const fileId = req.body.url   
const accessToken = 'AIzaSyCKWpn8YxNoRFmJRTDkfAB9SXEJ9tR1niM';
 const clientId = "52664846243-b8aushlrclrjme723ao2ih5mjujag1b9.apps.googleusercontent.com";
const clientSecret = "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";
const redirectUri = "http://localhost:4500";

const oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);

  oAuth2Client.setCredentials({ access_token: accessToken });

  const drive = google.drive({
    version: "v3",
    auth: oAuth2Client
  });

  // Download the video file from Google Drive
  const video = await drive.files.get({
    fileId,
    alt: "media"
  }, {
    responseType: "stream"
  });
console.log('imechikuw video kutoka drive teyari')
  // Convert the video file
  ffmpeg(video.data)
    .format("mp4")
    .output("converted.mp4")
    .on("end", async () => {
      // Upload the video to YouTube
      oAuth2Client.setCredentials({ access_token: accessToken });

      const youtube = google.youtube({
        version: "v3",
        auth: oAuth2Client
      });
      console.log('imecovert video kuwa mp4 teyari')
      const youtubeVideo = {
        resource: {
          snippet: {
            title: "My Video",
            description: "This is a description of my video."
          },
          status: {
            privacyStatus: "private"
          }
        },
        media: {
          body: fs.createReadStream("converted.mp4")
        }
      };
      console.log('imepekea start video upload youtube teyari')
      const youtubeResponse = await youtube.videos.insert(youtubeVideo, {
        part: "snippet,status"
      });
      console.log('imeupload youtube teyari')
      console.log(youtubeResponse);
      res.send({ success: true });
    })
    .run();


          
   }
   catch(er){
    return res.json({error:er,message:'express server imeshindwa hifadhi!'}).status(500)
   }
      
 })

module.exports = router;