module.exports = {
  info: {
    name: 'Close',
    desc: 'Close a ticket',
    help: 'close',
    uses: [
      'close',
      'end'
    ]
  },
  execute: (bot, r, msg, args) => {
    if (!msg.channel.name.startsWith('ticket-')) return;
    r.table('tickets').getAll(msg.channel.name.replace('ticket-', ''), { index: 'case' }).run((err, callback) => {
      if (!callback) return;
      callback = callback[0];
      if (msg.member.permission.has('manageMessages') || (msg.author.id === callback.id)) {
        r.table('tickets').get(callback.id).update({closed: true}).run();
        msg.channel.delete();
        msg.channel.guild.fetchAllMembers();
        msg.channel.guild.members.find(m => m.user.id === callback.id).user.getDMChannel().then((channel) => {
          r.table('chatlogs').get(msg.channel.name.replace('ticket-', '')).run((err, callback) => {
            channel.createMessage(bot.config.baseurl + '/ticket?secret=' + callback.secret);
          });
        });
      }
    });
  }
}
