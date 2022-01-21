const ws = new WebSocket("ws://localhost:8082");

var button = document.createElement("button");
var clearButton = document.createElement("button");
var inputForm = document.createElement("form");
var inputField = document.createElement("input");
var chatBox = document.createElement("div");

chatBox.innerHTML = "<br>";
clearButton.innerHTML = "CLEAR CHAT";
button.innerHTML = "SEND";
button.setAttribute("id", "/sendButton");
inputField.setAttribute("id", "/inField");
inputField.setAttribute("type", "text");
inputForm.append(inputField);

document.body.append(inputForm);
document.body.append(button);
document.body.append(clearButton);
document.body.append(chatBox);

newIn = async (ws, username) => {
    let inputPromise = new Promise((res, rej) => {
        let userMSG = inputField.value;
        res(userMSG);
    })
    let dataObj = {
        userNick: username,
        data: await inputPromise
    }
    ws.send(JSON.stringify(dataObj));
}
ws.addEventListener("open", () => {
    var username = window.prompt("NICKNAME: ");
    console.log("CONNECTED TO SERVER");

    button.onclick = () => {
        newIn(ws, username);
    }
    clearButton.onclick = () => {
        chatBox.innerHTML = `<br>`;
    }   
    ws.onmessage = (event) => {
        let eObj = JSON.parse(event.data);
        let nick = `<span style="color: gray">{userNick:` + `<span style="color:red">${eObj.userNick}</span></span>` + `<span style="color: gray">}&nbsp;</span>`
        chatBox.innerHTML += nick + `<span>${eObj.data}</span>` + `<br>`;
    }
    ws.onclose = () => {
        console.log("SERVER DISCONNECTED");
    }
})
