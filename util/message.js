//for giveaways-manager
const config = require('../config.json');

module.exports = {
    giveaway: (config.everyoneMention ? "@everyone\n\n" : ""),
    giveawayEnded: (config.everyoneMention ? "@everyone\n\n" : "")+"🎉 Giveaway has ended 🎉",
    inviteToParticipate: "React with 🎉 to participate to the giveaway!",
    dropMessage: "Be the first to react with 🎉  to win the prize!",
    drawing: 'Ended {timestamp}',
    winMessage: "Congratulations, {winners}! You have won **{this.prize}**! (Hosted by: {this.hostedBy})",
    embedFooter: "🎉 Giveaways",
    noWinner: "Giveaway cancelled as no valid participations joined the giveaway.",
    hostedBy: "Giveaway hosted by {this.hostedBy}",
    winners: "Giveaway winner(s)",
    endedAt: "Ended at"
};