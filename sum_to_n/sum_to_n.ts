function sum_to_n_a(n: number): number {
  if (n < 0) return n;

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}

function sum_to_n_b(n: number): number {
  if (n < 0) return n;

  let sum = 0;
  do {
    sum += n;
    n--;
  } while (n > 0);

  return sum;
}

function sum_to_n_c(n: number): number {
  if (n <= 0) return n;

  return (n * (n + 1)) / 2;
}
