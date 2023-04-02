// "use strict";
// setInterval(() => {
// 	const time = document.querySelector("#time");

// 	let date = new Date();
// 	let hours = date.getHours();
// 	let minutes = date.getMinutes();
// 	let seconds = date.getSeconds();
// 	let day_night = "AM";

// 	if (hours > 12) {
// 		day_night = "PM";
// 		hours = hours - 12;
// 	}

// 	if (hours < 10) {
// 		hours = "0" + hours;
// 	}

// 	if (minutes < 10) {
// 		minutes = "0" + minutes;
// 	}
// 	if (seconds < 10) {
// 		seconds = "0" + seconds;
// 	}

// 	time.textContent = hours + ":" + minutes + ":" + seconds + " " + day_night;
// });

////////////alternate and short
setInterval(() => {
	const time = document.querySelector("#time");
	const date = new Date();
	const hours = date.getHours() % 12 || 12;
	const minutes = ("0" + date.getMinutes()).slice(-2);
	const seconds = ("0" + date.getSeconds()).slice(-2);
	const day_night = date.getHours() >= 12 ? "PM" : "AM";

	time.textContent = `${hours}:${minutes}:${seconds} ${day_night}`;
});
