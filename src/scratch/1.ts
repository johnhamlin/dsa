type Outcome = [number, number];

// Now let's define the entire sample space Ω (capital Omega).
// This is the set of ALL possible outcomes when rolling two dice.
function createSampleSpace(): Outcome[] {
  const sampleSpace: Outcome[] = [];

  // Generate all 36 possible pairs
  for (let firstDie = 1; firstDie <= 6; firstDie++) {
    for (let secondDie = 1; secondDie <= 6; secondDie++) {
      sampleSpace.push([firstDie, secondDie]);
    }
  }

  return sampleSpace;
}

// This is our random variable X!
// It's a function that takes an outcome and returns a number.
// In this case, it returns the sum of the two dice.
function X(outcome: Outcome): number {
  const [firstDie, secondDie] = outcome;
  return firstDie + secondDie;
}

// This is the probability function p(i).
// For fair dice, every outcome has equal probability: 1/36
function p(outcome: Outcome): number {
  return 1 / 36;
}

// Now here's the expectation calculation: E[X] = Σ p(i) · X(i)
// We sum over all outcomes i in the sample space
function calculateExpectation(): number {
  const sampleSpace = createSampleSpace();

  let expectation = 0;

  // This loop is the Σ (sigma/summation) symbol in the formula!
  for (const i of sampleSpace) {
    // For each outcome i:
    // - p(i) is the probability of this outcome happening
    // - X(i) is the value our random variable assigns to this outcome
    // - We multiply them and add to our running total

    const probability_of_i = p(i);
    const value_of_X_at_i = X(i);

    expectation += probability_of_i * value_of_X_at_i;

    // You could write this more compactly as:
    // expectation += p(i) * X(i);
  }

  return expectation;
}

// Let's run it and see what we get!
const result = calculateExpectation();
console.log(`E[X] = ${result}`); // Should print: E[X] = 7

// Let's also trace through a few iterations to see what's happening
function demonstrateCalculation(): void {
  const sampleSpace = createSampleSpace();

  console.log("Let's trace through the first few outcomes:\n");

  for (let idx = 0; idx < 5; idx++) {
    const i = sampleSpace[idx];
    console.log(`Outcome i = (${i[0]}, ${i[1]})`);
    console.log(`  X(i) = ${X(i)}  (the sum of the dice)`);
    console.log(`  p(i) = ${p(i)}  (probability of this outcome)`);
    console.log(
      `  p(i) · X(i) = ${p(i) * X(i)}  (contribution to expectation)`,
    );
    console.log();
  }

  console.log('... (31 more outcomes) ...\n');
  console.log('When we add all 36 terms together, we get E[X] = 7');
}

demonstrateCalculation();
