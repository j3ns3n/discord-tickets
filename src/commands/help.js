module.exports = {
  info: {
    name: 'Help',
    desc: 'Help command',
    help: 'help',
    uses: [
      'help',
      'commands'
    ]
  },
  execute: (bot, r, msg, args) => {
    msg.channel.createMessage('Command List: ```' + bot.commands.map((c) => bot.config.prefix + c.info.help.toLowerCase() + ' - ' + c.info.desc).join('\n') + '```');
  }
}
