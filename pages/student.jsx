import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { createStudent, getStudents } from '../server/common/utils';
import Avatar from '../components/avatar/avatar';
import BackToListLink from '../components/back-to-list-link/back-to-list-link';
import Form from "../components/form/form";

export default class StudentAddingPage extends Component {
    state = {
        image: ''
    }

    changeImage = (image) => {
        this.setState({
            image
        });
    }

    createStudent = async (student) => {
        const { name, email, speciality, group, rating, gender, age, colorHex } = student;
        const queryParams = { name, email, speciality, group, rating, gender, age, colorHex };
        const body = new FormData();
        body.append('avatar', this.state.image);
        this.props.createStudent(queryParams, body);
    }

    render() {
        return (
            <>
                <BackToListLink />
                <div className='new-student'>Новый студент</div>
                <Avatar changeImage={this.changeImage} />
                <Form onSubmit={this.createStudent} />
            </>
        );
    }
}
