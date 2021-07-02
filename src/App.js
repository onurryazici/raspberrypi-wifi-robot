import React, { Component } from 'react'
import { Grid, Paper, Box } from '@material-ui/core'
import CarControlUnit from './components/carControlUnit'
import CameraControlUnit from './components/cameraControlUnit'
import MySocket from './socket'
import CameraLog from './components/cameraLog'
import CameraControlLog from './components/cameraControlLog'
import CarControlLog from './components/carControlLog'
import styles from './styles.module.css'
import { withStyles } from "@material-ui/core/styles"
import { FiberManualRecord } from '@material-ui/icons/'
import './App.css'

const useStyles = ((theme) => ({
    root: {
        width:'calc(100% - 20px)',
        flexGrow: 1,
        height:'100%'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      background:'black',
      height: '100%',
    },
  }));


class App extends Component {

    constructor(...args){
        super(...args)
        this._onKeyDown = this._onKeyDown.bind(this)
        this._onKeyUp = this._onKeyUp.bind(this)
        this.state= {
            goingForward:false,
            goingBackward:false,
            goingLeft:false,
            goingRight:false,
            cameraUp:false,
            cameraDown:false,
            cameraLeft:false,
            cameraRight:false
        }
    }
	
	componentDidMount(){
		document.addEventListener("keydown", this._onKeyDown)
		document.addEventListener("keyup", this._onKeyUp)
        const loggedUser = "random"
        MySocket.auth = { loggedUser }
        MySocket.connect()
	}

	_onKeyDown(event){
        var self = this
		switch(event.key){
			case "w":
				self.setState({goingForward:true, goingBackward:false, goingLeft:false, goingRight:false})
				break
			case "a":
                self.setState({goingForward:false, goingBackward:false, goingLeft:true, goingRight:false})
				break
			case "s":
                self.setState({goingForward:false, goingBackward:true, goingLeft:false, goingRight:false})
				break
			case "d":
                self.setState({goingForward:false, goingBackward:false, goingLeft:false, goingRight:true})
				break

            case "8":
                self.setState({cameraUp:true, cameraDown:false, cameraLeft:false, cameraRight:false})
                break
            case "4":
                self.setState({cameraUp:false, cameraDown:false, cameraLeft:true, cameraRight:false})
                break

            case "6":
                self.setState({cameraUp:false, cameraDown:false, cameraLeft:false, cameraRight:true})
                break
            case "2":
                self.setState({cameraUp:false, cameraDown:true, cameraLeft:false, cameraRight:false})
                break
			default:
				break
		}
	}
	_onKeyUp(event){
        var self = this
		switch(event.key){
			case "w":
                self.setState({goingForward:false})
				break
			case "a":
                self.setState({goingLeft:false})
				break
			case "s":
                self.setState({goingBackward:false})
				break
			case "d":
                self.setState({goingRight:false})
				break
            case "8":
                self.setState({cameraUp:false})
                break
            case "4":
                self.setState({cameraLeft:false})
                break
            case "6":
                self.setState({cameraRight:false})
                break
            case "2":
                self.setState({cameraDown:false})
                break
			default:
				break
		}
	}
    
	render() {
        
        const {classes} = this.props;
		return (
            <div id={styles.appContainer}>
            <Grid container spacing={3} style={{height:'100%'}}>
                <Grid item xs>
                    <Paper className={classes.paper}>
                    <Box flexWrap="wrap">
                        <CarControlUnit 
                                w = { this.state.goingForward }
                                a = { this.state.goingLeft }
                                s = { this.state.goingBackward }
                                d = { this.state.goingRight } 
                                idle = {!this.state.goingForward && !this.state.goingLeft && !this.state.goingRight && !this.state.goingBackward}/>  
                        <CarControlLog/> 
                    </Box>
                        
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                    <Box flexWrap="wrap">
                        <div id={styles.camera}><span id={styles.livebar}><FiberManualRecord style={{fill:'red'}}/> LIVE</span>
                            <img src="http://192.168.1.175:8080?action=stream"/>
                        </div>
                        <CameraLog/>
                    </Box>
                    </Paper>
                </Grid>
                <Grid item xs>
                <Paper className={classes.paper}>
                    <Box flexWrap="wrap">
                        <CameraControlUnit
                            up    = { this.state.cameraUp }
                            down  = { this.state.cameraDown }
                            left  = { this.state.cameraLeft }
                            right = { this.state.cameraRight } />
                        <CameraControlLog/>
                    </Box>
                </Paper>
                </Grid>
            </Grid>
            </div>
		)
	}
}

export default withStyles(useStyles)(App)