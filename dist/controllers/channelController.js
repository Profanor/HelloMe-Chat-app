"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myChannelServer = void 0;
const stream_chat_1 = require("stream-chat");
// initialize Stream Chat SDK
const serverSideClient = new stream_chat_1.StreamChat(process.env.STREAM_API_KEY || '', process.env.STREAM_APP_SECRET);
const myChannelServer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    // Input Validation
    if (!username || typeof username !== 'string') {
        return res.status(400).json({ error: 'Invalid username' });
    }
    try {
        const token = serverSideClient.createToken(username);
        // Update user
        yield serverSideClient.upsertUser({
            id: username,
            name: username,
            token: token,
        });
        // Create channel
        const admin = { id: "admin" };
        const channel = serverSideClient.channel("team", "general", {
            name: "General",
            created_by: admin,
        });
        yield channel.create();
        yield channel.addMembers([username, "admin"]);
        // Log successful creation
        console.log(`User ${username} joined the chat`);
        // Send response with token and user information
        res.status(200).json({ user: { username }, token });
    }
    catch (error) {
        console.error("Error joining chat:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.myChannelServer = myChannelServer;
