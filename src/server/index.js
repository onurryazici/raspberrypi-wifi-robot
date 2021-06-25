const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors')
const io = require('socket.io')(http,{
    cors:{
    origin:["http://localhost:3000", "http://localhost:5000"], 
    methods:["GET","POST"],
    credentials:true
  }
});

app.use(cors())
const gpio = require('rpi-gpio');
const gpiop = gpio.promise;
const webroot = __dirname + '/../../build';


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
        switch(direction){
            case "forward":
                gpio.write(Motor1A, true)
                gpio.write(Motor1B, false)
                gpio.write(Motor2A, true)
                gpio.write(Motor2B, false)
                gpio.write(Motor3A, true)
                gpio.write(Motor3B, false)
                gpio.write(Motor4A, true)
                gpio.write(Motor4B, false)
                break
            case "backward":
                gpio.write(Motor1A, false)
                gpio.write(Motor1B, true)
                gpio.write(Motor2A, false)
                gpio.write(Motor2B, true)
                gpio.write(Motor3A, false)
                gpio.write(Motor3B, true)
                gpio.write(Motor4A, false)
                gpio.write(Motor4B, true)
                break
            case "left":
                gpio.write(Motor1A, false)
                gpio.write(Motor1B, true)
                gpio.write(Motor2A, false)
                gpio.write(Motor2B, true)
                gpio.write(Motor3A, true)
                gpio.write(Motor3B, false)
                gpio.write(Motor4A, true)
                gpio.write(Motor4B, false)
                break
            case "right":
                gpio.write(Motor1A, true)
                gpio.write(Motor1B, false)
                gpio.write(Motor2A, true)
                gpio.write(Motor2B, false)
                gpio.write(Motor3A, false)
                gpio.write(Motor3B, true)
                gpio.write(Motor4A, false)
                gpio.write(Motor4B, true)
                break
        }
    })
    socket.on('camera',(direction)=>{
        console.log("camera DIRECTION " + direction)
        socket.broadcast.emit("cammmm")
    })
})


http.listen(8080); //listen to port 8080
app.use(express.static(webroot));