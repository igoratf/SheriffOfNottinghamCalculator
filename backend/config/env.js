import { config } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
// __dirname is currently: your-project/backend/config
const __dirname = path.dirname(__filename);

// Go up TWO levels to reach the root .env
const envPath = path.join(__dirname, "../../.env");

// Load it!
config({ path: envPath });

export const { PORT, DATABASE_URL } = process.env;
