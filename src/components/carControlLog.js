import classNames from 'classnames'
import React, { Component } from 'react'
import styles from '../styles.module.css'

export default class CarControlLog extends Component {
    componentDidMount(){
        var logObject = document.getElementById("carControlLog")
        logObject.addEventListener('DOMNodeInserted', event => {
            const { currentTarget:target } = event
            target.scroll({top:target.scrollHeight, behavior:'smooth'})
        })
    }
    render() {
        return (
            <React.Fragment>
                <span style={{color:"green",fontWeight:"bold",marginTop:"10px"}}></span>
                <select name="logs" id="carControlLog" size="5" className={classNames(styles.logBox,styles.scrollbarStyle)} style={{height:'250px'}}>
               
            </select>
            </React.Fragment>
        )
    }
}
