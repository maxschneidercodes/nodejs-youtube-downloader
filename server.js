const ytdl = require("ytdl-core");
const fs = require("fs");
const videoId = "https://www.youtube.com/shorts/4xii9btD3jk?feature=share";

ytdl
  .getInfo(videoId)
  .then((info) => {
    const format = ytdl.chooseFormat(info.formats, { quality: "136" });
    const outputFilePath = `${info.videoDetails.title}.mp4`;
    const outputStream = fs.createWriteStream(outputFilePath);

    ytdl.downloadFromInfo(info, { format: format }).pipe(outputStream);

    outputStream.on("open", (chunck) => {
      console.log("downloading..");
    });

    outputStream.on("finish", () => {
      console.log(`Finished downloading: ${outputFilePath}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
