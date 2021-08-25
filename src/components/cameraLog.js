import classNames from 'classnames'
import React, { Component } from 'react'
import MySocket from '../socket'
import styles from '../styles.module.css'

export default class CameraLog extends Component {
    render() {
        return (
            <React.Fragment>
                
                {/*<select name="logs" id="cameraLog" size="5" className={ classNames(styles.logBox,styles.scrollbarStyle)} style={{height:'150px'}}> </select>*/}
                <span style={{color:"green",fontWeight:"bold",marginTop:"50px",position:'absolute',fontSize:'38px',left :'0px',right:'0px'}}>
                    Socket : {
                        MySocket.connected 
                        ? <span className={styles.blink} style={{color:'green'}}>ONLINE</span> 
                        : <span className={styles.blink} style={{color:'red'}}>OFFLINE</span> 
                    }
                </span>
            </React.Fragment>
        )
    }
}
