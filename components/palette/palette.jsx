import React, { Component } from 'react';

import { ALL_COLORS } from '../../server/common/consts';
import styles from './palette.module.css';

export default class Palette extends Component {
    state = {
        favouriteColor: '',
        favouriteColorHex: ''
    }

    changeColor = (event) => {
        console.info(event.target)
        const color = ALL_COLORS.find(color => color.name === event.target.id);
        this.setState({
            favouriteColor: color.name,
            favouriteColorHex: color.hex
        });
        this.props.changeColor(color.name, `#${color.hex}`);
    }

    render() {
        return (
            <section className={styles.colorSection} onClick={this.changeColor}>
                {
                    ALL_COLORS.map(color =>
                        <>
                            <input type='radio' id={color.hex} name='color' className={styles.circle} value={color.name}/>
                            <label id={color.name} htmlFor={color.hex} className={`${styles.colorLabel} ${styles[color.style]}`} />
                        </>
                    )
                }
            </section>
        )
    }
}
