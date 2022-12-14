import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;
const wrapWithArray = (t: Tree): Tree => {
  if (typeof t === 'number')
    return [t]
  else return t
}
type Tree = Tree[] | number
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n\n').map(_ => _.trim().split('\n').map(_ => JSON.parse(_.trim())))
  function rec(left: Tree, right: Tree): number {

    if (typeof left === 'number' && typeof right === 'number') {
      return left - right
    }
    else if (typeof left === 'object' && typeof right === 'object') {
      while (left.length > 0 && right.length > 0) {
        const comp = rec(left.shift(), right.shift())
        if (comp !== 0) {
          return comp
        }
      }
      return left.length - right.length
    }
    else {
      return rec(wrapWithArray(left), wrapWithArray(right))
    }

  };

  // console.log(rec(input[0][0], input[0][1]))
  let ans = 0
  input.forEach(([left, right], i) => {
    if (rec(left, right) < 0) {
      ans += i + 1
    }
  })


  return ans;
}
const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n\n').map(_ => _.trim().split('\n').map(_ => JSON.parse(_.trim()))).reduce((acc, curr) => [...acc, ...curr], []).concat([[[2]], [[6]]])
  function rec(left: Tree, right: Tree): number {

    if (typeof left === 'number' && typeof right === 'number') {
      return left - right
    }
    else if (typeof left === 'object' && typeof right === 'object') {
      left = left.slice()
      right = right.slice()
      while (left.length > 0 && right.length > 0) {
        const comp = rec(left.shift(), right.shift())
        if (comp !== 0) {
          return comp
        }
      }
      return left.length - right.length
    }
    else {
      return rec(wrapWithArray(left), wrapWithArray(right))
    }
  };

  input.sort((a, b) => {
    const ans = rec(a, b)
    return ans
  })
  console.log(input)
  const divider1 = input.findIndex(_ => _.length === 1 && _[0].length === 1 && _[0][0] === 2)
  const divider2 = input.findIndex(_ => _.length === 1 && _[0].length === 1 && _[0][0] === 6)

  return (divider1 + 1) * (divider2 + 1);
};

run({
  part1: {
    tests: [
      {
        input: `[1,1,3,1,1]
        [1,1,5,1,1]

        [[1],[2,3,4]]
        [[1],4]

        [9]
        [[8,7,6]]

        [[4,4],4,4]
        [[4,4],4,4,4]

        [7,7,7,7]
        [7,7,7]

        []
        [3]

        [[[]]]
        [[]]

        [1,[2,[3,[4,[5,6,7]]]],8,9]
        [1,[2,[3,[4,[5,6,0]]]],8,9]`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `[1,1,3,1,1]
        [1,1,5,1,1]

        [[1],[2,3,4]]
        [[1],4]

        [9]
        [[8,7,6]]

        [[4,4],4,4]
        [[4,4],4,4,4]

        [7,7,7,7]
        [7,7,7]

        []
        [3]

        [[[]]]
        [[]]

        [1,[2,[3,[4,[5,6,7]]]],8,9]
        [1,[2,[3,[4,[5,6,0]]]],8,9]`,
        expected: 140,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
