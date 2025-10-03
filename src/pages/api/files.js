import fs from "fs";
import path from "path";

const VIDEO_FOLDER = "/Users/hrithik/Downloads/HomeStream";

export default function handler(req,res) {
  const files = fs.readdirSync(VIDEO_FOLDER).filter(f => f.endsWith(".mp4"));
  return res.json(files);
}
