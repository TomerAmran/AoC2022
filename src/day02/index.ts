import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;


const map = {
  'A': 1, //rock
  'B': 2, //paper
  'C': 3, //sicors
  'X': 1,
  'Y': 2,
  'Z': 3
}
const lossDrawWinMap = {
  X: 'loss',
  Y: 'draw',
  Z: 'win'
}
//x loss
//y draw
//z win

function res(me: number, opponent: number): 'loss' | 'draw' | 'win' {
  if (me === opponent) return 'draw'
  else if ((me === 2 && opponent === 1) || (me === 3 && opponent === 2) || (me === 1 && opponent === 3))
    return 'win'
  else return 'loss'
}

function calcMyPick(res: 'loss' | 'draw' | 'win', opponent: number): number {
  if (res === 'draw')
    return opponent
  if (res === 'loss') {
    if (opponent === 3)
      return 2
    if (opponent === 2)
      return 1
    if (opponent === 1)
      return 3
  }
  else {
    if (opponent === 3)
      return 1
    if (opponent === 2)
      return 3
    if (opponent === 1)
      return 2
  }

}
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const games = input.split('\n').map(_ => _.trim().split(' '))

  let score = 0
  games.forEach(([opponent, me]) => {
    const result = res(map[me], map[opponent])
    score += (result === 'loss' ? 0 : result === 'draw' ? 3 : 6) + map[me]
  })
  return score;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const games = input.split('\n').map(_ => _.trim().split(' '))

  let score = 0
  games.forEach(([opponent, me]) => {

    const res = lossDrawWinMap[me]
    const myPick = calcMyPick(res, map[opponent])

    score += (res === 'loss' ? 0 : res === 'draw' ? 3 : 6) + myPicks
  })
  return score;
};

run({
  part1: {
    tests: [
      {
        input: `A X
        B Y
        C Z`,
        expected: 15
      },
      {
        input: `A Y
        B X
        C Y`,
        expected: 11
      },
      {
        input: `A Z
        B Z
        C Z`,
        expected: 24
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
