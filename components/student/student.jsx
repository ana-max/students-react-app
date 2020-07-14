import React from 'react';

import styles from './student.module.css';

export default function Student(student) {
    return (
        <section className={styles.student} key={student.id}>
            <section className='student__image'>
                <img className='image'
                     src={student.photourl}
                     alt='Фотография студента' />
            </section>
            <section className='student__name'>{`${student.fio}`}</section>
            <section className='student__speciality'>{student.speciality}</section>
            <section className='student__group'>{student.group}</section>
            <section className='student__age'>{student.age}</section>
            <section className='student__rating'>{student.rating}</section>
            <section className='student__color' />
            <section className='student__delete-button' />
        </section>
    );
}