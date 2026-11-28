import { StartClient } from "@tanstack/react-start/client";
import { initBotId } from "botid/client/core";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";

// BotID attaches its challenge headers to requests to these paths; /api/ask verifies them with checkBotId().
initBotId({ protect: [{ path: "/api/ask", method: "POST" }] });

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <StartClient />
    </StrictMode>,
  );
});
