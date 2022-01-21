const ws = new WebSocket("ws://localhost:8082");

newIn = async (ws) => {
    let inputPromise = new Promise((res, rej) => {
		setTimeout(() => {
			let userIn = window.prompt("MESSAGE > ");
			res(userIn);
		}, 100);
    }).then(value => {
        ws.send(value);
    })
}
ws.addEventListener('open', () => {

    console.log("CONNECTED TO SERVER");

    ws.onmessage = (event) => {
        console.log("RECEIVED DATA:", event.data);
    }
    document.addEventListener('keyup', (key) => {
        promptCheck = false;  
    })
    document.addEventListener('keydown', (key) => {
        if (key.code == "KeyF") {
            newIn(ws);
        } else {
            console.log(key.code);
        }
    })
    ws.onclose = () => {
        console.log("SERVER DISCONNECTED");
    }
})