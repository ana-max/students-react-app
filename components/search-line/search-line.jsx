import React, { Component } from 'react';

import styles from './search-line.module.css';

export default class SearchLine extends Component {
    state = {
        searchName: ''
    }

    handleSearch = () => {
        this.props.searchStudents(this.state.searchName)
    }

    changeInputSearch = (event) => {
        event.preventDefault();
        this.setState({
            searchName: event.target.value
        })
    }

    render() {
        return (
            <section className={styles.search}>
                <label htmlFor='search-line' className={styles.lineLabel}>
                    <button className={styles.lineLabel__button} onClick={this.handleSearch} />
                </label>
                <input type='text'
                       id='search-line'
                       placeholder='Поиск по имени'
                       className={styles.line}
                       onChange={this.changeInputSearch}
                />
            </section>
        )
    }
}
