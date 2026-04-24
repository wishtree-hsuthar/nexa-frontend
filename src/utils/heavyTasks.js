// global state (memory leak)
let cache = [];
let bigData = [];

export function heavyComputation(arr) {
  let result = [];

  // O(n^2)
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        result.push(arr[i]);
      }
    }
  }

  cache.push(result); // leak
  return result;
}

export function generateData() {
  // unbounded memory growth
  for (let i = 0; i < 100000; i++) {
    bigData.push({
      id: i,
      value: Math.random(),
    });
  }
  return bigData;
}

export function blockMainThread() {
  let count = 0;

  // CPU blocking
  for (let i = 0; i < 500000000; i++) {
    count += i;
  }

  return count;
}

// inefficient duplicate logic
export function findDuplicates(arr) {
  let duplicates = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        duplicates.push(arr[i]);
      }
    }
  }

  return duplicates;
}