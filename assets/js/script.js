document.addEventListener('DOMContentLoaded', () => {
	// faq
	document.querySelectorAll('.faq__item').forEach(item => {
    item.addEventListener('click', (e) => {
        const isActive = item.classList.contains('active');
        const button = item.querySelector('.faq__question');
        
        document.querySelectorAll('.faq__item').forEach(el => {
            el.classList.remove('active');
            el.querySelector('.faq__question').setAttribute('aria-expanded', false);
        });
        
        if (!isActive) {
            item.classList.add('active');
            button.setAttribute('aria-expanded', true);
        }
    });
});

//reviews
document.querySelectorAll('.reviews__card-button-more').forEach(btn => {
    btn.addEventListener('click', () => {
        const main = btn.parentElement;
        const card = main.parentElement;
        const text = main.querySelector('.reviews__card-text');
        const collapsedHeight = getComputedStyle(text).getPropertyValue('--collapsed-max-height');

        if (card.classList.contains('is-expanded')) {
            text.style.maxHeight = collapsedHeight;
            btn.textContent = 'Читать далее';
            card.classList.remove('is-expanded');
        } else {
            text.style.maxHeight = `${text.scrollHeight}px`;
            btn.textContent = 'Свернуть';
            card.classList.add('is-expanded');
        }
    });
});

    //burger menu
   const burgerMenu = document.querySelector('.header__burger');
const headerBottom = document.querySelector('.header__bottom');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    headerBottom.classList.toggle('active');

    // Блокируем прокрутку страницы
    document.body.classList.toggle('burger-lock');
    // Иногда ещё и html блокируют (на всякий случай)
    document.documentElement.classList.toggle('burger-lock');
});


		// mobile menu 
    // Функция пересчёта полной высоты (с учётом вложенных списков)
   const navButtons = document.querySelectorAll(".header__menu-item");

navButtons.forEach(btn => {
    const sublist = btn.querySelector(".header__dropdown");
    if (!sublist) return; // Пропустить, если нет подменю (нет arrow и dropdown)

    const arrow = btn.querySelector(".header__menu-arrow");
    const link = btn.querySelector(".header__menu-link");

    // Функция для toggle первого уровня
    const toggleFirstLevel = (e) => {
        if (window.innerWidth >= 1024) return;
        if (e) e.stopPropagation();

        btn.classList.toggle("active");

        if (btn.classList.contains("active")) {
            sublist.style.maxHeight = sublist.scrollHeight + "px";
        } else {
            sublist.style.maxHeight = null;
        }
    };

    // Обработчик на стрелку (если есть)
    if (arrow) {
        arrow.addEventListener("click", toggleFirstLevel);
    }

    // Обработчик на ссылку (preventDefault и toggle)
    if (link) {
        link.addEventListener("click", (e) => {
            if (window.innerWidth >= 1024) return;
            e.preventDefault();
            toggleFirstLevel();
        });
    }

    // Второй уровень аккордеона
    const subArrows = sublist.querySelectorAll(".header__menu-arrow");

    subArrows.forEach(subArrow => {
        const subLink = subArrow.previousElementSibling;
        const subSublist = subArrow.nextElementSibling;

        // Функция для toggle второго уровня
        const toggleSecondLevel = (e) => {
            if (e) e.stopPropagation();

            subArrow.classList.toggle("active");
            if (subLink) subLink.classList.toggle("active");

            if (subArrow.classList.contains("active")) {
                subSublist.style.maxHeight = subSublist.scrollHeight + "px";
            } else {
                subSublist.style.maxHeight = null;
            }

            // Пересчитать высоту родителя (первого уровня)
            sublist.style.maxHeight = sublist.scrollHeight + "px";
        };

        // Обработчик на sub-стрелку
        subArrow.addEventListener("click", toggleSecondLevel);

        // Обработчик на sub-ссылку (preventDefault и toggle)
        if (subLink) {
            subLink.addEventListener("click", (e) => {
                if (window.innerWidth >= 1024) return;
                e.preventDefault();
                toggleSecondLevel();
            });
        }
    });
});
	})