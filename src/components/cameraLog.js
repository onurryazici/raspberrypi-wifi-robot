import React, { Component } from 'react'
import styles from '../styles.module.css'

export default class CameraLog extends Component {
    render() {
        return (
            <React.Fragment>
                <span style={{color:"green",fontWeight:"bold",marginTop:"10px"}}>Identified Objects</span>
                <select name="logs" id="cameraLog" size="5" className={styles.logBox} id={styles.scrollbarStyle} style={{height:'150px'}}>
                
            </select>
            </React.Fragment>
        )
    }
}
