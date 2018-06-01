module.exports = {
  info: {
    name: 'Ticket',
    desc: 'Create a new ticket',
    help: 'ticket [Optional message]',
    uses: [
      'ticket',
      'new'
    ]
  },
  execute: (bot, r, msg, args) => {
    r.table('tickets').get(msg.author.id).run((err, callback) => {
      if (err) return bot.error(err.stack);
      if (callback && (callback.length !== 0)) {
        if (!callback.closed) {
          msg.channel.createMessage(':x: | You already have an open ticket (<#' + callback.channel + '>)');
          return;
        }
      }
      r.table('tickets').orderBy({index: r.desc('case')}).run((err, callback) => {
        if (err) return bot.error(err.stack);
        msg.channel.guild.createChannel('ticket-' + (new Array(4).join('0') + (parseInt(callback[0].case) + 1)).substr(-4), 0, 'New ticket', bot.config.category).then((channel) => {
          r.table('tickets').insert({
            id: msg.author.id,
            case: (new Array(4).join('0') + (parseInt(callback[0].case) + 1)).substr(-4),
            channel: channel.id
          }).run();
          channel.createMessage({
            embed: {
              description: 'ID: ' + (new Array(4).join('0') + (parseInt(callback[0].case) + 1)).substr(-4) + '\nMessage: ' + (args.length > 0 ? args.join(' ') : 'None')
            }
          });
        }).catch((err) => {
          bot.error(err.stack);
          msg.channel.createMessage(':x: | An error has occurred!');
        });
      });
    });
  }
}
