
module.exports.ALL_SPECIALITIES = [
    {
        id: 1,
        title: 'Прикладная информатика',
        selected: false,
        key: 'speciality'
    },
    {
        id: 2,
        title: 'Математика и компьютерные науки',
        selected: false,
        key: 'speciality'
    },
    {
        id: 3,
        title: 'Фундаментальная информатика',
        selected: false,
        key: 'speciality'
    }
];

module.exports.ALL_GROUPS = [
    {
        id: 1,
        title: 'ПИ-101',
        selected: false,
        key: 'group'
    },
    {
        id: 2,
        title: 'КН-101',
        selected: false,
        key: 'group'
    },
    {
        id: 3,
        title: 'ФИИТ-101',
        selected: false,
        key: 'group'
    }
];

module.exports.ALL_GENDERS = [
    {
        id: 1,
        title: 'мужской',
        selected: false,
        key: 'gender'
    },
    {
        id: 2,
        title: 'женский',
        selected: false,
        key: 'gender'
    }
];

module.exports.ALL_SORT_KEYS = [
    {
        id: 'name',
        title: 'Имя',
        selected: true,
        key: 'sortKey'
    },
    {
        id: 'rating',
        title: 'Рейтинг',
        selected: false,
        key: 'sortKey'
    },
    {
        id: 'age',
        title: 'Возраст',
        selected: false,
        key: 'sortKey'
    },
    {
        id: 'colorHex',
        title: 'Цвет',
        selected: false,
        key: 'sortKey'
    }
];

module.exports.ALL_COLORS = [
    {
        name: 'Голубой',
        hex: '49C2E8',
        style: 'blueCircle'
    },
    {
        name: 'Красный',
        hex: 'E25B5B',
        style: 'redCircle'
    },
    {
        name: 'Зелёный',
        hex: '83C872',
        style: 'greenCircle'
    },
    {
        name: 'Жёлтый',
        style: 'yellowCircle',
        hex: 'F7FB53',
    },
    {
        name: 'Чёрный',
        hex: '000',
        style: 'blackCircle'
    },
    {
        name: 'Оранжевый',
        hex: 'EFA638',
        style: 'orangeCircle'
    },
    {
        name: 'Все цвета',
        hex: 'rainbow',
        style: 'rainbowCircle'
    }
];

export const SURGE_PATH = 'http://students-react-app.surge.sh/';

