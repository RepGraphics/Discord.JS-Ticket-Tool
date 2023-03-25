const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField, ChannelType } = require("discord.js");
const { TicketRole, BotIcon, BotName, BotNameLink } = require('../Database/Information.json');

module.exports = {
    name:"createticket",
    data: new SlashCommandBuilder()
    .setName("createticket")
    .setDescription("Creates a Ticket"),

run: async (client, interaction) => { 

            let ticketName = `ticket-${interaction.user.username}`.toLowerCase();
            await interaction.followUp({ content: `Creating ticket...`, ephemeral: true });

            if (interaction.guild.channels.cache.find(c => c.topic == interaction.user.id && c.name.includes("ticket"))) 
            return interaction.editReply({ content: `You have already created a ticket!`, ephemeral: true });

            const createdChannel = await interaction.guild.channels.create({
                name: ticketName,
                topic: interaction.user.id,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                  { id: interaction.user.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks], },
                  { id: TicketRole, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.ManageMessages], },
                  { id: interaction.guild.roles.everyone, deny: [PermissionsBitField.Flags.ViewChannel], },
                ],
            })
            
            await interaction.followUp({ content: `Ticket created successfully in ${createdChannel}!` , ephemeral: true });

            const embed = new EmbedBuilder()
            .setTitle("New Ticket!")
            .setAuthor({ name: BotName, iconURL: BotIcon, url: BotNameLink })
            .setDescription(`Welcome <@!${interaction.user.id}>, We will assist you shortly!`)
            .setTimestamp()
            .setThumbnail(BotIcon)
            await createdChannel.send({ embeds: [embed] });
            console.log(`A Ticket was created by ${interaction.member.user.username}#${interaction.member.user.discriminator}`);
}
}