import express from "express";

const router=express.Router();

import {handleGenerateNewShortUrl, handleAnalytics } from "../controllers/url.js";

router.post("/",handleGenerateNewShortUrl);
router.get("/analytics/:shortId",handleAnalytics);

export default router;