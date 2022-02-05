const dying = () => {
	const array = [
		'It is sad that I must go, but I will see you when I come back alive!',
		'See ya laters!',
		// '',
	];
	return array[Math.floor(Math.random() * array.length)];
};

module.exports = {
	dying: dying,
};