export const actions = {
	publish: async (event) => {
		event.request.formData().then((formData) => {
			const data = formData;
			const tosAccepted = data.get('tosAccepted');
			const placeId = data.get('placeId');

			console.log(placeId);
		});
	}
};
