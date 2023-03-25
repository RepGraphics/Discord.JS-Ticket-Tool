const sourcebin = require('sourcebin_js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require("discord.js");
const { Transcripts, TicketRole } = require('./../Database/Information.json');

module.exports = {
    name:"closeticket",
    data: new SlashCommandBuilder()
    .setName("closeticket")
    .setDescription("Closes your purchase ticket."),

run: async (client, interaction) => { 

                    const TicketMod = interaction.guild.roles.fetch(TicketRole).toString();
                    const creator = interaction.guild.members.cache.get(interaction.channel.topic); 
                    const TicketLogs = client.channels.cache.get(Transcripts);
                    let ticketowner = interaction.guild.members.cache.get(interaction.user.id);

                    if (ticketowner === creator || TicketMod.includes(interaction.user.id) && interaction.channel.name.includes('ticket')){
                
                    await interaction.followUp({ content: 'Saving transcript...' });

                    interaction.channel.messages.fetch().then(async (messages) => {
                        const content = messages.reverse().map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');
        
                        let transcript = await sourcebin.create([{ name: `${interaction.channel.name}`, content: content, languageId: 'text' }], {
                            title: `Chat transcript: ${interaction.channel.name}`,
                            description: 'Ticket Bot | By Rep Graphics#9194',
                        });
          
                        const embed = new EmbedBuilder()
                        .setTitle("Ticket Transcript")
                        .addFields(
                            { name: "Channel", value: `${interaction.channel.name}`},
                            { name: "Ticket Owner", value: `${creator}`},
                            { name: "Direct Transcript", value: `[Direct Transcript](${transcript.url})`}
                        )
                
                        await TicketLogs.send({ embeds: [embed] });
                    });
        
                    await interaction.followUp({ content: 'Ticket will be deleted in 10 seconds!' });
                    console.log(`A Ticket was Closed by ${interaction.member.user.username}#${interaction.member.user.discriminator}`)
        
                    setTimeout(async function () {
                        interaction.channel.delete();
                    }, 10000);
                } else {
                    await interaction.followUp({ content: 'Error Deleting Ticket!' });
                }
		}
	}