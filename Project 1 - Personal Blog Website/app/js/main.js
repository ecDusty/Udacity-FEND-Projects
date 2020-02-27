/* globals */
/**
 * Imported features
 */

// Lazyload (npm install lazysizes)
import 'lazysizes';


// Swiper (npm install swiper)
// import 'swiper/js/swiper';

/**
 * Build Components
 */

import '../components/header/header';
import '../components/forms/forms';
import '../components/swiper/favorites';


// support for background images lazyload
document.addEventListener('lazybeforeunveil', (e) => {
	e.target.style.backgroundImage = e.target.getAttribute('data-bg')
		? `url(${e.target.getAttribute('data-bg')})`
		: '';
});
