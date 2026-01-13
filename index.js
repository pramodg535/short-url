import express from "express";
import urlRoute from "./routes/url.js";
import {connectMongoDB} from "./connection.js";
import URL from "./models/url.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const PORT = process.env.PORT || 8001;
const app=express();

//connection
connectMongoDB(process.env.MONGO_URL)
.then(()=>{console.log("mongoDB connected")})
.catch((err) => console.error("MongoDB error:", err));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "frontend")));
app.use("/url",urlRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});


app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $inc: { totalClicks: 1 } },
    { new: true }
  );

  if (!entry) return res.status(404).send("Not found");

  res.redirect(entry.redirectURL);
});


app.listen(PORT,()=>{console.log("Server Started at Port:",PORT)});