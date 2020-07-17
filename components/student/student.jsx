import React, { Component } from 'react';

import styles from './student.module.css';

export default class Student extends Component {

    render() {
        const { student } = this.props;
        const colorStyle = {
            background:
                student.colorHex === '#rainbow' ?
                'url(\'/images/rainbow.png\') no-repeat center' :
                student.colorHex
        }
        console.info(student);
        return (
            <section className={styles.student} key={student.id}>
                <section className={styles.student__image}>
                    {student.photoData ?
                        <img className={styles.image} src={`data:image;base64,${student.photoData.data}`}
                             alt='Фотография студента' /> :
                        <div className={styles.image} />
                    }
                </section>
                <p className={styles.student__name}>{`${student.name}`}</p>
                <p className={styles.student__speciality}>{student.speciality}</p>
                <p className={styles.student__group}>{student.group}</p>
                <p className={styles.student__age}>{student.age}</p>
                <p className={styles.student__rating}>{student.rating}</p>
                <section className={styles.student__color} style={colorStyle} />
                <button className={styles.student__deleteButton}
                        onClick={() => this.props.deleteStudent(student._id)}
                />
            </section>
        );
    }
}
