/**
 * This initializes the Page Background Changer on scroll
 * @param {Object} options is the settings for the Menu Builder
 * @param {string} options.selector is the selector for all the sections
 * 								that need to update the background with scroll.
 * @param {string} options.changePoint **Optional** is the scroll percentage that the
 * 								section should reach to trigger the background color update.
 * @param {DOM Element} options.bgEl **Optional** is the DOM Element that whose background
 * 								needs to update	while the browser is scrolled.
 * 								If none passed, then the body Element is used
 *
 * @param {boolean} working is a internal test to ensure there are elements to look for
 * 								when scrolling.
 *
 * @param {string} activeBG is a internal test to ensure there are elements to look for
 * 								when scrolling.
 *
 *
 * @param {function} createMenuLinks creates all menu links and places them into the menu container.
 * @param {function} init Starts the function for the menu.
 *
 * Here is a list of options to imporve the Script
 * @todo [ ] Create a proper todo
 */

class ScrollableBackground {
	constructor (options = {}) {
		this.sel = options.selector || '.js--update-background';
		this.changePoint = options.changePoint || '50%';
		this.bg = {
			el: options.bgEl || document.querySelector('body'),
			curr: null
		};
		this.bgs = [...document.querySelectorAll(this.sel)];
		this.working = this.bgs.length > 0;
		this.activeBG = null;
		this.currentScroll = this.getScrollHeight();
	}

	getScrollHeight() {
		this.currentScroll = window.pageYOffset || window.scrollY;
		return this.currentScroll;
	}

	checkBackgroundSet() {
		let active = null;
		this.getScrollHeight();
		this.bgs.map((el) => {
			if (el.offsetTop >= this.currentScroll) {
				active = el;
			}
			return el;
		});

		if (active) {
			this.setActiveBG(active);
		} else {
			this.setActiveBG(this.bg.color, 'color');
		}
	}

	setActiveBG(el, type) {
		const propType = type || 'element';

		if (propType === 'element') {
			this.activeBG = el;
			this.setBodyBackground(this.activeBG.dataset.bgColor);
		} else if (propType === 'color') {
			this.activeBG = null;
			this.setBodyBackground(el);
		}
	}

	setBodyBackground(color = '#fff;') {
		this.b.style.backgroundColor = color || '#fff';
	}

	init () {
		if (this.working) {
			this.bg.curr = window.getComputedStyle(this.bg.el).backgroundColor;
			this.checkBackgroundSet();
		}
	}
}

export default ScrollableBackground;
