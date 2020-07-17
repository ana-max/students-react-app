import React, { Component } from 'react';

import styles from './sort-line.module.css';

export default class SortLine extends Component {
    state = {
        sortKey: 'name',
        sortKeyValue: 'Имя'
    }

    handleSortParameterChange = event => {
        this.setState({
            sortKey: event.target.id,
            sortKeyValue: event.target.value
        })
    }

    handleSortClick = () => {
        this.props.sortStudents(this.state.sortKey);
    }

    render() {
        return (
            <section className={styles.sort}>
                <section className={styles.line}>
                    <label htmlFor='sortKey' className={styles.line__headLabel}>{this.state.sortKeyValue}</label>
                    <input type='checkbox' id='sortKey' className={styles.line__head}/>
                    <ul className={styles.line__list} onClick={this.handleSortParameterChange}>
                        <input type='radio' name='key' className={styles.line__item} id='name' value='Имя' />
                        <label htmlFor='name' className={styles.line__itemLabel} >
                            <p className={styles.selectedItem}>Имя</p>
                        </label>
                        <input type='radio' name='key' className={styles.line__item}  id='rating' value='Рейтинг' />
                        <label htmlFor='rating' className={styles.line__itemLabel}>
                            <p className={styles.selectedItem}>Рейтинг</p>
                        </label>
                        <input type='radio' name='key' className={styles.line__item}  id='age' value='Возраст' />
                        <label htmlFor='age' className={styles.line__itemLabel}>
                            <p className={styles.selectedItem}>Возраст</p>
                        </label>
                    </ul>
                </section>
                <button className={styles.button} onClick={this.handleSortClick} />
            </section>
        )
    }
}
