function calc() {
    //Calc

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age,
        ratio = 1.375;

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    };

    function initStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(el => {
            el.classList.remove(activeClass);
            if(localStorage.getItem('sex') === el.getAttribute('id')){
                el.classList.add(activeClass);
            }
            if(localStorage.getItem('ratio') === el.getAttribute('data-ratio')){
                el.classList.add(activeClass);
            }
        })
    };
    initStaticInformation('#gender div', 'calculating__choose-item_active');
    initStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcResult () {
        if(!sex || !ratio || !weight || !height || !age) {
            result.textContent = 0;
            return
        }
        if(sex === 'female') {
            result.textContent = Math.round(( 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    };
    calcResult ();


    function staticInformation (parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(el => {
            el.addEventListener('click', (e) => {
                elements.forEach(el => el.classList.remove(activeClass));
                e.target.classList.add(activeClass);
                
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                calcResult();
            });
            
        })
    };

    staticInformation('#gender', 'calculating__choose-item_active');
    staticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function dinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcResult();
        })

    }
    dinamicInformation('#height');
    dinamicInformation('#weight');
    dinamicInformation('#age');
}

export default calc;