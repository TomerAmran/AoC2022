import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  for (let i = 0; i < input.length - 4; i++) {
    console.log(i, new Set(input.slice(i, i + 4)))
    if (new Set(input.slice(i, i + 4)).size === 4) {
      return i + 4
    }
  }
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  // console.log(input.length)
  for (let i = 0; i < input.length - 14; i++) {
    // console.log(new Set(input.slice(i, i + 14)))
    if (new Set(input.slice(i, i + 14)).size === 14) {
      return i + 14
    }
  }
};

run({
  part1: {
    tests: [
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 19,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: falseo,
});
