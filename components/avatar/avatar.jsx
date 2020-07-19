import React, { Component } from 'react';

import styles from './avatar.module.css';

export default class Avatar extends Component {
    state = {
        imagePreviewUrl: ''
    }

    handleImageChange = (event) => {
        event.preventDefault();
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                photoUrl: file.name,
                imagePreviewUrl: reader.result
            }, () => this.props.changeImage(file));
        }
        reader.readAsDataURL(file);
    }

    render() {
        const { imagePreviewUrl } = this.state;
        return (
            <section className={styles.avatar}>
                <div className='avatar__preview preview'>
                    {imagePreviewUrl ?
                        <img className={styles.preview__image} src={imagePreviewUrl} alt='Аватар'/> :
                        <div className={styles.preview__text}>ФИ</div>
                    }
                </div>
                <label htmlFor='file-upload' className='custom-file-upload'>
                    <p className={styles.changeAvatar}>Сменить аватар</p>
                    <p className={styles.fileSize}>500x500</p>
                </label>
                <input id='file-upload' className={styles.fileInput} type='file' onChange={this.handleImageChange} />
            </section>
        )
    }
}
