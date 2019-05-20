console.log("Import './lib/math-plus-plus'");
import exp, { pi, e } from "./lib/math-plus-plus.js";
console.log("e^{π} = " + exp(pi));

console.log("Import './show-constants'");
import './show-constants.js';
console.log("Loaded index.js");