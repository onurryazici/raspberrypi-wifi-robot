import classNames from 'classnames'
import React, { Component } from 'react'
import io from 'socket.io-client'
import styles from '../styles.module.css'
import MySocket from '../socket'
import { Button } from '@material-ui/core'
export default class CarControlUnit extends Component {
    constructor(...args){
        super(...args)

    }
    componentDidUpdate(prevProps){
        
        
        if(prevProps.w !== this.props.w)
            MySocket.emit("car","forward",this.props.w)
        else if(prevProps.a !== this.props.a)
            MySocket.emit("car","left",this.props.a)
        else if(prevProps.s !== this.props.s)
            MySocket.emit("car","backward",this.props.s)
        else if(prevProps.d !== this.props.d)
            MySocket.emit("car","right",this.props.d)

        if(prevProps.idle !== this.props.idle)
            MySocket.emit("car","idle",this.props.idle)
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
        
        let w_style = this.props.w ? buttonStyles.pressedButtons : buttonStyles.unPressedButtons
        let a_style = this.props.a ? buttonStyles.pressedButtons : buttonStyles.unPressedButtons
        let s_style = this.props.s ? buttonStyles.pressedButtons : buttonStyles.unPressedButtons
        let d_style = this.props.d ? buttonStyles.pressedButtons : buttonStyles.unPressedButtons
        
        let w_variant = this.props.w ? "contained" : "contained"
        let a_variant = this.props.a ? "contained" : "contained"
        let s_variant = this.props.s ? "contained" : "contained"
        let d_variant = this.props.d ? "contained" : "contained"

        return (
            <div id={styles.carControlStage}>
                <div id={styles.carControlInner}>
                    <Button variant={w_variant} style={w_style} >W</Button>
                    <div className={styles.flexRow}>
                        <Button variant={a_variant} style={a_style} >A</Button>
                        <Button variant={d_variant} style={d_style} >D</Button>
                    </div>
                    <Button variant={s_variant} style={s_style} >S</Button>
                </div>
                <span className={styles.greenText}>Car Control Unit</span>
            </div>
        )
    }
}
