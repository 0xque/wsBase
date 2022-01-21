const WebSocket = require('ws')
const wss = new WebSocket.Server({port: 8082})

/* WSS refers to the actual server,
while ws refers to each individual client 
(You will have many different ws objects if you have
many connections) */

wss.on('connection', ws => {
    const connectionInfo = ws._socket.address()
    const connectionStringified = JSON.stringify(connectionInfo)

    console.log("CONNECTION FROM: " + connectionStringified)
    
    ws.on('message', data => {
        var sData = data.toString()
        console.log("RECEIVED: " + sData)
       
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(sData)
            }
        })
    })
    ws.on('close', () => {
        console.log("CLOSED CONNECTION")
    })
})