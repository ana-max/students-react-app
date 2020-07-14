import React from 'react';
import { Link } from 'react-router-dom';

import styles from './header.module.css';

export default function Header() {
    return (
        <header className={styles.logo}>
            <Link to='/' className={'routerLink'}>
                <img className='logo__imageOuter'
                     src='/images/logo.svg'
                     alt="Логотип" />
                <img className={styles.logo__imageInner}
                     src='/images/logo2.svg'
                     alt="Логотип" />
                <span className={styles.logo__text}>STUDENTS</span>
            </Link>
        </header>
    );
}