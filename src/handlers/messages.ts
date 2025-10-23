// src/handlers/messages.ts
import type { SlackEventMiddlewareArgs, AllMiddlewareArgs } from "@slack/bolt";
import { log } from "../logger.js";

export const registerMessageLogger = (app: any) => {
  app.event(
    "message",
    async ({ event }: SlackEventMiddlewareArgs<"message"> & AllMiddlewareArgs) => {
      try {
        // Ignorer les messages de bots et certains sous-types
        // @ts-ignore Slack peut ajouter des sous-types non typés
        if ((event as any).bot_id) return;
        // @ts-ignore
        if ((event as any).subtype && (event as any).subtype !== "bot_message") return;

        const user = (event as any).user as string | undefined;
        const channel = (event as any).channel as string;
        const text = (event as any).text as string | undefined;

        log.info(`[message] user=${user} channel=${channel} text=${text}`);

        // Réponse mot-clé "ping" → "Pong"
        if (typeof text === "string" && text.toLowerCase().includes("ping")) {
          await app.client.chat.postMessage({
            token: process.env.SLACK_BOT_TOKEN, // nécessite chat:write
            channel,
            text: `Pong${user ? ` <@${user}>` : ""} !`,
          });
        }
      } catch (err) {
        log.error("Error in message event:", err);
      }
    }
  );
};
