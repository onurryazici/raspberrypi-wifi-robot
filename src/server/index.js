const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors')
const io = require('socket.io')(http,{
    cors:{
    origin:"*", 
    methods:["GET","POST"],
    credentials:true
  }
});

app.use(cors())
const Gpio = require('onoff').Gpio;

const webroot = __dirname + '/../../build';


const Motor1A = new Gpio(17,'out')
const Motor1B = new Gpio(27,'out')
const Motor2A = new Gpio(23,'out')
const Motor2B = new Gpio(24,'out')
const Motor3A = new Gpio(16,'out')
const Motor3B = new Gpio(26,'out')
const Motor4A = new Gpio(5,'out')
const Motor4B = new Gpio(6,'out')
/*
gpiop.setup(Motor1A, gpio.DIR_OUT)
gpiop.setup(Motor1B, gpio.DIR_OUT)
gpiop.setup(Motor2A, gpio.DIR_OUT)
gpiop.setup(Motor2B, gpio.DIR_OUT)
gpiop.setup(Motor3A, gpio.DIR_OUT)
gpiop.setup(Motor3B, gpio.DIR_OUT)
gpiop.setup(Motor4A, gpio.DIR_OUT)
gpiop.setup(Motor4B, gpio.DIR_OUT)
*/

io.on('connection', (socket)=>{
    socket.on('car',(direction)=>{
        switch(direction){
            case "forward":
                Motor1A.writeSync(1)
                Motor1B.writeSync(0)
                Motor2A.writeSync(1)
                Motor2B.writeSync(0)
                Motor3A.writeSync(1)
                Motor3B.writeSync(0)
                Motor4A.writeSync(1)
                Motor4B.writeSync(0)
                break
            case "backward":
                Motor1A.writeSync(0)
                Motor1B.writeSync(1)
                Motor2A.writeSync(0)
                Motor2B.writeSync(1)
                Motor3A.writeSync(0)
                Motor3B.writeSync(1)
                Motor4A.writeSync(0)
                Motor4B.writeSync(1)
                break
            case "left":
                Motor1A.writeSync(0)
                Motor1B.writeSync(1)
                Motor2A.writeSync(0)
                Motor2B.writeSync(1)
                Motor3A.writeSync(1)
                Motor3B.writeSync(0)
                Motor4A.writeSync(1)
                Motor4B.writeSync(0)
                break
            case "right":
                Motor1A.writeSync(1)
                Motor1B.writeSync(0)
                Motor2A.writeSync(1)
                Motor2B.writeSync(0)
                Motor3A.writeSync(0)
                Motor3B.writeSync(1)
                Motor4A.writeSync(0)
                Motor4B.writeSync(1)
                break
        }
        console.log("car control")
    })
    socket.on('camera',(direction)=>{
        console.log("camera DIRECTION " + direction)
        socket.broadcast.emit("cammmm")
    })
})


http.listen(8080); //listen to port 8080
app.use(express.static(webroot));