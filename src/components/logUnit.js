import React, { Component } from 'react'
import styles from '../styles.module.css'

export default class LogUnit extends Component {
    render() {
        return (
            <React.Fragment>
                <span style={{color:"green",fontWeight:"bold",marginTop:"10px"}}>Log History</span>
                <select name="logs" size="5" className={styles.logBox} id={styles.scrollbarStyle}>
                <option value="Merceders"> Merceders </option>
                <option value="BMW"> BMW </option>
                <option value="Jaguar"> Jaguar </option>
                <option value="Lamborghini"> Lamborghini </option>
                <option value="Ferrari"> Ferrari </option>
                <option value="Ford"> Ford </option>
                <option value="Lamborghini"> Lamborghini </option>
                <option value="Ferrari"> Ferrari </option>
                <option value="Ford"> Ford </option>
                <option value="Lamborghini"> Lamborghini </option>
                <option value="Ferrari"> Ferrari </option>
                <option value="Ford"> Ford </option>
            </select>
            </React.Fragment>
        )
    }
}
