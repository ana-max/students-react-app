import React from 'react';
import { Link } from 'react-router-dom';

import styles from './back-to-list-link.module.css';

export default function BackToListLink() {
    return (
        <section className={styles.backToList}>
            <Link to={'/'}>
                <img src='/images/back.svg' alt='Стрелка назад'/>
            </Link>
            <div className={styles.backToList__text}>НАЗАД К СПИСКУ СТУДЕНТОВ</div>
        </section>
    )
}
