const client = require('../xlast');

client.on('ready', async () => {
    console.log(`Logged In As ${client.user.tag} And Ready To Go!`); //logs if ready
});