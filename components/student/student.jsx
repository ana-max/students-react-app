import React, { Component } from 'react';

import styles from './student.module.css';

export default class Student extends Component {
    getAgeStrCount = (age) => {
        let count = age % 100;
        if (count >= 5 && count <= 20) {
            return  'лет';
        } else {
            count = count % 10;
            if (count === 1) {
                return  'год';
            } else if (count >= 2 && count <= 4) {
                return 'года';
            } else {
                return 'лет';
            }
        }
    }

    render() {
        const { student } = this.props;
        const colorStyle = {
            background:
                student.colorHex === '#rainbow' ?
                'url(\'http://students-react-app.surge.sh/images/rainbow.png\') no-repeat center' :
                student.colorHex
        }

        return (
            <section className={styles.student} key={student.id}>
                <section className={styles.student__image}>
                    {student.photoData ?
                        <img className={styles.image} src={`data:image;base64,${student.photoData.data}`}
                             alt='Фотография студента' /> :
                        <div className={styles.text}>ФИ</div>
                    }
                </section>
                <p className={styles.student__name}>{`${student.name}`}</p>
                <p className={styles.student__speciality}>{student.speciality}</p>
                <p className={styles.student__group}>{student.group}</p>
                <p className={styles.student__age}>{student.age}</p>
                <p className={styles.student__ageStrCount}>{this.getAgeStrCount(student.age)}</p>
                <p className={styles.student__rating}>{student.rating}</p>
                <section className={styles.student__color} style={colorStyle} />
                <button className={styles.student__deleteButton}
                        onClick={() => this.props.deleteStudent(student._id)}
                />
            </section>
        );
    }
}
