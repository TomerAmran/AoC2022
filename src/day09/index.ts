import run from "aocrunner";
import { Z_ASCII } from "zlib";

const parseInput = (rawInput: string) => rawInput;


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n');
  const tailVisited = new Set<string>()
  let headPosition = [0, 0]
  let tailPosition = [0, 0]
  const steps = []
  input.forEach(_ => {
    const [direction, amount] = _.trim().split(' ')
    steps.push(...(Array(parseInt(amount)).fill(direction)))
  })

  steps.forEach(step => {
    if (step === 'L') {
      headPosition = [headPosition[0] - 1, headPosition[1]]
    }
    if (step === 'R') {
      headPosition = [headPosition[0] + 1, headPosition[1]]
    }
    if (step === 'U') {
      headPosition = [headPosition[0], headPosition[1] + 1]
    }
    if (step === 'D') {
      headPosition = [headPosition[0], headPosition[1] - 1]
    }

    //move tail 
    if (headPosition[1] === tailPosition[1] - 2) {
      if (headPosition[0] !== tailPosition[0]) {
        tailPosition[0] = headPosition[0]
      }
      tailPosition[1]--
    }
    if (headPosition[1] === tailPosition[1] + 2) {
      if (headPosition[0] !== tailPosition[0]) {
        tailPosition[0] = headPosition[0]
      }
      tailPosition[1]++
    }
    if (headPosition[0] === tailPosition[0] - 2) {
      if (headPosition[1] !== tailPosition[1]) {
        tailPosition[1] = headPosition[1]
      }
      tailPosition[0]--
    }
    if (headPosition[0] === tailPosition[0] + 2) {
      if (headPosition[1] !== tailPosition[1]) {
        tailPosition[1] = headPosition[1]
      }
      tailPosition[0]++
    }
    tailVisited.add(`${tailPosition[0]}-${tailPosition[1]}`)
    // console.log(headPosition);
    // console.log(headPositsion, tailPosition);

  })
  return tailVisited.size;
};

const difToMoveMap = {
  '0_2': [0, 1],
  '-1_2': [-1, 1],
  '-2_2': [-1, 1],
  '-2_1': [-1, 1],
  '-2_0': [-1, 0],
  '-2_-1': [-1, -1],
  '-2_-2': [-1, -1],
  '-1_-2': [-1, -1],
  '0_-2': [0, -1],
  '1_-2': [1, -1],
  '2_-2': [1, -1],
  '2_-1': [1, -1],
  '2_0': [1, 0],
  '2_1': [1, 1],
  '2_2': [1, 1],
  '1_2': [1, 1]
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n');
  const tailVisited = new Set<string>()
  const snakePositions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(_ => [0, 0])
  const steps = []
  input.forEach(_ => {
    const [direction, amount] = _.trim().split(' ')
    steps.push(...(Array(parseInt(amount)).fill(direction)))
  })

  steps.forEach(step => {
    // const x = [1, 2, 3, 4, 5, 6].map(_ => ['.', '.', '.', '.', '.', '.'])
    // snakePositions.forEach((_, i) => {
    //   x[5 - _[1]][_[0]] = `${i}`
    // })
    // console.log(x)
    // // console.log(step)
    if (step === 'L') {
      snakePositions[0] = [snakePositions[0][0] - 1, snakePositions[0][1]]
    }
    if (step === 'R') {
      snakePositions[0] = [snakePositions[0][0] + 1, snakePositions[0][1]]
    }
    if (step === 'U') {
      snakePositions[0] = [snakePositions[0][0], snakePositions[0][1] + 1]
    }
    if (step === 'D') {
      snakePositions[0] = [snakePositions[0][0], snakePositions[0][1] - 1]
    }
    for (let i = 0; i < 9; i++) {
      const diff = `${snakePositions[i][0] - snakePositions[i + 1][0]}_${snakePositions[i][1] - snakePositions[i + 1][1]}`
      // console.log(diff)
      // console.log(difToMoveMap[diff])
      if (difToMoveMap[diff]) {
        const [xMove, yMove] = difToMoveMap[diff]
        snakePositions[i + 1][0] += xMove
        snakePositions[i + 1][1] += yMove
      }
    }

    console.log(snakePositions.slice(0, 6))
    tailVisited.add(`${snakePositions[9][0]}-${snakePositions[9][1]}`)

    // console.log(snakePositions);
    // console.log(headPositsion, tailPosition);

  })
  return tailVisited.size;
};

run({
  part1: {
    tests: [
      {
        input: `R 4
        U 4
        L 3
        D 1
        R 4
        D 1
        L 5
        R 2`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `R 5
        U 8
        L 8
        D 3
        R 17
        D 10
        L 25
        U 20`,
        expected: 36,
      },
      // {
      //   input: `R 4
      //   U 4
      //   L 3
      //   D 1
      //   R 4
      //   D 1
      //   L 5
      //   R 2`,
      //   expected: 13,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
