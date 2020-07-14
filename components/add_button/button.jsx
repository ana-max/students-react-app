import React from 'react';

import styles from './button.module.css';

export default function AddButton() {
    return <>
        <button className={styles.button}>Добавить студента</button>
    </>
}