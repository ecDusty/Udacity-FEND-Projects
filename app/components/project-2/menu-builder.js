/**
 * This initializes the Page menu builder
 * @param {Object} options is the settings for the Menu Builder
 * @param {string} options.headerSelector is the class that all the Headers
 * 								that need to be in the dynamically created menu.
 * @param {string} options.mContainer is the ID for the menu container.
 * @param {number} options.speed is the milliseconds to scroll to each header.
 * 								 d**NOT YET IMPLEMENTED**
 *
 * @param {function} createMenuLinks creates all menu links and places them into the menu container.
 * @param {function} init Starts the function for the menu.
 *
 * Here is a list of options to imporve the Script
 * @todo [ ] Improve scroll function, as current one is experimental, and won't work for IE.
 */

class HeadersMenuBuilder {
	constructor(options = {}) {
		this.headers = options.headerSelector ? [...document.querySelectorAll(options.headerSelector)] : [...document.querySelectorAll('.js--headers-menu-item')];
		this.headersTrue = this.headers.length > 0;
		this.mContainer = options.mContainer ? document.querySelector(options.mContainer) : document.querySelector('.js--headers-menu');

		this.class = {
			scrolled: 'heading--sticky-scrolled'
		};
		// this.speed = options.speed ? options.speed : 450;
	}

	setupCheck() {
		return (this.headersTrue !== 0 && this.mContainer);
	}

	getScrollHeight() {
		this.currentHeight = window.pageYOffset || window.scrollY;
		return this.currentHeight;
	}

	checkHeadersScrolled() {
		const self = this;
		const scrollHeight = this.getScrollHeight();

		this.headers.forEach((header) => {
			if (header.offsetTop <= scrollHeight) header.classList.add(self.class.scrolled);
			else header.classList.remove(self.class.scrolled);
		});
	}

	createMenuLinks() {
		// Create the parent list element
		const list = document.createElement('ul');
		list.classList.add('HeadersMenu__List');

		this.headersMenu = this.headers.map((el) => {
			const linkEl = document.createElement('li');
			linkEl.textContent = el.textContent;
			linkEl.classList.add('HeadersMenu__Item');

			linkEl.addEventListener('click', () => {
				el.scrollIntoView({ behavior: 'smooth' });
			});

			list.appendChild(linkEl);
			return linkEl;
		});

		this.mContainer.appendChild(list);
		this.mContainer.classList.remove('hidden');
	}

	init() {
		if (this.setupCheck()) {
			this.createMenuLinks();
			this.checkHeadersScrolled();
		}
	}
}

export default HeadersMenuBuilder;
