import classNames from 'classnames'
import React, { Component } from 'react'
import styles from '../styles.module.css'
import MySocket from '../socket'
import { Button } from '@material-ui/core'
export default class CameraControlUnit extends Component {
    constructor(...args){
        super(...args)
        //this.socket = io("http://localhost:8888", { autoConnect:false, query: { token : "tester"}})
    }

    componentDidUpdate(prevProps){
        
        if(prevProps.up !== this.props.up)
            MySocket.emit("camera","up",this.props.up)
        else if(prevProps.down !== this.props.down)
            MySocket.emit("camera","down", this.props.down)
        else if(prevProps.left !== this.props.left)
            MySocket.emit("camera","left",this.props.left)
        else if(prevProps.right !== this.props.right)
            MySocket.emit("camera","right",this.props.right)
    }

    render() {

        const buttonStyles = {
            pressedButtons: {
                width: '60px',
                height: '60px',
                border: 'solid thin green',
                color: 'black',
                background: 'green'
            },
            unPressedButtons: {
                width: '60px',
                height: '60px',
                border: 'solid thin green',
                color: 'green',
                background: 'transparent'
            }
        }
        
        let up_style      = this.props.up    ? buttonStyles.pressedButtons : buttonStyles.unPressedButtons
        let down_style    = this.props.down  ? buttonStyles.pressedButtons : buttonStyles.unPressedButtons
        let left_style    = this.props.left  ? buttonStyles.pressedButtons : buttonStyles.unPressedButtons
        let right_style   = this.props.right ? buttonStyles.pressedButtons : buttonStyles.unPressedButtons
        
        let up_variant    = this.props.up    ? "contained" : "contained"
        let down_variant  = this.props.down  ? "contained" : "contained"
        let left_variant  = this.props.left  ? "contained" : "contained"
        let right_variant = this.props.right ? "contained" : "contained"

        return (
            <div id={styles.cameraControlStage}>
                    <div id={styles.cameraControlInner}>
                    <Button variant={up_variant} style={up_style}>8</Button>
                        <div className={styles.flexRow}>
                            <Button variant={left_variant} style={left_style} >4</Button>
                            <Button variant={right_variant} style={right_style}>6</Button>
                        </div>
                        <Button variant={down_variant} style={down_style}>2</Button>
                    </div>
                    <span className={styles.greenText}>Camera Control Unit</span>
            </div>
        )
    }
}
