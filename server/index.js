const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3333;

// Allow requests from any device in LAN
app.use(cors());

const VIDEO_FOLDER = "/Users/hrithik/Downloads/HomeStream";

// Endpoint to list all videos
app.get("/files", (req, res) => {
  const files = fs.readdirSync(VIDEO_FOLDER).filter(f => f.endsWith(".mp4"));
  res.json(files);
});

// Endpoint to stream video
app.get("/stream", (req, res) => {
  const filename = req.query.filename;
  if (!filename) return res.status(400).send("Filename required");

  const filePath = path.join(VIDEO_FOLDER, filename);
  if (!fs.existsSync(filePath)) return res.status(404).send("File not found");

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;

    const stream = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    });
    return stream.pipe(res);
  }

  // Full video if no range
  res.writeHead(200, {
    "Content-Length": fileSize,
    "Content-Type": "video/mp4",
  });
  fs.createReadStream(filePath).pipe(res);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
