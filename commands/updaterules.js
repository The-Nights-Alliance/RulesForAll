const lib = require('#lib')
const db = require('#db')
const { Client, CommandInteraction } = require('discord.js')
module.exports = {
    name: 'update',
    description: 'Update rules embed, mainly used for debug purposes',
    limits: {
        owner: false,
        permissions: ["MANAGE_GUILD"]
    },
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: (client, interaction) => {
        (async() => {
            const guildid = interaction.guildId;
            await interaction.deferReply();
            lib.editrules(guildid, client, true)
            await lib.update(db.rule,
            {
                where: {
                    serverId: guildid
                }
            },
            (rule, ruleindex ,id)=>{
                return {
                    number: {
                        set: ruleindex + 1
                    }
                }
            }, "id")
            await interaction.editReply("Done!");
        })()
    }
}