import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom'

import {deleteStudent, getStudents, searchStudents, sortStudents} from '../server/common/utils';
import Student from '../components/student/student';
import StudentAddButton from '../components/student_add_button/button';
import SearchLine from '../components/search-line/search-line';
import SortLine from '../components/sort-line/sort-line';

export default class StudentsPage extends Component {
    state = {
        limit: 25,
        offset: 0,
        students: [],
        isError: false,
        loading: false,
        hasMore: true
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

    sortStudents = (sortKey) => {
        const queryParams = {
            sortKey: sortKey
        }
        sortStudents(queryParams).then(students => this.setState({
            students: students,
            hasMore: false
        }));
    }

    searchStudents = (searchName) => {
        const queryParams = {
            name: searchName
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

    deleteStudent = (id) => {
        const queryParams = {
            id: id
        };
        deleteStudent(queryParams)
            .then(this.fetchStudents)
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
                <div className='search-sort-block'>
                    <SearchLine searchStudents={this.searchStudents} />
                    <SortLine sortStudents={this.sortStudents} />
                </div>
                <InfiniteScroll next={this.fetchStudents.bind(this)}
                                hasMore={hasMore}
                                dataLength={students.length}
                                loader={<h4>Loading...</h4>}
                                >
                    {students.map(student =>
                        <Student key={student._id}
                                 student={student}
                                 deleteStudent={this.deleteStudent}
                        />)}
                </InfiniteScroll>
            </>
        );
    }
}
