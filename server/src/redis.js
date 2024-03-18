import Redis from "ioredis";

const getRedis = () => {
    if (process.env.REDIS_URL) {
        return new Redis(process.env.REDIS_URL);
    }

    console.log("Redis URL not found");
    return null; // Return null or handle the case where the URL is not found
};

export const redis = getRedis(); // Call the function to get the Redis instance
