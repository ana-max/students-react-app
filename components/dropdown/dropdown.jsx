import React, { Component } from 'react';

import styles from './dropdown.module.css';

export default class Dropdown extends Component {
    constructor(props){
        super(props)
        this.state = {
            listOpen: false,
            headerTitle: this.props.title
        }
    }

    componentDidUpdate() {
        const { listOpen } = this.state;

        setTimeout(() => listOpen ?
            window.addEventListener('click', this.handleClickOutside):
            window.removeEventListener('click', this.handleClickOutside)
            , 0);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside = () => {
        this.setState({
            listOpen: false
        })
    }

    toggleList = () => {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }

    toggleItem = (item) => {
        this.props.toggleItem(item.id, item.key);
        this.setState({
            listOpen: false,
            headerTitle: item.selected ? item.title: this.props.title
        })
    }

    render() {
        const{list, label} = this.props
        const{listOpen, headerTitle} = this.state

        return (
            <>
                <div className={styles.selectLabel}>{label}</div>
                <div className={styles.wrapper} >
                    <div className={styles.header} onClick={this.toggleList}>
                        <div>{headerTitle}</div>
                    </div>
                    {listOpen && <div className={styles.list}>
                        {list.map((item) => (
                            <>
                                <input type='radio' key={item.id} id={`${item.key}${item.id}`} name={item.key}
                                       className={styles.list__item}
                                />
                                <label className={styles.listItem__label} htmlFor={`${item.key}${item.id}`}
                                       onClick={() => this.toggleItem(item)}
                                >
                                    <div className={`${item.selected ? styles.selectedItem: styles.nonSelectedItem}`}
                                    >
                                        {item.title}
                                    </div>
                                </label>
                            </>
                        ))}
                    </div>}
                </div>
            </>
        )
    }
}
