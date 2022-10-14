const summon = () => {
  const array = [
    "I'm alive!",
    "Ready to help!",
    "Hello!",
    "What is my purpose?",
    "Was I alive? ",
    "What up?",
    // '',
  ];
  return array[Math.floor(Math.random() * array.length)];
};

module.exports = {
  summon: summon,
};
