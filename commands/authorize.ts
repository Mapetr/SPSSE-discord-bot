import { Command } from './mod.ts';
import { SendReply } from '../util/mod.ts';
import { Client, Databases, ID } from "https://deno.land/x/appwrite/mod.ts";

const client = new Client()
  .setEndpoint(Deno.env.get("APPWRITE_ENDPOINT") || "")
  .setProject(Deno.env.get("APPWRITE_PROJECT_ID") || "")
  .setKey(Deno.env.get("APPWRITE_API_KEY") || "");

const database = new Databases(client);

export const authorize: Command = {
  name: 'authorize',
  description: 'Authorize yourself!',
  execute: async (interaction) => {
    const databaseId = Deno.env.get("APPWRITE_DATABASE_ID") || "";
    const collectionId = Deno.env.get("APPWRITE_AUTH_ID") || "";
    const code = CreateCode(8);
    database.createDocument(databaseId, collectionId, code, {
      "userId": interaction.member.user.id,
      "expires": Date.now() + 60000000, // TODO: Change in production
    }).catch((err) => {
      console.log(err);
      return Promise.resolve(SendReply("An error occurred.", true));
    });
    return Promise.resolve(SendReply(`Link at https://194-126-177-66-u0mdln.tunl.online/auth/${code}`, true));
  }
}

function CreateCode(length: number): string {
  const inOptions: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result: string = "";
  for (let i = 0; i < length; i++) {
    result += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
  }
  return result
}