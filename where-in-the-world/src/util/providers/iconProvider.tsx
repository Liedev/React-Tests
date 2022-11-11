import * as React from 'react';
import IconName from '../enum/iconName';
import { Dictionary } from '../type/DictionaryData';
import { FaMoon, FaArrowLeft, FaSearch, FaSun } from 'react-icons/fa';

const moon = <FaMoon />
const backArrow = <FaArrowLeft />
const loop = <FaSearch />
const sun = <FaSun />

class IconProvider {
    icons: Dictionary<JSX.Element>;
    constructor() {
        this.icons = {};
        this.icons[IconName.MOON] = moon;
        this.icons[IconName.BACKARROW] = backArrow;
        this.icons[IconName.LOOP] = loop;
        this.icons[IconName.SUN] = sun;
    }

    getImage(name: IconName) {
        const img = this.icons[name];
        return img;
    }
}

export default new IconProvider();