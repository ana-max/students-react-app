import React from 'react';
import { Link } from 'react-router-dom';

import styles from './header.module.css';

export default function Header() {
    return (
        <header className={styles.logo}>
            <p className={styles.logo__text}>
                <img className={styles.logo__textImgOuter}
                     src='/images/logo.svg'
                     alt="Логотип" />
                <img className={styles.logo__textImgInner}
                     src='/images/logo2.svg'
                     alt="Логотип" />
                <p className={styles.logo__textStudents}>STUDENTS</p>
            </p>
        </header>
    );
}