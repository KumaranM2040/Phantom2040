console.log("Import './lib/math'");
export { pi } from "./math.js";
console.log("Import './lib/math-plus-plus'");
export { e } from "./math-plus-plus.js";


console.log("Import './lib/math-plus-plus'");
import { goldenRatio } from "./math-plus-plus.js";
const pythagoras = 1.414213562373095;
export { goldenRatio, pythagoras };
console.log("Loaded lib/math-constants-only.js");
