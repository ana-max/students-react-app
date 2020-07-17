import React, { Component } from 'react';

import { ALL_SPECIALITIES, ALL_GROUPS } from '../server/common/consts';
import { createStudent } from '../server/common/utils';
import Avatar from '../components/avatar/avatar';
import BackToListLink from '../components/back-to-list-link/back-to-list-link';
import Palette from '../components/palette/palette';
import StudentCreateButton from '../components/student-create-button/button';

export default class StudentAddingPage extends Component {
    state = {
        name: 'Имя',
        email: 'Email',
        speciality: 'Выберите',
        group: 'Выберите',
        rating: 'Рейтинг',
        gender: 'Выберите',
        age: 'Возраст',
        color: 'Выберите',
        colorHex: '',
        image: ''
    }

    changeCharacteristicField = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    changeColor = (color, colorHex) => {
        this.setState({
            color,
            colorHex
        })
    }

    changeImage = (image) => {
        this.setState({
            image
        });
    }

    fetchStudent = async (event) => {
        console.info(this.state);
        // event.preventDefault();
        event.stopPropagation();
        const { name, email, speciality, group, rating, gender, age, colorHex } = this.state;
        const queryParams = { name, email, speciality, group, rating, gender, age, colorHex };
        const body = new FormData();
        body.append('avatar', this.state.image);
        await createStudent(queryParams, body);
    }

    render() {
        return (
            <>
                <BackToListLink />
                <div className='new-student'>Новый студент</div>
                <Avatar changeImage={this.changeImage}/>
                <section className='characteristic'>
                    <section className='name'>
                        <label className='characteristic__field-label' htmlFor='name'>ФИО</label>
                        <input type='text'
                               id='name'
                               name='name'
                               className='characteristic__field'
                               onChange={this.changeCharacteristicField}
                               placeholder={this.state.name}
                               autoComplete='off'
                               required='required'
                        />
                    </section>

                    <section className='gender'>
                        <label className='characteristic__field-label' htmlFor='gender'>Пол</label>
                        <section className='select'>
                            <label htmlFor='gender' className='characteristic__field select__head-label'>
                                {this.state.gender}
                            </label>
                            <input type='checkbox' id='gender' className='select__head'/>
                            <ul className='select__list' onClick={this.changeCharacteristicField}>
                                <input type='radio' className='select__item' id='gender1'
                                       name='gender' value='мужской' />
                                <label htmlFor='gender1' className='select__item-label'>
                                    <p className='selectedItem'>мужской</p>
                                </label>
                                <input type='radio' className='select__item' id='gender2'
                                       name='gender' value='женский' />
                                <label htmlFor='gender2' className='select__item-label'>
                                    <p className='selectedItem'>женский</p>
                                </label>
                            </ul>
                        </section>
                    </section>

                    <section className='email'>
                        <label className='characteristic__field-label' htmlFor='email'>Email</label>
                        <input type='text'
                               id='email'
                               name='email'
                               className='characteristic__field'
                               onChange={this.changeCharacteristicField}
                               placeholder={this.state.email}
                               autoComplete='off'
                               required='required'
                        />
                    </section>

                    <section className='age'>
                        <label className='characteristic__field-label' htmlFor='age'>Возраст</label>
                        <input type='number'
                               id='age'
                               name='age'
                               className='characteristic__field'
                               onChange={this.changeCharacteristicField}
                               placeholder={this.state.age}
                               autoComplete='off'
                               min='16'
                               max='100'
                               required='required'
                        />
                    </section>

                    <section className='speciality'>
                        <label className='characteristic__field-label' htmlFor='speciality'>Специальность</label>
                        <section className='select'>
                            <label htmlFor='speciality' className='characteristic__field select__head-label'>
                                {this.state.speciality}
                            </label>
                            <input type='checkbox' id='speciality' className='select__head'/>
                            <ul className='select__list' onClick={this.changeCharacteristicField}>
                                {ALL_SPECIALITIES.map(speciality =>
                                    <>
                                        <input type='radio' className='select__item' id={`spec${speciality.id}`}
                                               name='speciality' value={speciality.name} />
                                        <label htmlFor={`spec${speciality.id}`} className='select__item-label'>
                                            <p className='selectedItem'>{speciality.name}</p>
                                        </label>
                                    </>
                                )}
                            </ul>
                        </section>
                    </section>

                    <section className='favourite-color'>
                        <label className='characteristic__field-label' htmlFor='favourite-color'>Любимый цвет</label>
                        <section className='select'>
                            <label htmlFor='favourite-color' className='characteristic__field select__head-label'>
                                {this.state.color}
                            </label>
                            <input type='checkbox' id='favourite-color' className='select__head'/>
                            <section className='palette'>
                                <Palette changeColor={this.changeColor} />
                            </section>
                        </section>
                    </section>

                    <section className='group'>
                        <label className='characteristic__field-label' htmlFor='group'>Группа</label>
                        <section className='select'>
                            <label htmlFor='group' className='characteristic__field select__head-label'>
                                {this.state.group}
                            </label>
                            <input type='checkbox' id='group' className='select__head'/>
                            <ul className='select__list' onClick={this.changeCharacteristicField}>
                                {ALL_GROUPS.map(group =>
                                    <>
                                        <input type='radio' className='select__item' id={`group${group.id}`}
                                               name='group' value={group.name} />
                                        <label htmlFor={`group${group.id}`} className='select__item-label'>
                                            <p className='selectedItem'>{group.name}</p>
                                        </label>
                                    </>
                                )}
                            </ul>
                        </section>
                    </section>

                    <section className='rating'>
                        <label className='characteristic__field-label' htmlFor='rating'>Рейтинг</label>
                        <input type='number'
                               id='rating'
                               name='rating'
                               className='characteristic__field'
                               onChange={this.changeCharacteristicField}
                               placeholder={this.state.rating}
                               autoComplete='off'
                               min='0'
                               required='required'
                        />
                    </section>

                </section>
                <StudentCreateButton onClick={this.fetchStudent} />
            </>
        );
    }
}
