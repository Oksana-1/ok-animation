export const exist = (element) => {
	return typeof element === "undefined" || element === null
		? false
		: element.length !== 0;
};