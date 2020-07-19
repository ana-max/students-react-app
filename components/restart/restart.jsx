import React from 'react';

import styles from './restart.module.css';

export default function Restart() {
    const handleRestartClick = () => {
        history.go(0);
    };
    return (
        <div className={styles.restartBlock}>
            <p className={styles.restartBlock__text}>К сожалению, возникли проблемы с соединением :(</p>
            <input className={styles.restartBlock__button}
                   type='button'
                   value='Перезагрузить страницу'
                   onClick={handleRestartClick}/>
        </div>
    );
}
