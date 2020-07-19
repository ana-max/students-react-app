import React, { Component } from 'react';

import styles from './form.module.css';
import Palette from '../palette/palette';
import {ALL_SPECIALITIES, ALL_GROUPS, ALL_GENDERS} from '../../server/common/consts';
import Dropdown from "../dropdown/dropdown";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";

const INITIAL_STATE = {
    name: '',
    email: '',
    speciality: '',
    group: '',
    rating: '',
    gender: '',
    age: '',
    color: '',
    colorHex: ''
}

export default class Form extends Component {
    state = INITIAL_STATE

    handleFieldChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit = (event) => {
        this.setState(INITIAL_STATE);
        ALL_SPECIALITIES.map(speciality => speciality.selected = false);
        ALL_GROUPS.map(group => group.selected = false);
        ALL_GENDERS.map(gender => gender.selected = false);
        this.props.onSubmit(this.state);
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
            colorHex
        })
    }

    render() {
        const {name, email, speciality, group, rating, gender, age, color} = this.state;
        const isButtonDisabled = !name || !email || !speciality || !group || !rating || !gender || !age || !color;

        if (this.state.shouldRedirect) {
            return <Redirect to={'/'} />
        }

        return (
            <div className={styles.form}>
                <section className={styles.name}>
                    <label className={styles.formField__label} htmlFor='name'>ФИО</label>
                    <input type='text' id='name' className={styles.form__field}
                           onChange={this.handleFieldChange} placeholder='Имя'
                           autoComplete='off' required='required'
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

                <section className={styles.email}>
                    <label className={styles.formField__label} htmlFor='email'>Email</label>
                    <input type='email' id='email' className={styles.form__field}
                           onChange={this.handleFieldChange} placeholder='Email'
                           autoComplete='off' required='required'
                    />
                </section>

                <section className={styles.age}>
                    <label className={styles.formField__label} htmlFor='age'>Возраст</label>
                    <input type='number' id='age' className={styles.form__field}
                           onChange={this.handleFieldChange} placeholder='Возраст'
                           autoComplete='off' min='16' max='100' required='required'
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

                <section className={styles.favouriteColor}>
                    <label className={styles.formField__label} htmlFor='favourite-color'>Любимый цвет</label>
                    <section>
                        <label htmlFor='favourite-color' className={styles.form__field}>
                            {this.state.color || 'Выберите'}
                        </label>
                        <input type='checkbox' id='favourite-color' className={styles.colorSelect}/>
                        <section className={styles.palette}>
                            <Palette changeColor={this.changeColor} />
                        </section>
                    </section>
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
                           autoComplete='off' min='0' required='required'
                    />
                </section>

                <Link to={'/'} className={styles.routerLink}>
                    <button className={styles.button} type='submit' disabled={isButtonDisabled}
                            onClick={this.handleSubmit}>Создать
                    </button>
                </Link>
            </div>
        )
    }
}
