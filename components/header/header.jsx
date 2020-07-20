import React from 'react';
import { Link } from 'react-router-dom';

import { createImagePath } from '../../server/common/utils';
import styles from './header.module.css';

export default function Header() {
    return (
        <header className={styles.logo}>
            <Link to='/' className={styles.routerLink}>
                <img className={styles.logo__image} src={`${createImagePath('circle.svg')}`} alt='Логотип' />
                <p className={styles.logo__text}>STUDENTS</p>
            </Link>
        </header>
    );
}
