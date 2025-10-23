import type { AllMiddlewareArgs, SlackCommandMiddlewareArgs } from "@slack/bolt";
import { log } from "../logger.js";

export const registerHello = (app: any) => {
  app.command(
    "/hello",
    async ({ command, ack, respond }: SlackCommandMiddlewareArgs & AllMiddlewareArgs) => {
      try {
        await ack();
        log.info(`[/hello] from user=${command.user_id} in channel=${command.channel_id}`);
        await respond({
          text: `Hello, <@${command.user_id}>!`,
          response_type: "in_channel",
        });
      } catch (err) {
        log.error("Error in /hello:", err);
      }
    }
  );
};
