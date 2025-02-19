import { createClient } from "redis";

const redisClient = createClient();
redisClient.on('error', err => console.log('Redis Client Error', err));

// Connecting/Starting Redis Server

(async () => {
    await redisClient.connect();
    console.log(`Redis Server Running`);
})();

export default redisClient
