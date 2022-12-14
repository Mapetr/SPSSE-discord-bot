import {CategoryChannel, EmbedBuilder, GuildChannel, TextChannel, VoiceChannel} from "discord.js";
import {convertChannelType} from "../lib/conversion.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'channelUpdate',
  once: false,
  async execute(oldChannel: GuildChannel, newChannel: GuildChannel) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Kanál upraven")
      .setFooter({text: `ID: ${newChannel.id}`})
      .setDescription(`**[${newChannel.name}](${newChannel.url})**`)
      .setTimestamp();
    if (oldChannel.name !== newChannel.name) {
      embed.addFields({name: 'Název', value: `${oldChannel.name} -> ${newChannel.name}`});
    }
    // Text
    if (oldChannel.isTextBased() && newChannel.isTextBased()) {
      const oldTextChannel = <TextChannel>oldChannel;
      const newTextChannel = <TextChannel>newChannel;
      if (oldTextChannel.topic !== newTextChannel.topic) {
        embed.addFields({name: 'Téma', value: `${oldTextChannel.topic} -> ${newTextChannel.topic}`});
      }
      if (oldTextChannel.nsfw !== newTextChannel.nsfw) {
        embed.addFields({name: 'NSFW', value: `${oldTextChannel.nsfw} -> ${newTextChannel.nsfw}`});
      }
      if (oldTextChannel.rateLimitPerUser !== newTextChannel.rateLimitPerUser) {
        embed.addFields({
          name: 'Rate limit',
          value: `${oldTextChannel.rateLimitPerUser} -> ${newTextChannel.rateLimitPerUser}`
        });
      }
    }
    // Voice
    if (oldChannel.isVoiceBased() && newChannel.isVoiceBased()) {
      const oldVoiceChannel = <VoiceChannel>oldChannel;
      const newVoiceChannel = <VoiceChannel>newChannel;
      if (oldVoiceChannel.bitrate !== newVoiceChannel.bitrate) {
        embed.addFields({name: 'Bitrate', value: `${oldVoiceChannel.bitrate} -> ${newVoiceChannel.bitrate}`});
      }
      if (oldVoiceChannel.userLimit !== newVoiceChannel.userLimit) {
        embed.addFields({
          name: 'Limit uživatelů',
          value: `${oldVoiceChannel.userLimit} -> ${newVoiceChannel.userLimit}`
        });
      }
    }
    // Thread
    if (oldChannel.isThread() && newChannel.isThread()) {
      if (oldChannel.parentId !== newChannel.parentId) {
        embed.addFields({name: 'Parent ID', value: `${oldChannel.parentId} -> ${newChannel.parentId}`});
      }
      if (oldChannel.archived !== newChannel.archived) {
        embed.addFields({name: 'Archivováno', value: `${oldChannel.archived} -> ${newChannel.archived}`});
      }
      if (oldChannel.autoArchiveDuration !== newChannel.autoArchiveDuration) {
        embed.addFields({
          name: 'Automatická doba archivace',
          value: `${oldChannel.autoArchiveDuration} -> ${newChannel.autoArchiveDuration}`
        });
      }
    }
    // Type
    if (oldChannel.type !== newChannel.type) {
      embed.addFields({
        name: 'Typ',
        value: `${convertChannelType(oldChannel.type)} -> ${convertChannelType(newChannel.type)}`
      });
    }
    // Parent
    if (oldChannel.parentId !== newChannel.parentId) {
      const oldParent = <CategoryChannel>oldChannel.parent;
      const newParent = <CategoryChannel>oldChannel.parent;
      embed.addFields({
        name: 'Rodič',
        value: `[${oldParent.name}](${oldParent.url}) -> ${newParent.name}](${newParent.url})`
      });
    }
    // Position
    if (oldChannel.rawPosition !== newChannel.rawPosition) {
      embed.addFields({name: 'Pozice', value: `${oldChannel.rawPosition} -> ${newChannel.rawPosition}`});
    }
    await sendLog(embed, newChannel.client, newChannel.guild.id);
  }
}
