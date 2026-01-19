import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const markCommit = (x, y) => {
	const date = moment()
		.subtract(1, "y")
		.add(1, "d")
		.add(x, "w")
		.add(y, "d")
		.format();

	const data = {
		date: date,
	};

	jsonfile.writeFile(path, data, () => {
		simpleGit().add([path]).commit(date, { "--date": date }).push();
	});
};

// const makeCommits = (n) => {
// 	if (n === 0) return simpleGit().push();
// 	const x = random.int(0, 54);
// 	const y = random.int(0, 6);
// 	const date = moment()
// 		.subtract(1, "days")
// 		.add(1, "d")
// 		.add(x, "w")
// 		.add(y, "d")
// 		.format();

// 	const data = {
// 		date: date,
// 	};
// 	console.log(date);
// 	jsonfile.writeFile(path, data, () => {
// 		simpleGit()
// 			.add([path])
// 			.commit(date, { "--date": date }, makeCommits.bind(this, --n));
// 	});
// };

// makeCommits(10);

const makeCommits = (n) => {
	if (n === 0) return simpleGit().push();

	// Generate random date within the desired range
	const startDate = moment("2024-11-30"); // Start date (year-month-date)
	const endDate = moment("2024-12-01"); // End date
	const randomDate = moment(
		startDate.valueOf() +
			Math.random() * (endDate.valueOf() - startDate.valueOf()),
	).format();

	const data = {
		date: randomDate,
	};

	console.log(randomDate); // Log the generated date
	jsonfile.writeFile(path, data, () => {
		simpleGit()
			.add([path])
			.commit(
				randomDate,
				{ "--date": randomDate },
				makeCommits.bind(this, --n),
			);
	});
};

makeCommits(3); // Adjust `n` as needed
