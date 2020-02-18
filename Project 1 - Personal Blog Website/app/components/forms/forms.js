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

		});
	});
});