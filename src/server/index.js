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
const ServoBottom = new Gpio(9,  {mode: Gpio.OUTPUT})

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
        let bottomPulseWidth = 1500;
        let bottomIncrement = 100;
        switch(direction){
            case "up":
                setInterval(() => {
                    ServoTop.servoWrite(pulseWidth);
                    ServoBottom.duty
                    pulseWidth += increment;
                    if (pulseWidth >= 2000) {
                      increment = -100;
                    } else if (pulseWidth <= 1000) {
                      increment = 100;
                    }
                  }, 1000);
                break
            case "down":
                setInterval(() => {
                    ServoTop.servoWrite(pulseWidth);
                  
                    pulseWidth -= increment;
                    if (pulseWidth >= 2000) {
                      increment = -100;
                    } else if (pulseWidth <= 1000) {
                      increment = 100;
                    }
                  }, 1000);
                break
            case "left":
              	bottomIncrement = -100
              	var bottomLeftInterval = setInterval(()=>{
					if(direction==="left" && active && pulseWidth >= 1000 && pulseWidth <= 1500){
						ServoBottom.servoWrite(pulseWidth);
						pulseWidth += increment;

						if(pulseWidth <=1000)
							clearInterval(bottomLeftInterval)
					}
              },1000)
                break
            case "right":
				bottomIncrement = 100
              	var bottomRightInterval = setInterval(()=>{
					if(direction==="right" && active && pulseWidth >= 1500 && pulseWidth <=2000){
						ServoBottom.servoWrite(pulseWidth);
						pulseWidth += increment;

						if(pulseWidth >=2000)
							clearInterval(bottomRightInterval)
					}
              },1000)
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