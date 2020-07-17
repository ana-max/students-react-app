import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './button.module.css';

export default class StudentCreateButton extends Component {
    render() {
        return <>
            <Link to={'/'}>
                <button className={styles.button} onClick={this.props.onClick}>Создать</button>
            </Link>
        </>
    }
}
