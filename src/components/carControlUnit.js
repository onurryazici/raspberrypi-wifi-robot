import classNames from 'classnames'
import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import io from 'socket.io-client'
import styles from '../styles.module.css'

export default class CarControlUnit extends Component {
    constructor(...args){
        super(...args)
        this.socket = io()
    }
    componentDidUpdate(prevProps){
        if(prevProps.w !== this.props.w)
            this.socket.emit("car","forward")
        else if(prevProps.a !== this.props.a)
            this.socket.emit("car","left")
        else if(prevProps.s !== this.props.s)
            this.socket.emit("car","backward")
        else if(prevProps.d !== this.props.d)
            this.socket.emit("car","right")
    }
    render() {
        let w_pressed = this.props.w
        let a_pressed = this.props.a
        let s_pressed = this.props.s
        let d_pressed = this.props.d

        let w_style = w_pressed ? classNames(styles.buttons, styles.pressing) : styles.buttons
        let a_style = a_pressed ? classNames(styles.buttons, styles.pressing) : styles.buttons
        let s_style = s_pressed ? classNames(styles.buttons, styles.pressing) : styles.buttons
        let d_style = d_pressed ? classNames(styles.buttons, styles.pressing) : styles.buttons

        let w_variant = w_pressed ? "success" : "outline-success"
        let a_variant = a_pressed ? "success" : "outline-success"
        let s_variant = s_pressed ? "success" : "outline-success"
        let d_variant = d_pressed ? "success" : "outline-success"

        return (
            <div id={styles.carControlStage}>
                <div id={styles.carControlInner}>
                    <Button variant={w_variant} className={w_style} style={{marginLeft:'60px'}}>W</Button>
                    <div className={styles.flexRow}>
                        <Button variant={a_variant} className={a_style} >A</Button>
                        <Button variant={d_variant} className={d_style} style={{marginLeft:'60px'}}>D</Button>
                    </div>
                    <Button variant={s_variant} className={s_style} style={{marginLeft:'60px'}}>S</Button>
                </div>
                <span className={styles.greenText}>Car Control Unit</span>
            </div>
        )
    }
}
