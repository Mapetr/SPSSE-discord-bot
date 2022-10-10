import {EmbedBuilder, StageInstance, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'stageInstanceDelete',
  once: false,
  async execute(stage: StageInstance) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Odebrán stage kanál")
      .setFields(
        { name: 'Téma', value: stage.topic }
      )
      .setFooter({ text: `ID: ${stage.id}` })
      .setTimestamp();
    const sendChannel = stage.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}