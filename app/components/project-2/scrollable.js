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

class Scrollable {
	constructor(options) {
		this.settableBG = options ? options.settableBG : '#fff';
		this.b = document.body;
		this.scrolledClassName = 'js--scrolled-menu';
		this.currentHeight = window.pageYOffset || window.scrollY;
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

	toggleMenuOnScroll() {
		if (this.getScrollHeight() > 81 && this.b.className.search(this.scrolledClassName) === -1) {
			this.setBodyClass(this.scrolledClassName);
		} else {
			this.setBodyClass(this.scrolledClassName, true);
		}
	}

	init() {
		document.addEventListener('scroll', () => {
			this.toggleMenuOnScroll();
		});

		this.toggleMenuOnScroll();
	}
}

export default Scrollable;
