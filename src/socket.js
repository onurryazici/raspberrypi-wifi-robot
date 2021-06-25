const { io } = require("socket.io-client");
const URL    = "http://localhost:8080";
const MySocket = io(URL)
//const MySocket = io(URL, { autoConnect:false, query:{token:"tester"} });

MySocket.onAny((event, ...args) => {
  console.log(event, args);
});

export default MySocket