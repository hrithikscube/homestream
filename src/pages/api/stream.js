import fs from "fs";
import path from "path";

const VIDEO_FOLDER = "/Users/hrithik/Downloads/HomeStream";

export default function handler(req, res) {
  const { filename } = req.query; // filename comes from query param

  if (!filename) return res.status(400).send("Filename is required");

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

    const fileStream = fs.createReadStream(filePath, { start, end });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    });

    return fileStream.pipe(res);
  }

  // Full video if no range
  res.writeHead(200, {
    "Content-Length": fileSize,
    "Content-Type": "video/mp4",
  });

  return fs.createReadStream(filePath).pipe(res);
}
