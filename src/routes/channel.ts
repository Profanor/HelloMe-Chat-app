import express from "express";
import { myChannelServer } from "../controllers/channelController";

const router = express.Router();

router.post('/join', myChannelServer)

export default router;