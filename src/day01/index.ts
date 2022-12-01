import run from "aocrunner";
import lodash from 'lodash'
const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const groupsAsString = input.trim().split('\n\n')
  const groups = groupsAsString.map(_ => _.split('\n').map(_ => parseInt(_.trim())))
  const calSums = groups.map(_ => lodash.sum(_))
  calSums.sort()
  return (calSums.pop())
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const groupsAsString = input.trim().split('\n\n')
  const groups = groupsAsString.map(_ => _.split('\n').map(_ => parseInt(_.trim())))
  const calSums = groups.map(_ => lodash.sum(_))
  calSums.sort()
  return (lodash.sum(calSums.slice(-3)))
};

run({
  part1: {
    tests: [
      {
        input: `1000
        2000

        2000
        3000
        `,
        expected: 5000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `1000
        2000

        2000
        3000

        1000
        `,
        expected: 9000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
