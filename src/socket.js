const { io } = require("socket.io-client");
const URL    = "http://192.168.1.175:8080";
const MySocket = io(URL)
//const MySocket = io(URL, { autoConnect:false, query:{token:"tester"} });

MySocket.onAny((event, ...args) => {
  console.log(event, args);
});

export default MySocket