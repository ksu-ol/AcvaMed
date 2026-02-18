Fancybox.bind("[data-fancybox]", {});
document.addEventListener('DOMContentLoaded', () => {

// маски
document.querySelectorAll('input[type="tel"]').forEach(phoneInput => {
  phoneInput.addEventListener('input', function () {
    let input = this.value.replace(/\D/g, '');

    if (!input) {
      this.value = '';
      return;
    }

    if (input[0] === '8') input = '7' + input.slice(1);
    if (input[0] !== '7') input = '7' + input;

    let formatted = '+7';

    if (input.length > 1) formatted += ' ' + input.substring(1, 2);
    if (input.length > 2) formatted += input.substring(2, 4);
    if (input.length > 4) formatted += '-' + input.substring(4, 7);
    if (input.length > 7) formatted += '-' + input.substring(7, 9);
    if (input.length > 9) formatted += '-' + input.substring(9, 11);

    this.value = formatted;
  });
});


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


    //бургер меню
   const burgerMenu = document.querySelector('.header__burger');
const headerBottom = document.querySelector('.header__bottom');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    headerBottom.classList.toggle('active');

    
    document.body.classList.toggle('burger-lock');
    document.documentElement.classList.toggle('burger-lock');
});


		// меню на мобилке
   const navButtons = document.querySelectorAll(".header__menu-item");

navButtons.forEach(btn => {
    const sublist = btn.querySelector(".header__dropdown");
    if (!sublist) return; 

    const arrow = btn.querySelector(".header__menu-arrow");
    const link = btn.querySelector(".header__menu-link");

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

    if (arrow) {
        arrow.addEventListener("click", toggleFirstLevel);
    }

    if (link) {
        link.addEventListener("click", (e) => {
            if (window.innerWidth >= 1024) return;
            e.preventDefault();
            toggleFirstLevel();
        });
    }

    const subArrows = sublist.querySelectorAll(".header__menu-arrow");

    subArrows.forEach(subArrow => {
        const subLink = subArrow.previousElementSibling;
        const subSublist = subArrow.nextElementSibling;

        const toggleSecondLevel = (e) => {
            if (e) e.stopPropagation();

            subArrow.classList.toggle("active");
            if (subLink) subLink.classList.toggle("active");

            if (subArrow.classList.contains("active")) {
                subSublist.style.maxHeight = subSublist.scrollHeight + "px";
            } else {
                subSublist.style.maxHeight = null;
            }

            sublist.style.maxHeight = sublist.scrollHeight + "px";
        };

        subArrow.addEventListener("click", toggleSecondLevel);

        if (subLink) {
            subLink.addEventListener("click", (e) => {
                if (window.innerWidth >= 1024) return;
                e.preventDefault();
                toggleSecondLevel();
            });
        }
    });
});




// form

const popupBtns    = document.querySelectorAll('.popup-btn');
const mainPopup    = document.querySelector('.popup');
const successPopup = document.querySelector('.popup-success');
const errorPopup   = document.querySelector('.popup-error');
const allForms     = document.querySelectorAll('.form__wrap');

function lockBody() { document.body.classList.add('popup-lock'); document.documentElement.classList.add('popup-lock'); }
function unlockBody() { document.body.classList.remove('popup-lock'); document.documentElement.classList.remove('popup-lock'); }


popupBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        mainPopup.classList.add('popup_opened');
        lockBody();
    });
});


if (mainPopup ) {
    mainPopup .querySelector('.popup__close').addEventListener('click', () => {
        mainPopup .classList.remove('popup_opened');
        unlockBody();
    });
}
if (successPopup) {
    successPopup.querySelectorAll('.popup__close, .popup-success__button').forEach(el => {
        el.addEventListener('click', () => {
            console.log('Закрываем success');
            successPopup.classList.remove('popup_opened');
            unlockBody();
        });
    });
}
if (errorPopup) {
    errorPopup.querySelectorAll('.popup__close, .popup-error__button').forEach(el => {
        el.addEventListener('click', () => {
            console.log('Закрываем error');
            errorPopup.classList.remove('popup_opened');
            unlockBody();
        });
    });
}

// Обработка формы
allForms.forEach((form, index) => {

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Форма отправлена');

        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        try {

            const response = await fetch(form.action || '/assets/php/handler.php', {
                method: 'POST',
                body: new FormData(form)
            });

            console.log('Статус ответа:', response.status);

            const text = await response.text();
            console.log('Получен текст ответа:', text);

            let data;
            try {
                data = JSON.parse(text);
            } catch(err) {
                console.error('Не удалось распарсить JSON');
                throw new Error('Сервер вернул не JSON');
            }

            console.log('Распарсенные данные:', data);

            if (data.success) {
                console.log('Отправлено');
                form.reset();
                if (mainPopup) mainPopup.classList.remove('popup_opened');
                unlockBody();
                successPopup.classList.add('popup_opened');
                lockBody();
            } else {
                console.log('Заявка отправленна повторно', data.message);
                errorPopup.classList.add('popup_opened');
                lockBody();
            }

        } catch (err) {
            console.error('Заявка отправленна повторно:', err);
            if (errorPopup) {
                errorPopup.classList.add('popup_opened');
                lockBody();
            } else {
                alert('Ошибка отправки');
            }
        } finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    });
});
})