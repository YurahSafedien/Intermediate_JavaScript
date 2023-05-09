const str = "Breakfast at 09:00 in the room 123:456";
const regex = /\b\d{2}:\d{2}\b/g;
const time = str.match(regex);

console.log(time);