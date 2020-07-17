import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Avatar from "../components/avatar/avatar";
import {ALL_SPECIALITIES, ALL_GROUPS} from "../server/common/consts";
import {createStudent} from "../server/common/utils";

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
        image: ''
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = async () => {
        const { name, email, speciality, group, rating, gender, age, color } = this.state;
        const queryParams = { name, email, speciality, group, rating, gender, age, color };
        const body = new FormData();
        body.append('avatar', this.state.image);
        await createStudent(queryParams, body);
    }

    changeImage = (image) => {
        this.setState({
            image
        });
    }

    render() {
        return (
            <>
                <section className='back-to-list'>
                    <Link to={'/'}>
                        <img src='/images/back.svg' alt='Стрелка назад'/>
                    </Link>
                    <div className='back-to-list__text'>НАЗАД К СПИСКУ СТУДЕНТОВ</div>
                </section>
                <div className='new-student'>Новый студент</div>
                <Avatar changeImage={this.changeImage}/>
                <section className='characteristic'>
                    <section className='name'>
                        <label className='characteristic__field-label' htmlFor='name'>ФИО</label>
                        <input type='text'
                               id='name'
                               name='name'
                               className='characteristic__field'
                               onChange={this.handleChange}
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
                            <ul className='select__list' onClick={this.handleChange}>
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
                               onChange={this.handleChange}
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
                               onChange={this.handleChange}
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
                            <ul className='select__list' onClick={this.handleChange}>
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
                            <section className='color-section' onClick={this.handleChange}>
                                <input type='radio' id='blue' name='color' className='circle' value='Голубой'/>
                                <label htmlFor='blue' className='color-label blue-circle' />

                                <input type='radio' id='red' name='color' className='circle' value='Красный' />
                                <label htmlFor='red' className='color-label red-circle' />

                                <input type='radio' id='green' name='color' className='circle' value='Зелёный'/>
                                <label htmlFor='green' className='color-label green-circle' />

                                <input type='radio' id='yellow' name='color' className='circle' value='Жёлтый' />
                                <label htmlFor='yellow' className='color-label yellow-circle' />

                                <input type='radio' id='black' name='color' className='circle' value='Чёрный'/>
                                <label htmlFor='black' className='color-label black-circle' />

                                <input type='radio' id='orange' name='color' className='circle' value='Оранжевый' />
                                <label htmlFor='orange' className='color-label orange-circle' />

                                <input type='radio' id='rainbow' name='color' className='circle' value='Все цвета' />
                                <label htmlFor='rainbow' className='color-label rainbow-circle' />
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
                            <ul className='select__list' onClick={this.handleChange}>
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
                               onChange={this.handleChange}
                               placeholder={this.state.rating}
                               autoComplete='off'
                               min='0'
                               required='required'
                        />
                    </section>

                </section>
                <Link to={'/'}>
                    <button className='create-button' onClick={this.handleSubmit}>Создать</button>
                </Link>
            </>
        );
    }
}

