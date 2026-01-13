import express from "express";
import urlRoute from "./routes/url.js";
import {connectMongoDB} from "./connection.js";
import URL from "./models/url.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const PORT = process.env.PORT || 8001;
const app=express();

//connection
connectMongoDB(process.env.MONGO_URL)
.then(()=>{console.log("mongoDB connected")})
.catch((err) => console.error("MongoDB error:", err));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/url",urlRoute);

app.get('/', (req, res) => {
  res.send('Short URL API is running!');
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