import  io  from "socket.io-client"
const URL    = "http://192.168.1.175:3030"; // ##
const MySocket =  io(URL, { autoConnect:false, query:{token:"token gelecek buraya"} })
//const MySocket = io(URL, { autoConnect:false, query:{token:"tester"} });

MySocket.onAny((event, ...args) => {
  console.log(event, args);
});

MySocket.on('going_forward',()=>{
  var option = document.createElement('option')
  var select = document.getElementById("select");
})
export default MySocket