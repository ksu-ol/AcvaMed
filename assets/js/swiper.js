(() =>{
// detox

const detoxSlider = document.querySelectorAll('.detox__slider');

		if (detoxSlider.length > 0) {
			const promotionsSlider = new Swiper('.detox__slider', {
            slidesPerView: 1.2,
            spaceBetween: 10,
            breakpoints: {
                1600: {
                    slidesPerView: 5,
                    spaceBetween: 16,
                },
                1250: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
                940: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                550: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
            },
			})
		}


// reviews

const reviewsSlider = document.querySelectorAll('.reviews__slider');

	if (reviewsSlider.length > 0) {
    const reviewsSlider = new Swiper('.reviews__slider', {
        slidesPerView: 1.1,
            spaceBetween: 10,
            navigation: {
                nextEl: ".reviews__slider-button-next",
                prevEl: ".reviews__slider-button-prev",
            },
            breakpoints: {
                1200: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                630: {
                    slidesPerView: 2.1,
                    spaceBetween: 10,
                },
            },
    });
}


//doctors

const doctorsSlider = document.querySelectorAll('.doctors__slider');

	if (doctorsSlider.length > 0) {
    const doctorsSlider = new Swiper('.doctors__slider', {
			slidesPerView: 1.2,
            spaceBetween: 10,
            navigation: {
                nextEl: ".doctors__slider-button-next",
                prevEl: ".doctors__slider-button-prev",
            },
            breakpoints: {
                1530: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                560: {
                    slidesPerView: 2.1,
                    spaceBetween: 10,
                },
            },
		}
	)}


	//license
	const licenseSlider = document.querySelectorAll('.licenses__slider');

	if (licenseSlider.length > 0) {
    const licenseSlider = new Swiper('.licenses__slider', {
			slidesPerView: 1.1,
            spaceBetween: 10,
						navigation: {
                nextEl: ".licenses__slider-button-next",
                prevEl: ".licenses__slider-button-prev",
            },
            breakpoints: {
                1600: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                900: {
                    slidesPerView: 3.1,
                    spaceBetween: 10,
                },
                630: {
                    slidesPerView: 2.1,
                    spaceBetween: 10,
                },
            },
		}
	)}
			
	})()