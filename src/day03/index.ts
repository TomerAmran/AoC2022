import run from "aocrunner";
import { assert } from "console";
import lodash from 'lodash'

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const [a, z, A, Z] = ['a', 'z', 'A', 'Z'].map(_ => _.charCodeAt(0))
  const rocks = input.split('\n').map(_ => {
    const rock = [_.slice(0, _.length / 2), _.slice(_.length / 2)]
    assert(rock[0].length === rock[1].length)
    const rockSets = rock.map(_ => _.split(''))
    const [commonChar] = rockSets[0].filter(ch => rockSets[1].includes(ch))
    assert(commonChar)
    const charAscii = commonChar.charCodeAt(0)
    if (a <= charAscii && charAscii <= z) {
      return (charAscii - a) + 1
    }
    else {
      return (charAscii - A) + 1 + 26
    }

  })

  return lodash.sum(rocks);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const [a, z, A, Z] = ['a', 'z', 'A', 'Z'].map(_ => _.charCodeAt(0))
  const rocks = (lodash.chunk(input.split('\n'), 3)).map((_: string[]) => {
    const [first, second, third] = _.map(_ => _.trim().split(''))
    const firstSecond = first.filter(ch => second.includes(ch))
    const [commonChar] = firstSecond.filter(ch => third.includes(ch))
    assert(commonChar)
    const charAscii = commonChar.charCodeAt(0)
    if (a <= charAscii && charAscii <= z) {
      return (charAscii - a) + 1
    }
    else {
      return (charAscii - A) + 1 + 26
    }

  })

  return lodash.sum(rocks);
};

run({
  part1: {
    tests: [
      {
        input: `abRa`,
        expected: 1,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `a
        a
        a`,
        expected: 1,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
