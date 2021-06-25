const express = require('express');
const http = require('http').Server(app);
const app = express();
const cors = require('cors')
const io = require('socket.io')(http,{
    cors:{
    origin:"http://localhost:3000", // BURAYA MESSENGER UI'nin çalıştığı ip:port gelecek
    methods:["GET","POST"],
    credentials:true
  }
});

app.use(cors())
const gpio = require('rpi-gpio');
const gpiop = gpio.promise;
const webroot = __dirname + '/../../build';
/*const socketIo    = require("socket.io");
const cors        = require('cors')
const io2 = socketIo()*/
const Motor1A = 17
const Motor1B = 27
const Motor2A = 23
const Motor2B = 24
const Motor3A = 16
const Motor3B = 26
const Motor4A = 5
const Motor4B = 6

gpiop.setup(Motor1A, gpio.DIR_OUT)
gpiop.setup(Motor1B, gpio.DIR_OUT)
gpiop.setup(Motor2A, gpio.DIR_OUT)
gpiop.setup(Motor2B, gpio.DIR_OUT)
gpiop.setup(Motor3A, gpio.DIR_OUT)
gpiop.setup(Motor3B, gpio.DIR_OUT)
gpiop.setup(Motor4A, gpio.DIR_OUT)
gpiop.setup(Motor4B, gpio.DIR_OUT)


io.on('connection', (socket)=>{
    socket.on('car',(direction)=>{
        console.log("car DIRECTION " + direction)
        socket.to("random").emit("carrrr")

    })
    socket.on('camera',(direction)=>{
        console.log("camera DIRECTION " + direction)
        socket.broadcast.emit("cammmm")
    })
})


http.listen(8080); //listen to port 8080
app.use(express.static(webroot));