import React  from 'react';

import styles from './header.module.css';

export default function StudentsListHeader() {
    return (
        <section className={styles.header} >
            <p className={styles.name}>ФИО</p>
            <p className={styles.speciality}>Специальность</p>
            <p className={styles.group}>Группа</p>
            <p className={styles.age}>Возраст</p>
            <p className={styles.rating}>Рейтинг</p>
        </section>
    );

}
