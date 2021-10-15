const moment = require("moment-timezone");
const sendError = require("../../mores/error");
const sendDone = require("../../mores/success");
const { Client, Message } = require("discord.js");
module.exports = {
  name: "setmessage",
  category: "settings",
  botpermission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "SEND_MESSAGES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "MANAGE_WEBHOOKS",
  ],
  permission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
  ],
  description: "Set the Message For Welcome/Leave/Warn",
  cooldown: 5000,
  /**
   *
   * @param { Client } client
   * @param { Message } message
   * @param { String[] } args
   * @returns
   */
  run: async (client, message, args) => {
    let keys = ["welcome", "leave", "anti-swear"];
    let welcomes = [
      "{member}",
      "{username}",
      "{tag}",
      "{server}",
      "{server_id}",
      "{size}",
      "{date}",
      "{position}",
    ];
    let leaves = [
      "{member}",
      "{username}",
      "{tag}",
      "{server}",
      "{size}",
      "{date}",
      "{position}",
    ];
    let levels = [
      "{member}",
      "{username}",
      "{tag}",
      "{server}",
      "{level}",
      "{xp}",
      "{orl_xp}",
    ];
    let wards = [
      "{user-mention}",
      "{server-name}",
      "{user-tag}",
      "{user-username}",
    ];
    var date = moment.tz("Asia/Jakarta");
    let joinPosition;
    const me = message.guild.members.cache;
    me.sort((a, b) => a.joinedAt - b.joinedAt);
    for (let i = 0; i < me.length; i++) {
      if (me[i].id == message.guild.member(message).id) joinPosition = i;
    }

    const key = await client.awaitReply(
      `Please choose one of this key:\n**${keys.join(
        " | "
      )}**\nType \`cancel\` to stop setup`,
      { message }
    );

    if (!key)
      return sendError(
        "No response was given, Setup Canceled.",
        message.channel
      );
    if (key.toLocaleLowerCase() === "cancel")
      return sendDone("Setup Canceled", message.channel);
    if (!keys.includes(key.toLocaleLowerCase())) {
      sendError(
        "Error: Invalid Key provided, Please try again.",
        message.channel
      );
    }

    //Setup
    if (key.toLocaleLowerCase() === "welcome") {
      let welcome = await client.awaitReply(
        `Please give a message for welcomer!\nCan includes: \`${welcomes.join(
          ", "
        )}\`\nType \`cancel\` to stop setup`,
        { message }
      );
      if (!welcome)
        return sendError(
          "No response was given, Setup canceled",
          message.channel
        );

      if (welcome.toLocaleLowerCase() === "cancel")
        return sendDone("Setup Canceled", message.channel);
      let msg = await client.EEmoji(`${welcome}`, client);
      client.data.set(`welmsg_${message.guild.id}`, msg);
      sendDone(
        `**Done**\nWelcome message setted as\n\`${msg}\`\n\nView:\n${welcome
          .split(`{member}`)
          .join(message.author) // Member mention substitution
          .split(`{username}`)
          .join(message.author.username) // Username substitution
          .split(`{position}`)
          .join(joinPosition || 1) //member.guild.members.cache.size)
          .split(`{tag}`)
          .join(message.author.tag) // Tag substitution
          .split(`{date}`)
          .join(date.format("DD/MMM/YYYY, hh:mm:ss z")) // member guild joinedAt
          .split(`{server}`)
          .join(message.guild.name) // Name Server substitution
          .split(`{server_id}`)
          .join(message.guild.id)
          .split(`{size}`)
          .join(message.guild.members.cache.size)}`,
        message.channel
      );
    }

    if (key.toLocaleLowerCase() === "leave") {
      let leave = await client.awaitReply(
        `Please give a message for leave!\nYou can also add: \`${leaves.join(
          " | "
        )}\`\nType \`cancel\` to stop setup`,
        { message }
      );
      if (!leave)
        return sendErrror(
          "No response was given, Set-up canceled.",
          message.channel
        );
      if (leave.toLocaleLowerCase() === "cancel")
        return sendDone("Setup Canceled.", message.channel);
      let msg = await client.EEmoji(`${leave}`, client);
      client.data.set(`levmsg_${message.guild.id}`, msg);
      sendDone(
        `**Done**\nLeave message has been setted as\n\`${msg}\`\n\nView:\n${leave.content
          .split(`{member}`)
          .join(message.author) // Member mention substitution
          .split(`{username}`)
          .join(message.author.username) // Username substitution
          .split(`{position}`)
          .join(joinPosition || 1) //member.guild.members.cache.size)
          .split(`{tag}`)
          .join(message.author.tag) // Tag substitution
          .split(`{date}`)
          .join(date.format("DD/MMM/YYYY, hh:mm:ss z")) // member guild joinedAt
          .split(`{server}`)
          .join(message.guild.name) // Name Server substitution
          .split(`{size}`)
          .join(message.guild.members.cache.size)}`,
        message.channel
      );
    }
    if (key.toLocaleLowerCase() === "anti-swear") {
      let words = await client.awaitReply(
        `Please enter a swear warning message!\nCan be contains: **${wards.join(
          " |"
        )}**\nType \`cancel\` to stop setup`,
        { message }
      );
      if (!words)
        return sendError(
          "No response was given, Setup Canceled.",
          message.channel
        );
      if (words.toLocaleLowerCase() === "cancel")
        return sendDone("Setup Canceled!", message.channel);
      let msg = await client.EEmoji(`${words}`, client);
      client.data.set(`message_${message.guild.id}`, msg);
      sendDone(
        `**Done**\nSwear warn message has been setted to\n\`${msg}\`\n\nView:\n${words.content
          .split("{user-mention}")
          .join("<@" + message.author.id + ">")
          .split("{server-name}")
          .join(message.guild.name)
          .split("{user-tag}")
          .join(message.author.tag)
          .split("{user-username}")
          .join(message.author.username)}`,
        message.channel
      );
    }
  },
};
