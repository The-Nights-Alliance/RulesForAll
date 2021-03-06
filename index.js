import('dotenv').then(d => d.config());
const OPCommands = require('maverick-opcommands');
const Discord = require('discord.js')
const intents = new Discord.Intents(32767);
const client = new Discord.Client({
    intents
});
global.client = client // do not remove, required for API
require('./api')

const handler = new OPCommands(client, {
    commandsDir: "commands", // your commands' directory
    eventsDir: "events", // your events' directory
    testGuildID: "935949267904921710", // the ID of the Test Server
    testMode: false, // should OPCommands start in test mode (guild only)?
    logs: true, // should OPCommands log its actions?
    notifyOwner: false // should OPCommands notify the bot owner(s) when the bot goes online?
});
handler.setBotOwner("688874082523152483"); // maverickquill55
handler.addBotOwner("290545409481244672"); // mcorange
handler.addBotOwner("538009668035805195"); // patapizza
handler.setMessages({
    ownerOnly: (interaction) => interaction.reply("Missing **Bot Owner** permission."),
    permissions: (interaction, perms) => interaction.reply(`You are missing the following permissions: **${perms.join(", ")}**`),
    cooldown: (interaction, cooldown) => interaction.reply(`You must wait **${cooldown}** before executing another command.`),
    notifyOwnerMessage: (owner) => {
        owner.createDM();
        owner.send("I'm online!");
    }
}); // sets the limit messages, not required

client.on('messageCreate', async (message) => {
    if (message.author.bot && message.type === 'CHANNEL_PINNED_MESSAGE') {
      message.delete().catch(e=>null);
    }
})

client.login(process.env.BOT_TOKEN);