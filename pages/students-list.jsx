import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom'

import {getStudents, searchStudents, sortStudents} from '../server/common/utils';
import Student from '../components/student/student';
import StudentAddButton from '../components/student_add_button/button';

export default class StudentsPage extends Component {
    state = {
        limit: 25,
        offset: 0,
        students: [],
        isError: false,
        loading: false,
        hasMore: true,
        sortKey: 'fio',
        searchName: ''
    }

    componentDidMount() {
        this.fetchStudents();
    }

    fetchStudents = () => {
        const queryParams = {
            limit: this.state.limit,
            offset: this.state.offset
        };
        getStudents(queryParams)
            .then((students) => this.setState(
                {
                    loading: true,
                    isError: false,
                    students: this.state.students.concat(students),
                    offset: this.state.offset + this.state.limit,
                    hasMore: students.length === this.state.limit
                }))
            .catch(() => this.setState({ isError: true }));
    }

    handleSortParameterChange = event => {
        this.setState({
            sortKey: event.target.value
        })
    }

    changeInputSearch = (event) => {
        event.preventDefault();
        this.setState({
            searchName: event.target.value
        })
    }

    handleSortClick = () => {
        const queryParams = {
            sortKey: this.state.sortKey
        }
        sortStudents(queryParams).then(students => this.setState({
            students: students,
            hasMore: false
        }));
    }

    handleSearch = () => {
        const queryParams = {
            fio: this.state.searchName
        };
        searchStudents(queryParams)
            .then(students => {
                this.setState({
                    students: students,
                    hasMore: false
                })
            })
            .catch(() => this.setState({ isError: true }));
    }

    render() {
        if (!this.state.loading) {
            return <p>Загрузка...</p>
        }
        const { students, hasMore } = this.state;
        return (
            <>
                <Link to={`/students/add`}>
                    <StudentAddButton />
                </Link>
                <p className='students-list-logo'>Студенты</p>
                <button onClick={this.handleSearch}>Искать</button>
                <input type='text' onChange={this.changeInputSearch}/>
                <select onChange={this.handleSortParameterChange}>
                    <option value={'fio'}>Имя</option>
                    <option value={'rating'}>Рейтинг</option>
                    <option value={'age'}>Возраст</option>
                </select>
                <button onClick={this.handleSortClick}>Сортировать</button>
                <InfiniteScroll next={this.fetchStudents.bind(this)}
                                hasMore={hasMore}
                                dataLength={students.length}
                                loader={<h4>Loading...</h4>}
                                >
                    {students.map(student =>
                        <Student key={student._id}
                                 id={student._id}
                                 photoData={student.photoData}
                                 name={student.name}
                                 speciality={student.speciality}
                                 group={student.group}
                                 age={student.age}
                                 rating={student.rating}
                        />)}
                </InfiniteScroll>
            </>
        );
    }
}
