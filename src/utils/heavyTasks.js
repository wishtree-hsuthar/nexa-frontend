let cache = {};
let hugeArray = [];

export function heavyComputation(arr) {
  let result = [];

  // ❌ O(n^2)
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        result.push(arr[i]);
      }
    }
  }

  cache[Math.random()] = result; // ❌ unbounded growth
  return result;
}

export function generateData() {
  for (let i = 0; i < 200000; i++) {
    hugeArray.push({
      id: i,
      value: Math.random(),
    });
  }
  return hugeArray;
}

export function regexDos(input) {
  // ❌ ReDoS vulnerability
  const regex = /(a+)+$/;
  return regex.test(input);
}

export function blockMainThread() {
  let x = 0;

  for (let i = 0; i < 700000000; i++) {
    x += i;
  }

  return x;
}