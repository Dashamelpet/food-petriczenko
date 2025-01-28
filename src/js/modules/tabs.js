function tabs (tabItem, tabContent, tabParent, activeClass) {
    const tabs = document.querySelectorAll(tabItem),
          tabsContent =document.querySelectorAll(tabContent),
          tabsParent = document.querySelector(tabParent);

    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach((item) => {
            item.classList.remove(activeClass.slice(1));
        })
    }
    hideTabContent();
    
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass.slice(1));
    }
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })
}

export default tabs;