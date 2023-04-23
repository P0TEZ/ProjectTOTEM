const io = require('socket.io')();

/* This code sets up a socket.io server that listens for client connections. When a client connects, it
logs a message to the console. When a client disconnects, it logs another message to the console.
When a client emits an 'updated' event, it logs a message to the console indicating that the event
was received from the client, broadcasts the event to all other connected clients (excluding the
sender), and logs a message indicating that the broadcast was sent. */

io.on('connection', (client) => {

    console.log('Client connected...');
    client.on('disconnect', () => { console.log('Client disconnected...') });

    client.on('updated', (data) => {

        try{
            console.log('infoUpdated');
            console.log ('By client: ', client.id);
    
            console.log('Broadcasting to all clients...');
            client.broadcast.emit('infoUpdated', data);
            console.log('Broadcasting to all clients... done');
        }
        catch(err){
            console.log('Error: ', err);
        }
    });

    client.on('askForHelp', (data) => { 
        try{
            console.log('askForHelp');
            console.log ('By client: ', client.id);
    
            console.log('Broadcasting to all clients...');
            client.broadcast.emit('broadcastAskForHelp', data);
            console.log('Broadcasting to all clients... done');
        }
        catch(err){
            console.log('Error: ', err);
        }
    });

    client.on('fixHelp', (data) => {
        try{
            console.log('fixHelp');
            console.log ('By client: ', client.id);
    
            console.log('Broadcasting to all clients...');
            client.broadcast.emit('helpFixed', data);
            console.log('Broadcasting to all clients... done');
        }
        catch(err){
            console.log('Error: ', err);
        }
    });

});

/* This code is setting up the socket.io server to listen on port 4000 for incoming client connections.
Once the server is listening on the specified port, it logs a message to the console indicating that
it is listening on that port. */
const PORT = 4000
io.listen(PORT);
console.log('listening on port ', PORT);