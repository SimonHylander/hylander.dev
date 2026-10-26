import { initBotId } from "botid/client/core";

// BotID attaches its challenge headers to requests to these paths; /api/ask verifies them with checkBotId().
initBotId({ protect: [{ path: "/api/ask", method: "POST" }] });
