import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom'

import { getStudents } from '../server/common/utils';
import Student from '../components/student/student';
import AddButton from '../components/add_button/button';

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

    fetchStudents() {
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

    render() {
        if (!this.state.loading) {
            return <p>Загрузка...</p>
        }
        const { students, hasMore } = this.state;
        return (
            <>
                <Link to={`/students/add`}>
                    <AddButton />
                </Link>
                <InfiniteScroll next={this.fetchStudents.bind(this)}
                                hasMore={hasMore}
                                dataLength={students.length}
                                loader={<h4>Loading...</h4>}
                                >
                    {students.map(student =>
                        <Student key={student._id}
                                 id={student._id}
                                 photourl={''}
                                 fio={student.fio}
                                 speciality={student.speciality}
                                 age={student.age}
                                 rating={student.rating}
                        />)}
                </InfiniteScroll>
            </>
        );
    }
}