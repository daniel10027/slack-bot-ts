import Bolt from "@slack/bolt";
const { App, LogLevel } = Bolt as any;

import "dotenv/config";
import { log } from "./logger.js";
import { registerHello } from "./handlers/hello.js";
import { registerMessageLogger } from "./handlers/messages.js";

// Vérification des variables d'env requises
const requiredEnv = ["SLACK_BOT_TOKEN", "SLACK_APP_TOKEN"] as const;
for (const key of requiredEnv) {
  if (!process.env[key]) {
    log.error(`Missing ${key} in environment (.env)`);
    process.exit(1);
  }
}

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
  logLevel: LogLevel.INFO,
});

// Enregistrement des handlers
registerHello(app);
registerMessageLogger(app);

// Démarrage
(async () => {
  try {
    await app.start();
    log.info("Daniel's Slack bot is running in Socket Mode. Press Ctrl+C to exit.");
  } catch (err) {
    log.error("Unable to start the app:", err);
    process.exit(1);
  }
})();
