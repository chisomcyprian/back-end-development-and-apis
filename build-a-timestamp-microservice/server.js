import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

const respond = (res, date) => {
  if (isNaN(date.getTime())) return res.json({ error: "Invalid Date" });
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
};

app.get("/api", (_req, res) => respond(res, new Date()));

app.get("/api/:date", (req, res) => {
  const { date } = req.params;
  const parsed = /^-?\d+$/.test(date) ? new Date(Number(date)) : new Date(date);
  respond(res, parsed);
});



const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
