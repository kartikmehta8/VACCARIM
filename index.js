const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("./fetch"); // Custom function to fetch text completions from OpenAI.
const image = require("./image"); // Custom function to generate images from OpenAI.

// Initialize the Discord client with the necessary intents for your bot.
const bot = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
  ],
});

const prefix = "-"; // Command prefix.
const discord_api_key = process.env['DISCORD_API_KEY'];
const TOKEN = discord_api_key;

bot.on("ready", () => {
  console.log("VACCARIM Logged In Successfully!");
  bot.user.setActivity("-help", { type: "LISTENING" });
});

// Event listener for messages in any guild the bot is in.
bot.on("message", (message) => {
  // Split message content into command and arguments.
  let args = message.content.slice(prefix.length).trim().split(/ +/);

  // Check for the command '-v code'
  if (args[0] == "v" && args[1] == "code") {
    args = args.slice(2);
    text = args.join(" ");
    fetch(text)
      .then((resData) => {
        code = resData.data.choices[0];
        message.channel.send("```" + code["text"] + "```");
      })
      .catch((err) => console.log(err));

  // Check for the command '-v image'.
  } else if (args[0] == "v" && args[1] == "image") {
    args = args.slice(2);
    text = args.join(" ");
    image(text).then((resData) => {
      // Create an embed with the generated image.
      const image = new MessageEmbed().setImage(
        resData.data.data[0]["url"]
      );
      message.channel.send({ embeds: [image] });
    });
  }
});

bot.login(TOKEN);
