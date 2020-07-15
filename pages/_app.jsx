import React  from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Route, StaticRouter, Switch } from 'react-router-dom';

import Header from '../components/header/header';
import StudentsPage from './students-list';
import StudentAddingPage from './student';

import './app.css';

export default function MyApp() {
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
            {(isServer) ?
                <StaticRouter>
                    <Paths />
                </StaticRouter> :
                <BrowserRouter>
                    <Paths />
                </BrowserRouter>}
        </>
    );
}

const Paths = () =>
    <>
        <Header />
        <section className='content'>
            <Switch>
                <Route path='/' exact component={StudentsPage} />
                <Route path='/students/add' exact component={StudentAddingPage} />
            </Switch>
        </section>
    </>;