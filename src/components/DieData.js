const uniqueId = Math.floor(Math.random() * 9999) * Date.now().toString();

const dieData = [
  {
    value: 1,
    url: "../dice-1.svg",
    isHeld: false,
  },
  {
    value: 2,
    url: "../dice-2.svg",
    isHeld: false,
  },
  {
    value: 3,
    url: "../dice-3.svg",
    isHeld: false,
  },
  {
    value: 4,
    url: "../dice-4.svg",
    isHeld: false,
  },
  {
    value: 5,
    url: "../dice-5.svg",
    isHeld: false,
  },
  {
    value: 6,
    url: "../dice-6.svg",
    isHeld: false,
  },
];

export default dieData;
