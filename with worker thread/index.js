const { Worker } = require("worker_threads");

// To get user input in terminal we use the readline object
const readline = require("readline");
// create interface for input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const jobs = Array.from({ length: 100 }, () => 1e9);

function chunkify(array, n) {
  let chunks = [];
  for (let i = n; i > 0; i--) {
    chunks.push(array.splice(0, Math.ceil(array.length / i)));
  }
  return chunks;
}

function run(jobs, concurrentWorkers) {
  const chunks = chunkify(jobs, concurrentWorkers);

  const t_init = performance.now();
  let completedWorkers = 0;

  chunks.forEach((data, i) => {
    const worker = new Worker("./worker.js");

    worker.postMessage(data);

    worker.on("message", () => {
      console.log(`Worker Thread --> ${i} is done`);
      completedWorkers++;
      if (completedWorkers === concurrentWorkers) {
        console.log(
          `${concurrentWorkers} worker threads took ${
            performance.now() - t_init
          } millisecond`
        );
        process.exit();
      }
    });
  });
}

console.log(
  "---------------CPU-intensive job using Worker Thread---------------"
);

let threads = 0;

rl.question(
  "Enter the number of threads you want to use to execute this task:\n",
  function (val) {
    threads = parseInt(val);
    // Here we are calling the run() function
    run(jobs, threads);
  }
);
