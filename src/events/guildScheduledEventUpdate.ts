import {EmbedBuilder, GuildScheduledEvent} from "discord.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'guildScheduledEventUpdate',
  once: false,
  async execute(oldEvent: GuildScheduledEvent, newEvent: GuildScheduledEvent) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Upraven event")
      .setImage(newEvent.image)
      .setURL(newEvent.url)
      .setFooter({text: `ID: ${newEvent.id}`})
      .setTimestamp();
    // Name
    if (oldEvent.name !== newEvent.name) {
      embed.addFields({name: 'Jméno', value: `${oldEvent.name} -> ${newEvent.name}`});
    }
    // Description
    if (oldEvent.description !== newEvent.description) {
      embed.addFields({name: 'Popis', value: `${oldEvent.description} -> ${newEvent.description}`});
    }
    // Start
    if (oldEvent.scheduledStartAt !== newEvent.scheduledStartAt) {
      embed.addFields({
        name: 'Začátek',
        value: newEvent.scheduledStartAt ? `<t:${newEvent.scheduledStartTimestamp}>` : "N/A",
        inline: true
      });
    }
    // Rnd
    if (oldEvent.scheduledEndAt !== newEvent.scheduledEndAt) {
      embed.addFields({
        name: 'Konec',
        value: newEvent.scheduledEndAt ? `<t:${newEvent.scheduledEndTimestamp}>` : "N/A",
        inline: true
      });
    }
    await sendLog(embed, newEvent.client, newEvent.guildId);
  }
}
