import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_STUDENT } from '../server/common/consts';

export default class StudentAddingPage extends Component {
    state = {
        imagePreviewUrl: ''
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value || DEFAULT_STUDENT[event.target.id]
        })
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

    handleSubmit = async () => {
        const formData = new FormData(this.form);
        await fetch('/api/students', {
            method: 'POST',
            body: formData
        })
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = imagePreviewUrl ?
            <img className='previewImage' src={imagePreviewUrl} alt='Аватар' /> :
            <div className='previewText'>ФИ</div>;

        return (
            <form ref={e => this.form = e} method="post" encType="multipart/form-data" >
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
                               name='fio'
                               className='characteristic__field'
                               placeholder={`${DEFAULT_STUDENT.fio}`}
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
                               name='email'
                               className='characteristic__field'
                               placeholder={`${DEFAULT_STUDENT.email}`}
                               onChange={this.handleChange}
                        />
                    </section>

                    <section className='age'>
                        <label className='characteristic__field-label' htmlFor='age'>Возраст</label>
                        <input type='number'
                               id='age'
                               name='age'
                               className='characteristic__field'
                               placeholder={`${DEFAULT_STUDENT.age}`}
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
                        <div className='wrapper-color-palette'>
                            <label htmlFor='toggle' className='toggle-button-label'>Выбрать</label>
                            <input type='checkbox' id='toggle' className='toggle-button' />
                            <ul className='color-palette'>
                                <li>
                                    <section className='color-section'>
                                        <input type='radio' id='blue' name="color" className='circle' />
                                        <label htmlFor='blue' className='color-label blue-circle' />

                                        <input type='radio' id='red' name="color" className='circle' />
                                        <label htmlFor='red' className='color-label red-circle' />

                                        <input type='radio' id='green' name="color" className='circle' />
                                        <label htmlFor='green' className='color-label green-circle' />

                                        <input type='radio' id='yellow' name="color" className='circle' />
                                        <label htmlFor='yellow' className='color-label yellow-circle' />

                                        <input type='radio' id='black' name="color" className='circle' />
                                        <label htmlFor='black' className='color-label black-circle' />

                                        <input type='radio' id='orange' name="color" className='circle' />
                                        <label htmlFor='orange' className='color-label orange-circle' />

                                        <input type='radio' id='rainbow' name="color" className='circle' />
                                        <label htmlFor='rainbow' className='color-label rainbow-circle'>
                                            <img src='/images/rainbow.png' alt='Радуга' />
                                        </label>
                                    </section>
                                </li>
                            </ul>
                        </div>
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
                               name='rating'
                               className='characteristic__field'
                               placeholder={`${DEFAULT_STUDENT.rating}`}
                               onChange={this.handleChange}
                        />
                    </section>
                </section>
                <input type='submit'
                       className='create-button'
                       value='Создать'
                       onClick={this.handleSubmit}
                />
            </form>
        );
    }
}

