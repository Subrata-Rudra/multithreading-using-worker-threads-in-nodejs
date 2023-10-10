const jobs = Array.from({ length: 100 }, () => 1e9);

console.log("CPU-intensive job without using Worker Thread");

const t1 = performance.now();

let count = 0;
for (let job of jobs) {
  for (let i = 0; i < job; i++) {
    count++;
  }
}
console.log("Sum is " + count);
const t2 = performance.now();

console.log(`The process took ${t2 - t1} millisecond`);
