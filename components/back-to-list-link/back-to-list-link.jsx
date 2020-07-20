import React from 'react';
import { Link } from 'react-router-dom';

import { createImagePath } from '../../server/common/utils';
import styles from './back-to-list-link.module.css';

export default function BackToListLink() {
    return (
        <section className={styles.backToList}>
            <Link to={'/'}>
                <img src={`${createImagePath('back.svg')}`} alt='Стрелка назад'/>
            </Link>
            <div className={styles.backToList__text}>НАЗАД К СПИСКУ СТУДЕНТОВ</div>
        </section>
    );
}
