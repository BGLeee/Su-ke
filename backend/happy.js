const crypto = require("crypto");
let token = "32dd0224ec64b91a8ffe48d449114c6f16aaa13c";

let cry1 = 0;
let cry2 = 0;

cry1 = crypto.createHash("sha256").update(token).digest("hex");
cry2 = crypto.createHash("sha256").update(token).digest("hex");
console.log("cry 1:" + cry1);
console.log("cry 2:" + cry2);
