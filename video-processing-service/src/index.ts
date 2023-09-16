import express from "express";
import ffmpeg from "fluent-ffmpeg";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.post("/processvideo", (req, res) => {
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;

  if (!inputFilePath || !outputFilePath)
    res.status(400).send({
      status: "Failure",
      message: "File path missing",
    });

  ffmpeg(inputFilePath)
    .outputOptions("-vf", "scale=-1:360")
    .on("end", () => {
      res
        .status(200)
        .send({ status: "Success", message: "Video processing started" });
    })
    .on("error", err => {
      res.status(500).send({ status: "Failure", message: err.message });
    })
    .save(outputFilePath);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
