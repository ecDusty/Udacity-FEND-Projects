/* global Swiper */

const swiper = new Swiper('.swiper-container', {
	// Default parameters
	slidesPerView: 1,
	spaceBetween: 15,
	watchSlidesProgress: true,
	watchSlidesVisibility: true,
	watchOverflow: true,
	centeredSlides: true,

	// Animation
	effect: 'coverflow',
	// fade
	fadeEffect: {
		crossFade: true
	},

	// coverflow
	coverflowEffect: {
		rotate: 30,
		slideShadows: false,
	},

	// flip
	flipEffect: {
		rotate: 30,
		slideShadows: false,
	},

	// Lazy load images
	preloadImages: false,
	lazy: {
		loadPrevNext: true,
		loadOnTransitionStart: true
	},

	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	// Responsive
	breakpoints: {
		480: {
			slidesPerView: 1,
			spaceBetween: 20
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 30,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 2,
				loadOnTransitionStart: true
			}
		},
		1050: {
			slidesPerView: 3,
			spaceBetween: 30,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 3,
				loadOnTransitionStart: true
			}
		},
		1350: {
			slidesPerView: 4,
			spaceBetween: 30,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 3,
				loadOnTransitionStart: true
			}
		}
	}
});
