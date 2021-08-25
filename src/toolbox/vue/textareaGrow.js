export const textareaGrow = {
	update(el) {
		textareaGrow.grow(el);
	},

	grow(el) {
		const element = el || this;
		element.style.height = 'inherit';

		// Calculate the height
		const height = element.scrollHeight + 2;

		element.style.height = `${height}px`;

		setTimeout(() => {
			// Get the computed styles for the element
			const computed = window.getComputedStyle(element);
			const paddingBottom = parseInt(computed.getPropertyValue('padding-bottom'), 10);
			const height = parseInt(computed.getPropertyValue('height'), 10);

			const scrollBottom = height + element.scrollTop + paddingBottom;

			if (scrollBottom >= element.scrollHeight) {
				element.scrollTop += paddingBottom + 1;
			}
		}, 1);
	}
};

export default textareaGrow;