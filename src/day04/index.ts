import run from "aocrunner";
import lodash from 'lodash'
const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n').map(_ => _.trim());
  let _ = input.map(_ => _.split(',').map(_ => _.split('-'))).map(([a, b]) => ([...a, ...b]))
  // console.log(_)
  const sections = _.map(_ => {
    const [l, r, L, R] = _.map(_ => parseInt(_))
    // console.log([l, r, L, R])
    if ((l <= L && R <= r) || (L <= l && r <= R)) {
      return 1
    }
    else return 0
  })
  // console.log(sections)
  return lodash.sum(sections);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n').map(_ => _.trim());
  let _ = input.map(_ => _.split(',').map(_ => _.split('-'))).map(([a, b]) => ([...a, ...b]))
  console.log(_)
  const sections = _.map(_ => {
    const [l, r, L, R] = _.map(_ => parseInt(_))
    if (((L <= r) && (R >= l)) || ((l <= R) && (r >= L))) {
      return 1
    }
    else return 0
  })
  return lodash.sum(sections);
};

run({
  part1: {
    tests: [
      {
        input: `2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8
        `,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8
        `,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
