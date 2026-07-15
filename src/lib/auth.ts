import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("learnify");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),
    emailAndPassword: { // [!code highlight]
        enabled: true, // [!code highlight]
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "user",
                // Never trust a client-supplied role on signup/update — only the
                // Express admin API (which requires an authenticated admin session)
                // may change this field, via a direct database write.
                input: false,
            },
        },
    },
});
