/**
 * Watch Inputs on forms,
 * When they are villed, apply class '.js--filled'
 */
const forms = [...document.querySelectorAll('.form')];
forms.forEach((form) => {
	const inputs = [...form.querySelectorAll('input')];
	const textareas = [...form.querySelectorAll('textarea')];
	inputs.forEach((input) => {
		input.addEventListener('input', () => {
			if (input.value !== "" && !input.classList.contains('js--filled')) {
				input.classList.add('js--filled');
			} else if (input.value === "" && input.classList.contains('js--filled')) {
				input.classList.remove('js--filled');
			}
			console.log('event fired')
		});
		console.log('event setup for input')
	});
});