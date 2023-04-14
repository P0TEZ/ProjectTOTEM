const io = require('socket.io')();

io.on('connection', (client) => {

    console.log('Client connected...');
    client.on('disconnect', () => { console.log('Client disconnected...') });

    client.on('infoUpdated', (data) => {

        try{
            console.log('infoUpdated', data);
            console.log ('By client: ', client.id);
    
            console.log('Broadcasting to all clients...');
            client.broadcast.emit('infoUpdated', data);
            console.log('Broadcasting to all clients... done');
        }
        catch(err){
            console.log('Error: ', err);
        }
    });

});



const PORT = 4000
io.listen(PORT);
console.log('listening on port ', PORT);