/**
 * Watch Inputs on forms,
 * When they are villed, apply class '.js--filled'
 */
const forms = [...document.querySelectorAll('.form')];

// function check

forms.forEach((form) => {
	const inputs = [...form.querySelectorAll('input'), ...form.querySelectorAll('textarea')];
	inputs.forEach((input) => {
		input.addEventListener('input', () => {
			if (input.value !== '' && !input.classList.contains('js--filled')) {
				input.classList.add('js--filled');
			} else if (input.value === '' && input.classList.contains('js--filled')) {
				input.classList.remove('js--filled');
			}
		});
	});

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		let requiredMissing = false;

		inputs.forEach((input) => {
			if (input.attributes.required && (input.value === '' || !input.checked)) {
				input.classList.add('js--input-error');
				requiredMissing = true;
			} else if (input.type === 'email') {

			}
		});

		if (!requiredMissing) {
			fetch('', {

			});
		}
	});
});
