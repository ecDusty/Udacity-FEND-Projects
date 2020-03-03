// support for background images lazyload
document.addEventListener('lazybeforeunveil', (e) => {
	const dataBG = e.target.getAttribute('data-bg');
	if (dataBG) { e.target.style.backgroundImage = `url(${dataBG})`; }
});
