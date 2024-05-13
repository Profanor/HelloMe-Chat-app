import { Response, Request } from "express";
import { StreamChat } from "stream-chat";

// initialize Stream Chat SDK
const serverSideClient = new StreamChat(
    process.env.STREAM_API_KEY || '',
    process.env.STREAM_APP_SECRET,
  );

export const myChannelServer = async (req: Request, res: Response) => {
    const { username } = req.body;

    // Input Validation
    if (!username || typeof username !== 'string') {
        return res.status(400).json({ error: 'Invalid username' });
    }
    try {
        const token = serverSideClient.createToken(username);

        // Update user
        await serverSideClient.upsertUser(
            {
                id: username,
                name: username,
                token: token,
            }
        );

        // Create channel
        const admin = { id: "admin" };
        const channel = serverSideClient.channel("team", "general", {
            name: "General",
            created_by: admin,
        });
        await channel.create();
        await channel.addMembers([username, "admin"]);

        // Log successful creation
        console.log(`User ${username} joined the chat`);

        // Send response with token and user information
        res.status(200).json({ user: { username }, token });
    } catch (error) {
        console.error("Error joining chat:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};