const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { BotToken, OwnerID, BotActivity } = require('./Database/Information.json');
const client = new Client( { intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildMessages  ] })

client.slash_commands = new Collection();
client.aliases = new Collection();
client.settings = { OwnerID }

for(let handler of  ["slash_command", "event"]) require(`./handlers/${handler}`)(client);

client.login(BotToken)