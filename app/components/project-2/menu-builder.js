/* eslint-disable no-restricted-globals */
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
		this.headersMenu = [];
		this.headersMenuEl = null;
		this.mContainer = options.mContainer ? document.querySelector(options.mContainer) : document.querySelector('.js--headers-menu');

		this.activeSection = '';

		this.class = {
			scrolled: 'js--headers-menu-item--scrolled',
			sectionScrolled: 'Article__Section--scrolled',
			headerMenuActive: 'HeadersMenu__Item--active'
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

	// setHeaderMenuScrolled() {
	// 	if (this.headersMenuEl.offsetTop <= this.getScrollHeight()) {

	// 	}
	// }

	setActiveHeaderMenu(i) {
		const oldActive = this.headersMenu.filter(
			item => item.className.search(this.class.headerMenuActive) >= 0
		);

		oldActive.forEach(
			item => item.classList.remove(this.class.headerMenuActive)
		);

		if (!i === 'false') {
			this.headersMenu[i].classList.add(this.class.headerMenuActive);
		}
	}

	checkHeadersScrolled() {
		const scrollHeight = this.getScrollHeight() + (window.innerHeight * 0.2);
		let newScrolledSection = null;
		let index = 0;

		this.headers.forEach((header, i) => {
			const section = header.parentElement;

			if (section.offsetTop <= scrollHeight) {
				newScrolledSection = section;
				section.dataset.scrolled = 'true';
				index = i;
			} else {
				section.dataset.scrolled = 'false';
				section.classList.remove(this.class.sectionScrolled);

				if (i === 0) {
					this.setActiveHeaderMenu('false');
				}
			}
		});

		if (this.scrolledSection !== newScrolledSection) {
			if (this.scrolledSection) {
				this.scrolledSection.classList.remove(this.class.sectionScrolled);
			}

			this.scrolledSection = newScrolledSection;
			if (newScrolledSection) newScrolledSection.classList.add(this.class.sectionScrolled);
			this.setActiveHeaderMenu(index);
		}
	}

	createMenuLinks() {
		// Create the parent list element
		const list = document.createElement('ul');
		list.className = 'HeadersMenu__List js-headers-menu-list';

		this.headersMenu = this.headers.map((el) => {
			const linkEl = document.createElement('li');
			linkEl.textContent = el.textContent;
			linkEl.classList.add('HeadersMenu__Item');

			linkEl.addEventListener('click', (e) => {
				e.preventDefault();
				el.scrollIntoView({ behavior: 'smooth' });
			});

			list.appendChild(linkEl);
			return linkEl;
		});

		this.mContainer.appendChild(list);
		this.mContainer.classList.remove('hidden');
		this.headersMenuEl = list;
	}

	init() {
		if (this.setupCheck()) {
			this.createMenuLinks();

			window.addEventListener('DOMContentLoaded', () => {
				this.checkHeadersScrolled();
			});
		}
	}
}

export default HeadersMenuBuilder;
