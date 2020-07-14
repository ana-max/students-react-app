import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { createStudent } from '../server/common/utils';

const INITIAL_STATE = {
    fio: 'Иванов Иван Иванов',
    email: 'ivanov@gmail.com',
    speciality: 'Прикладная информатика',
    group: 'ПИ-101',
    rating: 0,
    age: 18,
    gender: 'мужской',
    photoUrl: '',
    imagePreviewUrl: ''
}

export default class StudentAddingPage extends Component {
    state = INITIAL_STATE

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value || INITIAL_STATE[event.target.id]
        })
    }

    handleClick = async () => {
        const { fio, email, speciality, group, rating, age, gender, photoUrl } = this.state;
        const queryParams = { fio, email, speciality, group, rating, age, gender, photoUrl };
        await createStudent(queryParams);
    }

    handleImageChange = (event) => {
        event.preventDefault();
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                photoUrl: file.name,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file);
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = imagePreviewUrl ?
            <img className='previewImage' src={imagePreviewUrl} alt='Аватар' /> :
            <div className='previewText'>ФИ</div>;

        return (
            <form action='/' method="post" encType="multipart/form-data">
                <section className='back-to-list'>
                    <Link to={'/'}>
                        <img src='/images/back.svg'
                             alt='Стрелка назад'
                        />
                    </Link>
                    <div className='back-to-list__text'>НАЗАД К СПИСКУ СТУДЕНТОВ</div>
                </section>
                <div className='new-student'>Новый студент</div>
                <section className='avatar'>
                    <div className="imgPreview">
                        {$imagePreview}
                    </div>
                    <label htmlFor="file-upload" className="custom-file-upload">
                        Сменить аватар
                    </label>
                    <input id="file-upload"
                           className="fileInput"
                           type="file"
                           name="filedata"
                           onChange={(e)=>this.handleImageChange(e)} />
                </section>

                <section className='characteristic'>
                    <section className='fio'>
                        <label className='characteristic__field-label' htmlFor='fio'>ФИО</label>
                        <input type='text'
                               id='fio'
                               className='characteristic__field'
                               placeholder={`${INITIAL_STATE.fio}`}
                               onChange={this.handleChange}
                        />
                    </section>

                    <section className='gender'>
                        <label className='characteristic__field-label' htmlFor='gender'>Пол</label>
                        <select className='characteristic__field'
                                name='gender'
                                id='gender'
                                onChange={this.handleChange}
                        >
                            <option>мужской</option>
                            <option>женский</option>
                        </select>
                    </section>

                    <section className='email'>
                        <label className='characteristic__field-label' htmlFor='email'>Email</label>
                        <input type='email'
                               id='email'
                               className='characteristic__field'
                               placeholder={`${INITIAL_STATE.email}`}
                               onChange={this.handleChange}
                        />
                    </section>

                    <section className='age'>
                        <label className='characteristic__field-label' htmlFor='age'>Возраст</label>
                        <input type='number'
                               id='age'
                               className='characteristic__field'
                               placeholder={`${INITIAL_STATE.age}`}
                               onChange={this.handleChange}
                        />
                    </section>

                    <section className='speciality'>
                        <label className='characteristic__field-label' htmlFor='speciality'>Специальность</label>
                        <select className='characteristic__field'
                                name='speciality'
                                id='speciality'
                                onChange={this.handleChange}
                        >
                            <option>Прикладная информатика</option>
                            <option>Математика и компьютерные науки</option>
                            <option>Фундаментальная информатика</option>
                        </select>
                    </section>

                    <section className='color'>
                        <label className='characteristic__field-label' htmlFor='color'>Любимый цвет</label>
                    </section>

                    <section className='group'>
                        <label className='characteristic__field-label' htmlFor='group'>Группа</label>
                        <select className='characteristic__field'
                                name='group'
                                id='group'
                                onChange={this.handleChange}
                        >
                            <option>ПИ-101</option>
                            <option>КН-101</option>
                            <option>ФИИТ-101</option>
                        </select>
                    </section>

                    <section className='rating'>
                        <label className='characteristic__field-label' htmlFor='rating'>Рейтинг</label>
                        <input type='number'
                               id='rating'
                               className='characteristic__field'
                               placeholder={`${INITIAL_STATE.rating}`}
                               onChange={this.handleChange}
                        />
                    </section>
                </section>
                <input type='submit'
                       className='create-button'
                       value='Создать'
                       onClick={this.handleClick}
                />
            </form>
        );
    }
}

