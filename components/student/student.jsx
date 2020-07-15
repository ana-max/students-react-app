import React from 'react';

import styles from './student.module.css';

export default function Student(student) {

    return (
        <section className={styles.student} key={student.id}>
            <section className={styles.student__image}>
                {student.photoData ?
                    <img className={styles.image}
                         src={`data:image;base64,${student.photoData.data}`}
                         alt='Фотография студента' /> :
                    <div className={styles.image} />
                }

            </section>
            <section className={styles.student__name}>{`${student.fio}`}</section>
            <section className={styles.student__speciality}>{student.speciality}</section>
            <section className={styles.student__group}>{student.group}</section>
            <section className={styles.student__age}>{student.age}</section>
            <section className={styles.student__rating}>{student.rating}</section>
            <section className={styles.student__color} />
            <section className={styles.student__deleteButton} />
        </section>
    );
}