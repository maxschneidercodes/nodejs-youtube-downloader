const ytdl = require("ytdl-core");
const fs = require("fs");
const videoId =
  "https://www.youtube.com/watch?v=rKdRj4nVqqg&ab_channel=MarkDeJesus";
// Get video info from YouTube
ytdl
  .getInfo(videoId)
  .then((info) => {
    // Select the video format and quality
    const format = ytdl.chooseFormat(info.formats, { quality: "18" });
    // Create a write stream to save the video file
    const outputFilePath = `${info.videoDetails.title}.mp4`;
    const outputStream = fs.createWriteStream(outputFilePath);
    // Download the video file
    ytdl.downloadFromInfo(info, { format: format }).pipe(outputStream);
    // When the download is complete, show a message
    outputStream.on("finish", () => {
      console.log(`Finished downloading: ${outputFilePath}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
