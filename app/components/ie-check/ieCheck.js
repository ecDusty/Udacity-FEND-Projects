/**
 * Check if the user is visiting the site via Internet Explorer.
 *
 * This script was built off of inspiration from W3 Docs was to detect IE
 * found here: https://www.w3docs.com/snippets/javascript/how-to-detect-internet-explorer-in-javascript.html
 */
const createWarningEl = () => {
	const warnElement = document.createElement('div');
	const contentEl = document.createElement('div');
	contentEl.className = 'p-4 my-4 warning-browser-content text-center';
	warnElement.classList.add('warning-browser-version-window');

	contentEl.innerHTML = `
		<h2>Warning:</h2>
		<h1>Internet Explorer Detected</h1>
		<p>We see that you are using Internet Explorer as your browser. This website will not work with Internet Explorer, and we recommend using either: Edge, Firefox, or Chrome.</p>
		<h4>Download links for each browser</h4>
		<ul class="warning-browser-list">
			<li class="warning-browser-list-item">
				<a href="https://www.microsoft.com/en-us/edge" rel="noopenner nofollow noreferrer external" target="_blank">
					<img src="/app/img/microsoftedgenewlogo.jpg" alt="Edge browser logo with download link">
				</a>
			</li>
			<li class="warning-browser-list-item">
				<a href="https://www.mozilla.org/en-US/firefox/new/" rel="noopener nofollow noreferrer external" target="_blank">
					<img src="/app/img/firefox-logo.png" alt="Edge browser logo with download link">
				</a>
			</li>
			<li class="warning-browser-list-item">
				<a href="https://www.google.com/chrome/" rel="noopenner nofollow noreferrer external" target="_blank">
					<img src="/app/img/google-chrome.png" alt="Edge browser logo with download link">
				</a>
			</li>
		</ul>
		`;

	warnElement.appendChild(contentEl);
	return warnElement;
};

const detectIE = () => {
	// First check if browser is any version of IE, the run error popup
	const uA = window.navigator.userAgent;
	const msie = uA.indexOf('MSI ') > 0; // IE 10 and older check
	const trident = uA.indexOf('Trident/') > 0; // IE 11 check

	if (msie || trident) {
		document.body.classList.add('warning-browser-version');
		document.body.appendChild(createWarningEl());
	}
};

detectIE();
