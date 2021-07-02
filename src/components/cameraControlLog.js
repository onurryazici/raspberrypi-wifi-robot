import React, { Component } from 'react'
import styles from '../styles.module.css'

export default class CameraControlLog extends Component {
    render() {
        return (
            <React.Fragment>
                <span style={{color:"green",fontWeight:"bold",marginTop:"10px"}}></span>
                <select name="logs" id="cameraControlLog" size="5" className={styles.logBox} id={styles.scrollbarStyle} style={{height:'250px'}}>
               
            </select>
            </React.Fragment>
        )
    }
}
