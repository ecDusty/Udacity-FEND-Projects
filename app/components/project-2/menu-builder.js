/**
 * This initializes the Page menu builder
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

class MenuBuilder {
	constructor(options = {}) {
		this.headers = options.headerSelector ? [...document.querySelectorAll(options.headerSelector)] : [...document.querySelectorAll('.js--menu-headers')];
		this.mContainer = options.mContainer ? document.querySelector(options.mContainer) : document.querySelector('.js--menu-container');
		this.speed = options.speed ? options.speed : 450;
	}

	createMenuLinks() {
		this.headers.forEach((el) => {
			const linkEl = document.createElement('li');
			linkEl.textContent = el.dataset.menuText;
			linkEl.addEventListener('click', () => {
				el.scrollIntoView({ behavior: 'smooth' });
			});

			this.mContainer.appendChild(linkEl);
		});
	}

	init() {
		this.createMenuLinks();
	}
}

const buildMenu = new MenuBuilder();
buildMenu.init();
