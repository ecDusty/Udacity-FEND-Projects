/**
 * Watch Inputs on forms,
 * When they are villed, apply class '.js--filled'
 */
const forms = [...document.querySelectorAll('.form')];

function checkInput(input) {
	let inputRequiredMissing = false;
	if (input.attributes.required && (input.value === '' || (input.type === 'checkbox' && !input.checked))) {
		inputRequiredMissing = true;
	} else if (input.type === 'email') {
		const parts = input.value.split('@');
		const partTwo = parts[1] ? parts[1].split('.') : false;

		inputRequiredMissing = !(parts.length === 2);
		inputRequiredMissing = !(partTwo && !inputRequiredMissing ? partTwo.length >= 2 : false);
		inputRequiredMissing = !(partTwo && !inputRequiredMissing ? partTwo[1].length >= 2 : false);
	}

	if (inputRequiredMissing) input.classList.add('js--input-error');
	else input.classList.remove('js--input-error');

	return inputRequiredMissing;
}

function formSuccess(content, notifyEl) {
	const el = document.createElement('div');

	content.remove();

	el.innerHTML = '<p>The form details haven\'t been submitted as the form submit script is still being written. All the best!</p>';
	notifyEl.appendsChild(el);
	notifyEl.classList.remove('hidden');
}

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

	inputs.forEach((input) => {
		input.addEventListener('focusout', () => checkInput(input));
	});

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		notifyEl.classList.add('hidden');
		notifyEl.textContent = '';
		notifyEl.classList.remove('text-danger');


		inputs.forEach((input) => checkInput(input));

		if (!form.querySelector('.js--input-error')) {
			// fetch('', {

			// });
			formSuccess(content, notifyEl);
		} else {
			notifyEl.textContent = '*Please check that all inputs have been filled in correctly';
			notifyEl.classList.add('text-danger');
			notifyEl.classList.remove('hidden');
		}
	});
});
