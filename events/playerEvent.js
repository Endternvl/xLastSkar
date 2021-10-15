const { Player } = require('discord-player');
const client = require('../xlast');

// player client
client.player = new Player(client);

// registers player events