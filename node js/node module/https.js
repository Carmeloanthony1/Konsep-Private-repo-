const event = require('events');
//kalau suatu event tertrigger, nanti dia akan menjalankan sesuatu
const event_trigger = new event();

event_trigger.on('login', (user) => {
    console.log(`user login : ${user}`);
});

event_trigger.emit('login', 'joccelyn');

//on itu nunggu objek nya di panggil
//nanti si emit ini bakalan memicu nya