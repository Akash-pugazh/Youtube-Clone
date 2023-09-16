import express from "express";
import ffmpeg from "fluent-ffmpeg";

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/process-video", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
