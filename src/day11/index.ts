import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

type Monkey = {
  items: number[],
  operation: (old: number) => number
  test: (curr: number) => boolean
  ifTrue: number,
  ifFalse: number,
  inspectedItems: number
}
// const monkeys: Monkey[] = [
//   {
//     items: [91, 66],
//     operation: (old) => old * 13,
//     ifFalse: 6,
//     ifTrue: 2,
//     test: (curr) => curr % 19 === 0
//   },
//   {
//     items: [78, 97, 59],
//     operation: (old) => old + 7,
//     ifFalse: 0,
//     ifTrue: 3,
//     test: (curr) => curr % 5 === 0
//   },
//   {
//     items: [57, 59, 97, 84, 72, 83, 56, 76],
//     operation: (old) => old + 6,
//     test: (curr) => curr % 11 === 0,
//     ifFalse: 5,
//     ifTrue: 37,
//   },
//   {
//     items: [81, 78, 70, 58, 84],
//     operation: (old) => old + 5,
//     test: (curr) => curr % 17 === 0,
//     ifFalse: 5,
//     ifTrue: 37,
//   },

// ]
const part1 = (rawInput: string) => {
  return
  const input = parseInput(rawInput).split('\n\n').map(_ => _.trim().split('\n').map(_ => _.trim()));

  const monkeys: Monkey[] = input.map(monkey => {
    const items = monkey[1].split(' ').slice(2).map(_ => _.substring(0, 2)).map(_ => parseInt(_))
    const [, op, num] = monkey[2].match(/Operation: new = old (\+|\*{1}) (\d+|old)/)
    const divisibleBy = parseInt(monkey[3].split(' ').pop())
    const ifTrue = parseInt(monkey[4].split(' ').pop())
    const ifFalse = parseInt(monkey[5].split(' ').pop())
    return {
      items,
      operation: (old) => op === '+' ? old + (num === 'old' ? old : parseInt(num)) : old * (num === 'old' ? old : parseInt(num)),
      test: (curr) => curr % divisibleBy === 0,
      ifTrue,
      ifFalse,
      inspectedItems: 0
    }
  })
  Array(20).fill(null).forEach((_) => {
    monkeys.forEach(monkey => {
      monkey.items.forEach(item => {
        item = monkey.operation(item)
        item = Math.floor(item / 3)
        const toMonkey = monkey.test(item) ? monkey.ifTrue : monkey.ifFalse
        monkeys[toMonkey].items.push(item)
      })
      monkey.inspectedItems += monkey.items.length
      monkey.items = []
    })
  })
  const [first, second] = monkeys.map(_ => _.inspectedItems).sort((a, b) => a - b).slice(-2)

  return first * second;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n\n').map(_ => _.trim().split('\n').map(_ => _.trim()));
  console.log(parseInput(rawInput).split('\n'))
  const monkeys: Monkey[] = input.map(monkey => {
    const items = monkey[1].split(' ').slice(2).map(_ => _.substring(0, 2)).map(_ => parseInt(_))
    const [, op, num] = monkey[2].match(/Operation: new = old (\+|\*{1}) (\d+|old)/)
    const divisibleBy = parseInt(monkey[3].split(' ').pop())
    const ifTrue = parseInt(monkey[4].split(' ').pop())
    const ifFalse = parseInt(monkey[5].split(' ').pop())
    return {
      items,
      operation: (old) => op === '+' ? old + (num === 'old' ? old : parseInt(num)) : old * (num === 'old' ? old : parseInt(num)),
      test: (curr) => curr % divisibleBy === 0,
      ifTrue,
      ifFalse,
      inspectedItems: 0
    }
  })
  console.log(monkeys)
  Array(10000).fill(null).forEach((_) => {
    monkeys.forEach(monkey => {
      monkey.items.forEach(item => {
        item = monkey.operation(item)
        // item = Math.floor(item / 3)
        const toMonkey = monkey.test(item) ? monkey.ifTrue : monkey.ifFalse
        monkeys[toMonkey].items.push(item)
      })
      monkey.inspectedItems += monkey.items.length
      monkey.items = []
    })
  })
  const [first, second] = monkeys.map(_ => _.inspectedItems).sort((a, b) => a - b).slice(-2)

  return first * second;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Monkey 0:
        Starting items: 79, 98
        Operation: new = old * 19
        Test: divisible by 23
          If true: throw to monkey 2
          If false: throw to monkey 3
Monkey 1:
        Starting items: 54, 65, 75, 74
        Operation: new = old + 6
        Test: divisible by 19
          If true: throw to monkey 2
          If false: throw to monkey 0
          
          Monkey 2:
        Starting items: 79, 60, 97
        Operation: new = old * old
        Test: divisible by 13
          If true: throw to monkey 1
          If false: throw to monkey 3
          
          Monkey 3:
        Starting items: 74
        Operation: new = old + 3
        Test: divisible by 17
          If true: throw to monkey 0
          If false: throw to monkey 1`,
        expected: 2713310158,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
