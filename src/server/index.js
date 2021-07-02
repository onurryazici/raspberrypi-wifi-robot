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

const ServoTop = new Gpio(10,  {mode: Gpio.OUTPUT})
const ServoBottom = new Gpio(12,  {mode: Gpio.OUTPUT})
var bottomPulseWidth = 1500;
var topPulseWidth = 1300
io.on('connection', (socket)=>{
    socket.on("disconnect",()=>{
    
    })
    socket.on('car',(direction, active)=>{
        console.log("Car Direction " + direction+ "; Active : " + (active+"").toUpperCase())
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
                socket.broadcast.emit("going_forward")
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
                socket.broadcast.emit("going_backward")
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
                socket.broadcast.emit("going_left")
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
                socket.broadcast.emit("going_right")
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
                    socket.broadcast.emit("car_idle")
                }
        }
    })
    socket.on('camera',(direction, active)=>{
        console.log("Camera Direction " + direction+ "; Active : " + (active+"").toUpperCase())
        if(!active){
            ServoBottom.servoWrite(0)
            ServoTop.servoWrite(0)
        }
        
        switch(direction){
            case "up":
                if(direction==="up" && active){
                    if(topPulseWidth>900){
                        topPulseWidth -= 300
                        ServoTop.servoWrite(topPulseWidth)
                    }
                    else{
                        //topPulseWidth = 1500
                        //ServoTop.servoWrite(topPulseWidth)
                    }
                    socket.broadcast.emit("turning_up")
                }
                break
            case "down":
                if(direction==="down" && active){
                    if(topPulseWidth<1800){
                        topPulseWidth += 300
                        ServoTop.servoWrite(topPulseWidth)
                    }
                    else{
                        //topPulseWidth = 1500
                        //ServoTop.servoWrite(topPulseWidth)
                    }
                    socket.broadcast.emit("turning_down")
                }
                break
            case "left":
					if(direction==="left" && active){
                        if(bottomPulseWidth < 1800){
                            bottomPulseWidth += 300
                            ServoBottom.servoWrite(bottomPulseWidth);                   
                        }
                        else{
                            bottomPulseWidth=1500
                            ServoBottom.servoWrite(1500)
                        }
                        socket.broadcast.emit("turning_left")
					}
                break
            case "right":
				if(direction==="right" && active){
                    if(bottomPulseWidth>1200){
                        bottomPulseWidth -= 300
                        ServoBottom.servoWrite(bottomPulseWidth);                   
                    }
                    else{
                        bottomPulseWidth = 1500
                        ServoBottom.servoWrite(bottomPulseWidth)
                    }
                    socket.broadcast.emit("turning_right")
                }
                break
            case "idle":
                if(active){
                    console.log("idle active")
                    socket.broadcast.emit("camera_idle")
                }
        }
    })  
})


server.listen(3030); //listen to port 8080
<<<<<<< HEAD
app.use(express.static(webroot));
=======
app.use(express.static(webroot));
>>>>>>> e1d113a47f63fcfdec1fc660349b2f548df0f54a
