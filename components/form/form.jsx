import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { ALL_SPECIALITIES, ALL_GROUPS, ALL_GENDERS } from '../../server/common/consts';
import Dropdown from '../dropdown/dropdown';
import Palette from '../palette/palette';
import styles from './form.module.css';

const INITIAL_STATE = {
    name: '',
    email: '',
    speciality: '',
    group: '',
    rating: '',
    gender: '',
    age: '',
    color: '',
    colorHex: '',
    isPaletteOpen: false,
    redirect: false
}

export default class Form extends Component {
    state = INITIAL_STATE

    handleFieldChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit = (event) => {
        if (!this.isStudentValid()) {
            return;
        }
        ALL_SPECIALITIES.map(speciality => speciality.selected = false);
        ALL_GROUPS.map(group => group.selected = false);
        ALL_GENDERS.map(gender => gender.selected = false);
        this.props.onSubmit(this.state);
        this.setState({
            ...INITIAL_STATE,
            redirect: true
        });
    }

    isStudentValid = () => {
        const { name, email, speciality, group, rating, gender, age, color } = this.state;
        if (!name || !email || !speciality || !group || !rating || !gender || !age || !color) {
            alert('Заполните все поля');
            return false;
        }
        if (!+age || Number(age) <= 15 || Number(age) >= 90) {
            alert('Допустимый возраст от 15 до 90');
            return false;
        }
        if (!+rating || Number(rating) < 0) {
            alert('Рейтинг не может быть ниже нуля')
            return false;
        }
        const pattern  = /\S+@\S+\.\S+/;
        if (email.toLowerCase().search(pattern) === -1) {
            alert('Введите правильный email');
            return false;
        }
        return true;
    }

    toggleSelectedSpeciality = (id, key) => {
        this.toggleSelected(ALL_SPECIALITIES, id, key);
    }

    toggleSelectedGroup = (id, key) => {
        this.toggleSelected(ALL_GROUPS, id, key);
    }

    toggleSelectedGender = (id, key) => {
        this.toggleSelected(ALL_GENDERS, id, key);
    }

    toggleSelected = (list, id, key) => {
        const otherItems = list.filter(item => item.id !== id && item.selected === true);
        otherItems.map(item => item.selected = false);
        const item = list.find(item => item.id === id);
        item.selected = !item.selected
        this.setState({
            [key]: item.selected ? item.title : ''
        })
    }

    changeColor = (color, colorHex) => {
        this.setState({
            color,
            colorHex,
            isPaletteOpen: false
        })
    }

    changePaletteVisibility = () => {
        this.setState(state => ({
            isPaletteOpen: !state.isPaletteOpen
        }))
    }

    render() {
        if (this.state.redirect ) {
            return <Redirect to={'/'} />
        }

        return (
            <section className={styles.form}>
                <section className={styles.name}>
                    <label className={styles.formField__label} htmlFor='name'>ФИО</label>
                    <input type='text' id='name' className={styles.form__field}
                           onChange={this.handleFieldChange} placeholder='Имя'
                           autoComplete='off' required='required'
                    />
                </section>

                <section className={styles.email}>
                    <label className={styles.formField__label} htmlFor='email'>Email</label>
                    <input type='email' id='email' className={styles.form__field}
                           onChange={this.handleFieldChange} placeholder='Email'
                           autoComplete='off' required='required'
                    />
                </section>

                <section className={styles.speciality}>
                    <Dropdown
                        label='Специальность'
                        title='Выберите'
                        list={ALL_SPECIALITIES}
                        toggleItem={this.toggleSelectedSpeciality}
                    />
                </section>
                <section className={styles.group}>
                    <Dropdown
                        label='Группа'
                        title='Выберите'
                        list={ALL_GROUPS}
                        toggleItem={this.toggleSelectedGroup}
                    />
                </section>

                <section className={styles.rating}>
                    <label className={styles.formField__label} htmlFor='rating'>Рейтинг</label>
                    <input type='number' id='rating' className={styles.form__field}
                           onChange={this.handleFieldChange} placeholder='Рейтинг'
                           autoComplete='off' min={0} required='required'
                    />
                </section>

                <section className={styles.gender}>
                    <Dropdown
                        label='Пол'
                        title='Выберите'
                        list={ALL_GENDERS}
                        toggleItem={this.toggleSelectedGender}
                    />
                </section>

                <section className={styles.age}>
                    <label className={styles.formField__label} htmlFor='age'>Возраст</label>
                    <input type='number' id='age' className={styles.form__field}
                           onChange={this.handleFieldChange} placeholder='Возраст'
                           autoComplete='off' min='16' max='100' required='required'
                    />
                </section>

                <section className={styles.favouriteColor}>
                    <label className={styles.formField__label} htmlFor='favourite-color'>Любимый цвет</label>
                    <section>
                        <div className={styles.form__field} onClick={this.changePaletteVisibility}>
                            {this.state.color || 'Выберите'}
                        </div>
                        {this.state.isPaletteOpen&&<section className={styles.palette}>
                            <Palette changeColor={this.changeColor} />
                        </section>}
                    </section>
                </section>

                <button className={styles.button} type='submit' onClick={this.handleSubmit}>
                    Создать
                </button>
            </section>
        )
    }
}
