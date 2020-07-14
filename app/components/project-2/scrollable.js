/**
 * This initializes the Scrollable functionality
 * @param {Object} options is the settings for the Menu Builder
 * @param {string} options.headerSelector is the class that all the Headers
 * 								that need to be in the dynamically created menu.
 * @param {string} options.mContainer is the ID for the menu container.
 * @param {number} options.speed is the milliseconds to scroll to each header.
 *
 * @param {function} createMenuLinks creates all menu links and places them into the menu container.
 * @param {function} init Starts the function for the menu.
 *
 * Here is a list of options to imporve the Script
 * @todo [ ] Improve scroll function, as current one is experimental, and won't work for IE.
 */

import HeadersMenu from './menu-builder';
// import ScrollableBackground from './background-charger';

class Scrollable {
	constructor(options) {
		this.settableBG = options ? options.settableBG : '#fff';
		this.b = document.body;
		this.className = {
			scrolled: 'js--scrolled-menu',
			backToTop: 'js--backtotop',
			backToTopTrig: 'js--backtotop-triggered',
			backToTopStatic: 'js--backtotop-footer'
		};
		this.currentHeight = window.pageYOffset || window.scrollY;

		// Back to top functionality
		this.el = {
			footer: document.querySelector('footer'),
			backToTop: document.querySelector(`.${this.className.backToTop}`)
		};

		this.headMenuBuilder = new HeadersMenu({
			headers: '.js--headers-menu-item',
			mContainer: '.js--headers-menu'
		});

		// this.scrollableBackground = new ScrollableBackground({
		// 	selector: '.js--scroll-background'
		// });
	}

	setBodyClass(cssClass, remove) {
		if (!remove) {
			this.b.classList.add(cssClass);
		} else {
			this.b.classList.remove(cssClass);
		}
	}

	getScrollHeight() {
		this.currentHeight = window.pageYOffset || window.scrollY;
		return this.currentHeight;
	}

	toggleBackToTop() {
		// Check scroll positon, of past header height, show BTP button
		if (this.getScrollHeight() > 100) {
			if (this.b.className.search(this.className.backToTopTrig) === -1) {
				this.setBodyClass(this.className.backToTopTrig);
			}
		} else {
			this.setBodyClass(this.className.backToTopTrig, true);
		}

		// Check scroll position of browser, if BTP aligns with footer, set class to static
		if (this.getScrollHeight() + window.innerHeight >= this.el.footer.offsetTop) {
			this.setBodyClass(this.className.backToTopStatic);
		} else {
			this.setBodyClass(this.className.backToTopStatic, true);
		}
	}

	setupBackToTop() {
		this.el.backToTop.addEventListener('click', (e) => {
			e.preventDefault();
			if (navigator.userAgent.toLowerCase().indexOf('safari') !== -1 && navigator.userAgent.toLowerCase().indexOf('chrome') === -1) {
				window.scroll(0, 0);
			} else {
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
			}
		});
	}

	toggleMenuOnScroll() {
		if (this.getScrollHeight() > 81) {
			if (this.b.className.search(this.className.scrolled) === -1) {
				this.setBodyClass(this.className.scrolled);
			}
		} else {
			this.setBodyClass(this.className.scrolled, true);
		}
	}

	init() {
		document.addEventListener('scroll', () => {
			this.toggleMenuOnScroll();
			if (this.el.backToTop) {
				this.toggleBackToTop();
			}

			if (this.headMenuBuilder.setupCheck()) {
				this.headMenuBuilder.checkHeadersScrolled();
			}

			// if (this.scrollableBackground.working) {
			// 	this.scrollableBackground.checkBackgroundSet();
			// }
		});

		this.toggleMenuOnScroll();

		if (this.el.backToTop) {
			this.toggleBackToTop();
			this.setupBackToTop();
		}

		// Start header menu builder
		this.headMenuBuilder.init();

		// Start Background builder
		// this.scrollableBackground.init();
	}
}

export default Scrollable;
