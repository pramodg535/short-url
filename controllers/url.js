import { nanoid } from "nanoid";
import URL from "../models/url.js";
import isValidHttpUrl from "../utils/validateUrl.js";

function getTodayDate() {
  return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
}



async function handleGenerateNewShortUrl(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ msg: "URL is required" });
  }

  if (!isValidHttpUrl(url)) {
    return res.status(400).json({ msg: "Invalid URL. Use http or https" });
  }
  
  //  Prevent shortening own short URLs
  const baseUrl = process.env.BASE_URL;

  if (url.startsWith(baseUrl)) {
    return res.status(400).json({
      msg: "Cannot shorten already shortened URL",
    });
  }

  const shortId = nanoid(7);

  try {
    await URL.create({
      shortId,
      redirectURL: url,
      totalClicks: 0,
      createdDate: getTodayDate(),
    });

    return res.json({ id: shortId });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
}




async function handleAnalytics(req, res) {
  const { shortId } = req.params;

  const result = await URL.findOne({ shortId });

  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.json({
    totalClicks: result.totalClicks,
    createdDate: result.createdDate,
  });
}


export { handleGenerateNewShortUrl,handleAnalytics };
