/**
 * Watch Inputs on forms,
 * When they are villed, apply class '.js--filled'
 */
const forms = [...document.querySelectorAll('.form')];

// function check

forms.forEach((form) => {
	const inputs = [...form.querySelectorAll('input'), ...form.querySelectorAll('textarea')];
	const content = form.querySelector('.js--form-content');
	const notifyEl = form.querySelector('.js--form-notify');
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
				requiredMissing = true;
			} else if (input.type === 'email') {
				const parts = input.value.split('@');
				const partTwo = parts[1] ? parts[1].split('.') : false;

				requiredMissing = !(parts.length === 2);
				requiredMissing = !(partTwo ? partTwo.length >= 2 : false);
				requiredMissing = !(partTwo && !requiredMissing ? partTwo[1].length >= 2 : false);
			}

			if (requiredMissing) input.classList.add('js--input-error');
		});

		if (!requiredMissing) {
			// fetch('', {

			// });
			notifyEl.innerHTML = '<p>The form details haven\'t been submitted as the form submit script is still being written. All the best!</p>';
		}
	});
});
