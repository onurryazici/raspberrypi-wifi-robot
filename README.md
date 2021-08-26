
# RaspberryPi Wifi Robot

  In this tutorial we created simple ui and learned how to control our raspberry pi dc motors and servos with React and SocketIO. Also I'm used `pigpio` npm module for communication with raspberrypi  

# Clone and install

`git clone https://github.com/onurryazici/raspberrypi-wifi-robot`\
\
`cd PROJECT_LOCATION/ && npm i`

# Demo

![enter image description here](https://github.com/onurryazici/raspberrypi-wifi-robot/blob/main/screenshots/scr1.gif)

Start ui : `cd PROJECT_LOCATION/ && npm start`\
\
Start backend : `cd PROJECT_LOCATION/src/server && node index.js`

# Wire connections

![enter image description here](https://github.com/onurryazici/raspberrypi-wifi-robot/blob/main/screenshots/gpio.png)
![enter image description here](https://github.com/onurryazici/raspberrypi-wifi-robot/blob/main/screenshots/connections.png)

In this project we are used two different voltage sources. Be careful this is not preferable. I did for just controlling car with javascript. Maybe someone benefit. 

