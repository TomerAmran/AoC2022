import run from "aocrunner";
import lodash from 'lodash'
const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n')
    .map(_ => _.split(' -> ').map(_ => _.split(',').map(_ => +_)));
  const [xMin, xMax] = input.flat().map(_ => _[0]).reduce((prv, cur) => ([Math.min(cur, prv[0]), Math.max(cur, prv[1])]), [1000, -1])
  const [yMin, yMax] = input.flat().map(_ => _[1]).reduce((prv, cur) => ([Math.min(cur, prv[0]), Math.max(cur, prv[1])]), [1000, -1])
  // console.log(xMin, xMax);
  // console.log(yMin, yMax);
  const cave = Array(yMax + 1).fill(1).map(_ => Array(xMax - xMin + 1).fill('.'))
  function setCave(x: number, y: number, val: any) {
    cave[y][x - xMin] = val
  }
  function getCave(x: number, y: number) {
    const val = cave[y][x - xMin]
    if (!val) {
      throw Error('outofbound')
    }
    return val
  }
  function printCave() {
    console.log(cave.map(_ => _.join('')).join('\n'))
    console.log('\n')
  }
  function isEqual(a, b) {
    return (JSON.stringify(a) === JSON.stringify(b))
  }
  //making cave
  input.forEach(_ => {
    for (let i = 0; i < _.length - 1; i++) {
      const [[fX, fY], [toX, toY]] = _.slice(i, i + 2)
      if (fX === toX) {
        if (fY < toY) {
          for (let j = fY; j <= toY; j++) {
            setCave(fX, j, '#')
          }
        }
        else {
          for (let j = fY; j >= toY; j--) {
            setCave(fX, j, '#')
          }
        }
      }
      if (fY === toY) {
        if (fX < toX) {
          for (let j = fX; j <= toX; j++) {
            setCave(j, fY, '#')
          }
        }
        else {
          for (let j = fX; j >= toX; j--) {
            setCave(j, fY, '#')
          }
        }
      }
    }
  })
  let sandCount = 0
  try {
    while (true) {
      // console.log('while true');
      let currPosition: { x: number, y: number } = { x: 500, y: 0 }
      let nextPosition: { x: number, y: number } = { x: 500, y: 0 }
      do {
        // console.log('do');
        currPosition = JSON.parse(JSON.stringify(nextPosition))
        while (getCave(nextPosition.x, nextPosition.y + 1) === '.') {
          // console.log('step')
          nextPosition.y += 1
        }
        if (getCave(nextPosition.x - 1, nextPosition.y + 1) === '.') {
          nextPosition.y += 1
          nextPosition.x -= 1
        }
        else if (getCave(nextPosition.x + 1, nextPosition.y + 1) === '.') {
          nextPosition.y += 1
          nextPosition.x += 1
        }
      } while (!isEqual(currPosition, nextPosition))
      setCave(nextPosition.x, nextPosition.y, 'o')
      sandCount++
      // printCave()
    }
  }
  catch {
    return sandCount
  }
  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n')
    .map(_ => _.split(' -> ').map(_ => _.split(',').map(_ => +_)));
  const [xMin, xMax] = input.flat().map(_ => _[0]).reduce((prv, cur) => ([Math.min(cur, prv[0]), Math.max(cur, prv[1])]), [1000, -1])
  const [yMin, yMax] = input.flat().map(_ => _[1]).reduce((prv, cur) => ([Math.min(cur, prv[0]), Math.max(cur, prv[1])]), [1000, -1])
  // const cave = Array(yMax + 1).fill(1).map(_ => Array(xMax - xMin + 1).fill('.'))
  const cave = {}
  function setCave(x: number, y: number, val: any) {
    return cave[`${y}_${x}`] = val
  }
  function getCave(x: number, y: number) {
    if (y === yMax + 2) {
      setCave(x, y, '#')
    }
    const val = cave[`${y}_${x}`]
    if (!val) {
      return '.'
    }
    return val
  }
  function printCave() {
    // console.log(cave.map(_ => _.join('')).join('\n'))
    console.log('\n')
  }
  function isEqual(a, b) {
    return (JSON.stringify(a) === JSON.stringify(b))
  }
  //making cave
  input.forEach(_ => {
    for (let i = 0; i < _.length - 1; i++) {
      const [[fX, fY], [toX, toY]] = _.slice(i, i + 2)
      if (fX === toX) {
        if (fY < toY) {
          for (let j = fY; j <= toY; j++) {
            setCave(fX, j, '#')
          }
        }
        else {
          for (let j = fY; j >= toY; j--) {
            setCave(fX, j, '#')
          }
        }
      }
      if (fY === toY) {
        if (fX < toX) {
          for (let j = fX; j <= toX; j++) {
            setCave(j, fY, '#')
          }
        }
        else {
          for (let j = fX; j >= toX; j--) {
            setCave(j, fY, '#')
          }
        }
      }
    }
  })
  let sandCount = 0
  while (getCave(500, 0) !== 'o') {
    // console.log('while true');
    let currPosition: { x: number, y: number } = { x: 500, y: 0 }
    let nextPosition: { x: number, y: number } = { x: 500, y: 0 }
    do {
      // console.log('do');
      currPosition = JSON.parse(JSON.stringify(nextPosition))
      while (getCave(nextPosition.x, nextPosition.y + 1) === '.') {
        // console.log('step')
        nextPosition.y += 1
      }
      if (getCave(nextPosition.x - 1, nextPosition.y + 1) === '.') {
        nextPosition.y += 1
        nextPosition.x -= 1
      }
      else if (getCave(nextPosition.x + 1, nextPosition.y + 1) === '.') {
        nextPosition.y += 1
        nextPosition.x += 1
      }
    } while (!isEqual(currPosition, nextPosition))
    setCave(nextPosition.x, nextPosition.y, 'o')
    sandCount++
    // printCave()
  }
  return sandCount
};

run({
  part1: {
    tests: [
      {
        input: `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`,
        expected: 24,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`,
        expected: 93,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
