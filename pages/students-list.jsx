import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom'

import { deleteStudent, getStudents, searchStudents, sortStudents } from '../server/common/utils';
import Student from '../components/student/student';
import StudentAddButton from '../components/student-add-button/button';
import SearchLine from '../components/search-line/search-line';
import SortLine from '../components/sort-line/sort-line';
import StudentsListHeader from '../components/students-list-header/header';

const INITIAL_STATE = {
    students: [],
    isError: false,
    loading: false,
    sortByAscending: true
}

export default class StudentsPage extends Component {
    state = INITIAL_STATE

    componentDidMount() {
        this.fetchStudents();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.newStudent) return;
        this.setState(state => ({
            students: state.students.concat([nextProps.newStudent])
        }));
    }

    fetchStudents = () => {
        getStudents()
            .then((students) => this.setState(state => (
                {
                    loading: true,
                    isError: false,
                    students: state.students.concat(students),
                    offset: state.offset + state.limit,
                    hasMore: students.length === state.limit
                })))
            .catch(() => this.setState({ isError: true }));
    }

    sortStudents = (sortKey) => {
        const queryParams = {
            sortKey: sortKey,
            sortByAscending: this.state.sortByAscending
        }
        sortStudents(queryParams).then(students => this.setState(state => ({
            sortByAscending: !state.sortByAscending,
            students: students
        })));
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

    deleteStudentById = (studentId) => {
        const queryParams = {
            id: studentId
        };
        deleteStudent(queryParams)
            .catch(() => this.setState({ isError: true }));
        this.setState(state => ({
            students: state.students.filter(student => student._id !== studentId)
        }));
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
                <StudentsListHeader />
                <section className='students-list'>
                    {students.map(student =>
                        <Student key={student._id}
                                 student={student}
                                 deleteStudent={this.deleteStudentById}
                        />)}
                </section>
            </>
        );
    }
}
