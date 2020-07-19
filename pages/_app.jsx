import React, { Component }  from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/header/header';
import StudentsPage from './students-list';
import StudentAddingPage from './student';

import { createStudent } from '../server/common/utils';
import './app.css';

export default class MyApp extends Component {
    state = {
        newStudent: ''
    }

    createStudent = async (queryParams, body) => {
        await createStudent(queryParams, body).then(
            student => this.setState({
                newStudent: student
            })
        );
        console.info(this.state.newStudent)
    }

    render() {
        const isServer = typeof window === 'undefined';
        return (
            <>
                <Helmet>
                    <title>Students App</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link href="//db.onlinewebfonts.com/c/cbfd76ebfe6bbb4ed21885357c36115e?family=Geometria"
                          rel="stylesheet"
                          type="text/css"/>
                </Helmet>
                {(isServer) ? '' :
                    <BrowserRouter>
                        <>
                            <Header />
                            <section className='content'>
                                <Switch>
                                    <Route path='/' exact
                                           render={ () => <StudentsPage newStudent={this.state.newStudent} />}
                                    />
                                    <Route path='/students/add' exact
                                           render={ () => <StudentAddingPage createStudent={this.createStudent} />}
                                    />
                                </Switch>
                            </section>
                        </>
                    </BrowserRouter>}
            </>
        );
    }
}

