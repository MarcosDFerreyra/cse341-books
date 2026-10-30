import app from "./app.js";
import { connectToDb } from './src/db/connect.js';
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const PORT = process.env.PORT;

if (!PORT) {
    throw new Error('PORT is not defined. Make sure your local npm scripts reference the .env file with --env-file=.env, or define PORT in your hosted environment settings.');
}
const startServer = async () =>{
    try {
        await connectToDb();
        app.listen(PORT, () => {
            console.log(`Server listening at 127.0.0.1:${PORT}`);
        });
    }
    catch (error) {
        console.log('Database Connection Failed', error.message);
        process.exit(1);
    }
}

await startServer();