const sourcebin = require('sourcebin_js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require("discord.js");
const { Transcripts, TicketRole } = require('./../Database/Information.json');

module.exports = {
    run: async (client, interaction) => {

        if (!interaction.isCommand()) return;
        await interaction.deferReply().catch(err => {})

        const { commandName } = interaction;
        const command = client.slash_commands.get(commandName)
        if(!command) return interaction.followUp("Unknown Command: Can not find this command in bot.")

        try {
            if(command) await command.run(client, interaction)
        } catch (err) {
            console.log(err)
            return interaction.followUp(`Something went wrong while executing the command.`)
        } 
    }
}