import {EmbedBuilder, GuildScheduledEvent, User} from "discord.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'guildScheduledEventUserRemove',
  once: false,
  async execute(event: GuildScheduledEvent, user: User) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Uživatel se odstranil z eventu")
      .setFields(
        {name: 'Jméno', value: event.name},
        {name: 'Uživatel', value: user.tag},
      )
      .setImage(event.image)
      .setFooter({ text: `ID: ${event.id}` })
      .setTimestamp();
    await sendLog(embed, event.client);
  }
}
