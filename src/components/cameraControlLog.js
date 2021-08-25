import classNames from 'classnames'
import React, { Component } from 'react'
import styles from '../styles.module.css'

export default class CameraControlLog extends Component {
    componentDidMount(){
        var logObject = document.getElementById("cameraControlLog")
        logObject.addEventListener('DOMNodeInserted', event => {
            const { currentTarget:target } = event
            target.scroll({top:target.scrollHeight, behavior:'smooth'})
        })
    }
    render() {
        return (
            <React.Fragment>
                <span style={{color:"green",fontWeight:"bold",marginTop:"10px"}}></span>
                <select name="logs" id="cameraControlLog" size="5" className={classNames(styles.logBox, styles.scrollbarStyle)} style={{height:'250px'}}>
               
            </select>
            </React.Fragment>
        )
    }
}
