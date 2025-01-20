const e = require("cors");

import tabs from './modules/tabs';
import calc from'./modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import sliders from './modules/sliders';
import timer from './modules/timer';
import {openModal} from './modules/modal';
import {closeModal} from './modules/modal';


window.addEventListener('DOMContentLoaded', () => {
    const modalInterval = setTimeout(() => openModal(modalSelector, modalInterval), 3000);
    console.log('hello1');

    tabs();
    calc();
    cards();
    forms();
    modal('[data-modal', '.modal', modalInterval);
    sliders();
    timer(); 
});