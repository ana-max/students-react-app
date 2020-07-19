import React, { Component } from 'react';

import styles from './palette.module.css';

export default class Palette extends Component {
    state = {
        favouriteColor: '',
        favouriteColorHex: ''
    }

    changeColor = (event) => {
        this.setState({
            favouriteColor: event.target.value,
            favouriteColorHex: event.target.id
        });
        this.props.changeColor(event.target.value, `#${event.target.id}`);
    }

    render() {
        return (
            <section className={styles.colorSection} onClick={this.changeColor}>
                <input type='radio' id='49C2E8' name='color' className={styles.circle} value='Голубой'/>
                <label htmlFor='49C2E8' className={`${styles.colorLabel} ${styles.blueCircle}`} />

                <input type='radio' id='E25B5B' name='color' className={styles.circle} value='Красный' />
                <label htmlFor='E25B5B' className={`${styles.colorLabel} ${styles.redCircle}`} />

                <input type='radio' id='83C872' name='color' className={styles.circle} value='Зелёный'/>
                <label htmlFor='83C872' className={`${styles.colorLabel} ${styles.greenCircle}`} />

                <input type='radio' id='F7FB53' name='color' className={styles.circle} value='Жёлтый' />
                <label htmlFor='F7FB53' className={`${styles.colorLabel} ${styles.yellowCircle}`} />

                <input type='radio' id='000' name='color' className={styles.circle} value='Чёрный'/>
                <label htmlFor='000' className={`${styles.colorLabel} ${styles.blackCircle}`} />

                <input type='radio' id='EFA638' name='color' className={styles.circle} value='Оранжевый' />
                <label htmlFor='EFA638' className={`${styles.colorLabel} ${styles.orangeCircle}`} />

                <input type='radio' id='rainbow' name='color' className={styles.circle} value='Все цвета' />
                <label htmlFor='rainbow' className={`${styles.colorLabel} ${styles.rainbowCircle}`} />
            </section>
        )
    }
}
