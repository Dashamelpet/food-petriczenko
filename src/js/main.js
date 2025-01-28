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
    const modalInterval = setTimeout(() => openModal('.modal', modalInterval), 3000);
    console.log('hello1');

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', '.tabheader__item_active');
    calc();
    cards();
    forms();
    modal('[data-modal', '.modal', modalInterval);
    sliders({
        totalWrap: '.offer__slider-wrapper',
        slideWrap: '.offer__slider',
        slideInner: '.offer__slider-inner',
        slider: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalSliders: '#total',
        currentSliders:'#current'
    });
    timer('2025-02-6'); 
});