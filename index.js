const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("./fetch");
const image = require("./image");

const bot = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
  ],
});

const prefix = "-";
const discord_api_key = process.env['DISCORD_API_KEY'];
const TOKEN = discord_api_key;

bot.on("ready", () => {
  console.log("VACCARIM Logged In Successfully!");
  bot.user.setActivity("-help", { type: "LISTENING" });
});

bot.on("message", (message) => {

  let args = message.content.slice(prefix.length).trim().split(/ +/);

  if (args[0] == "v" && args[1] == "code") {
    args = args.slice(2);
    text = args.join(" ");
    fetch(text)
      .then((resData) => {
        code = resData.data.choices[0];
        message.channel.send("```" + code["text"] + "```");
      })
      .catch((err) => console.log(err));
  } else if (args[0] == "v" && args[1] == "image") {
    args = args.slice(2);
    text = args.join(" ");
    image(text).then((resData) => {
      const image = new MessageEmbed().setImage(
        resData.data.data[0]["url"]
      );
      message.channel.send({ embeds: [image] });
    });
  }
});

bot.login(TOKEN);