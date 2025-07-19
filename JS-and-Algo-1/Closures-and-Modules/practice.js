import mathOperations from "./mathUtils.js";
import StringFormatter from "./StringFormatter.js";
import bankModule from "./bankModule.js";
import SongsManager from "./SongsManager.js";

const math = mathOperations();

console.log(math.add(2, 3));
console.log(math.sub(10, 4));
console.log(math.mult(3, 7));
console.log(math.div(20, 4));
console.log(math.add(13, 29));
console.log(math.mult(1.75, 24));
console.log(math.mult(7, math.div(36, 6)));

//Ex1
const formatter = StringFormatter();

console.log(formatter.capitalizeFirst("dorothy")); //should return Dorothy
console.log(formatter.toSkewerCase("blue box"));

//Ex2
const bank = bankModule();
bank.deposit(200);
bank.deposit(250);
bank.showBalance();

//Ex3
const songsManager = SongsManager();

songsManager.add("sax", "https://www.youtube.com/watch?v=3JZ4pnNtyxQ");
songsManager.add("how long", "https://www.youtube.com/watch?v=CwfoyVa980U");
songsManager.add("ain't me", "https://www.youtube.com/watch?v=D5drYkLiLI8");
songsManager.get("sax");
