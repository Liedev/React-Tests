import * as React from 'react';
import IconName from '../enum/iconName';
import { Dictionary } from '../type/DictionaryData';
import { FaMoon, FaArrowLeft } from 'react-icons/fa';

const moon = <FaMoon color='white' />
const backArrow = <FaArrowLeft color='white' />

class IconProvider {
    icons: Dictionary<JSX.Element>;
    constructor() {
        this.icons = {};
        this.icons[IconName.MOON] = moon;
        this.icons[IconName.BACKARROW] = backArrow;
    }

    getImage(name: IconName) {
        const img = this.icons[name];
        return img;
    }
}

export default new IconProvider();