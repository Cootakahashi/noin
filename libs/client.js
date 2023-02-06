import { createClient } from 'microcms-js-sdk';

export const client = createClient({
    serviceDomain: "noin",
    apiKey: process.env.API_KEY,
});