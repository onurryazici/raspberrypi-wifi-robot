import  io  from "socket.io-client"
const URL    = "http://192.168.1.175:3030"; // ## Your localhost [CHANGE]
const MySocket =  io(URL, { autoConnect:false, query:{token:"IF YOU WANT YOUR TOKEN WILL BE HERE"} })
//const MySocket = io(URL, { autoConnect:false, query:{token:"tester"} });

MySocket.onAny((event, ...args) => {
  console.log(event, args);
});

MySocket.on('going_forward',()=>{
  var option = document.createElement('option')
  option.text = "Target : FORWARD"
  var select = document.getElementById("carControlLog");
  select.appendChild(option)
})

MySocket.on('going_backward',()=>{
  var option = document.createElement('option')
  option.text = "Target : BACKWARD"
  var select = document.getElementById("carControlLog");
  select.appendChild(option)
})

MySocket.on('going_left',()=>{
  var option = document.createElement('option')
  option.text = "Target : LEFT"
  var select = document.getElementById("carControlLog");
  select.appendChild(option)
})

MySocket.on('going_right',()=>{
  var option = document.createElement('option')
  option.text = "Target : RIGHT"
  var select = document.getElementById("carControlLog");
  select.appendChild(option)
})
MySocket.on('car_idle',()=>{
  var option = document.createElement('option')
  option.text = "IDLE"
  var select = document.getElementById("carControlLog");
  select.appendChild(option)
})

MySocket.on('turning_right',()=>{
  var option = document.createElement('option')
  option.text = "Turning RIGHT"
  var select = document.getElementById("cameraControlLog");
  select.appendChild(option)
})

MySocket.on('turning_left',()=>{
  var option = document.createElement('option')
  option.text = "Turning LEFT"
  var select = document.getElementById("cameraControlLog");
  select.appendChild(option)
})
MySocket.on('turning_up',()=>{
  var option = document.createElement('option')
  option.text = "Turning UP"
  var select = document.getElementById("cameraControlLog");
  select.appendChild(option)
})
MySocket.on('turning_down',()=>{
  var option = document.createElement('option')
  option.text = "Turning DOWN"
  var select = document.getElementById("cameraControlLog");
  select.appendChild(option)
})

MySocket.on('camera_idle',()=>{
  var option = document.createElement('option')
  option.text = "IDLE"
  var select = document.getElementById("cameraControlLog");
  select.appendChild(option)
})
export default MySocket