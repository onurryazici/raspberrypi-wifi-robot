import classNames from 'classnames'
import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { io } from 'socket.io-client'
import styles from '../styles.module.css'

export default class CameraControlUnit extends Component {
    constructor(...args){
        super(...args)
        this.socket = io()
    }

    componentDidUpdate(prevProps){
        if(prevProps.up !== this.props.up)
            this.socket.emit("camera","up")
        else if(prevProps.down !== this.props.down)
            this.socket.emit("camera","down")
        else if(prevProps.left !== this.props.left)
            this.socket.emit("camera","left")
        else if(prevProps.right !== this.props.right)
            this.socket.emit("camera","right")
    }

    render() {
        let up_style      = this.props.up    ? classNames(styles.buttons, styles.pressing) : styles.buttons
        let down_style    = this.props.down  ? classNames(styles.buttons, styles.pressing) : styles.buttons
        let left_style    = this.props.left  ? classNames(styles.buttons, styles.pressing) : styles.buttons
        let right_style   = this.props.right ? classNames(styles.buttons, styles.pressing) : styles.buttons

        let up_variant    = this.props.up    ? "success" : "outline-success"
        let down_variant  = this.props.down  ? "success" : "outline-success"
        let left_variant  = this.props.left  ? "success" : "outline-success"
        let right_variant = this.props.right ? "success" : "outline-success"

        return (
            <div id={styles.cameraControlStage}>
                    <div id={styles.cameraControlInner}>
                    <Button variant={up_variant} className={up_style} style={{marginLeft:'60px'}} >8</Button>
                        <div className={styles.flexRow}>
                            <Button variant={left_variant} className={left_style} >4</Button>
                            <Button variant={right_variant} className={right_style} style={{marginLeft:'60px'}}>6</Button>
                        </div>
                        <Button variant={down_variant} className={down_style} style={{marginLeft:'60px'}}>2</Button>
                    </div>
                    <span className={styles.greenText}>Camera Control Unit</span>
            </div>
        )
    }
}
