MIT License

Copyright (c) 2021 Onur

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


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

