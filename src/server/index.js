const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app)
const cors = require('cors')
const socketIo = require('socket.io')
const io = socketIo(server,{
    cors:{
    origin:"*", 
    methods:["GET","POST"],
    credentials:true
  }
});

app.use(cors())


const webroot = __dirname + '/../../build';

const Gpio = require('pigpio').Gpio;
const { ViewArrayOutlined } = require('@material-ui/icons');

const Motor1A = new Gpio(17,{ mode:Gpio.OUTPUT})
const Motor1B = new Gpio(27, {mode: Gpio.OUTPUT})
const Motor2A = new Gpio(23, {mode: Gpio.OUTPUT})
const Motor2B = new Gpio(24, {mode: Gpio.OUTPUT})
const Motor3A = new Gpio(16, {mode: Gpio.OUTPUT})
const Motor3B = new Gpio(26, {mode: Gpio.OUTPUT})
const Motor4A = new Gpio(5, {mode: Gpio.OUTPUT})
const Motor4B = new Gpio(6, {mode: Gpio.OUTPUT})

const ServoTopYellow = new Gpio(18,  {mode: Gpio.OUTPUT})
const ServoBottomYellow = new Gpio(22,  {mode: Gpio.OUTPUT})

io.on('connection', (socket)=>{
    socket.on("disconnect",()=>{
    
    })
    socket.on('car',(direction, active)=>{
        console.log("Direction " + direction+ "; Active : " + (active+"").toUpperCase())
        switch(direction){
            case "forward":
                Motor1A.digitalWrite(0)
                Motor1B.digitalWrite(1)
                Motor2A.digitalWrite(0)
                Motor2B.digitalWrite(1)
                Motor3A.digitalWrite(0)
                Motor3B.digitalWrite(1)
                Motor4A.digitalWrite(0)
                Motor4B.digitalWrite(1)
                break
            case "backward":
                Motor1A.digitalWrite(1)
                Motor1B.digitalWrite(0)
                Motor2A.digitalWrite(1)
                Motor2B.digitalWrite(0)
                Motor3A.digitalWrite(1)
                Motor3B.digitalWrite(0)
                Motor4A.digitalWrite(1)
                Motor4B.digitalWrite(0)
                break
            case "left":
                Motor1A.digitalWrite(0)
                Motor1B.digitalWrite(1)
                Motor2A.digitalWrite(0)
                Motor2B.digitalWrite(1)
                Motor3A.digitalWrite(1)
                Motor3B.digitalWrite(0)
                Motor4A.digitalWrite(1)
                Motor4B.digitalWrite(0)
                break
            case "right":
                Motor1A.digitalWrite(1)
                Motor1B.digitalWrite(0)
                Motor2A.digitalWrite(1)
                Motor2B.digitalWrite(0)
                Motor3A.digitalWrite(0)
                Motor3B.digitalWrite(1)
                Motor4A.digitalWrite(0)
                Motor4B.digitalWrite(1)
                break
            case "idle":
                if(active){
                    Motor1A.digitalWrite(0)
                    Motor1B.digitalWrite(0)
                    Motor2A.digitalWrite(0)
                    Motor2B.digitalWrite(0)
                    Motor3A.digitalWrite(0)
                    Motor3B.digitalWrite(0)
                    Motor4A.digitalWrite(0)
                    Motor4B.digitalWrite(0)
                }
        }
    })
    socket.on('camera',(direction, active)=>{
        console.log("Direction " + direction+ "; Active : " + (active+"").toUpperCase())
        var pulseWidth = ServoTopYellow.getServoPulseWidth()
        switch(direction){
            case "up":
                var value = pulseWidth
                if(pulseWidth <= 1000) {
                    value += 100
                    ServoTopYellow.servoWrite(value)
                }
                break
            case "down":
                var value = pulseWidth
                if(pulseWidth >= 2000) {
                    value -= 100
                    ServoTopYellow.servoWrite(value)
                }
                break
            case "left":
                console.log("left camera")
                break
            case "right":
                console.log("right camera")
                break
            case "idle":
                if(active){
                    console.log("idle active")
                }
        }
    })  
})


server.listen(8080); //listen to port 8080
app.use(express.static(webroot));