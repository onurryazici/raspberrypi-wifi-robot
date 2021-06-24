import { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { FaCircle} from 'react-icons/fa'
import CarControlUnit from './components/carControlUnit'
import CameraControlUnit from './components/cameraControlUnit'
import LogUnit from './components/logUnit'
import styles from './styles.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

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
		return (
			<div id={styles.container}>
				<CarControlUnit 
                    w = { this.state.goingForward }
                    a = { this.state.goingLeft }
                    s = { this.state.goingBackward }
                    d = { this.state.goingRight } />
                <Col>
                    <Row>
                        <div id={styles.camera}>
                            <span id={styles.livebar}><FaCircle color="red" fontSize="15px"/> LIVE</span>
                        </div>
                    </Row>
                    <Row><LogUnit/></Row>
                </Col>
				<CameraControlUnit
                    up    = { this.state.cameraUp }
                    down  = { this.state.cameraDown }
                    left  = { this.state.cameraLeft }
                    right = { this.state.cameraRight } />
			</div>
		)
	}
}

export default App