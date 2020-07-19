import React, { Component } from 'react';

import styles from './sort-line.module.css';
import Dropdown from "../dropdown/dropdown";
import {ALL_SORT_KEYS} from "../../server/common/consts";

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

    toggleSelected = (id, key) => {
        const otherKeys = ALL_SORT_KEYS.filter(key => key.id !== id && key.selected === true);
        otherKeys.map(key => key.selected = false);
        const sortKey = ALL_SORT_KEYS.find(key => key.id === id);
        sortKey.selected = !sortKey.selected
        this.setState({
            [key]: sortKey.selected ? sortKey.title : ''
        })
    }

    render() {
        return (
            <section className={styles.line}>
                <Dropdown
                    label=''
                    title='Имя'
                    list={ALL_SORT_KEYS}
                    toggleItem={this.toggleSelected}
                />
                <button className={styles.button} onClick={this.handleSortClick} />
            </section>
        )
    }
}
