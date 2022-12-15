import run from "aocrunner";
import lodash from 'lodash'
const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  return
  const reg = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/
  const lines: number[][] = []
  const input = parseInput(rawInput).split('\n').map(_ => _.match(reg))
    .map(([, Sx, Sy, Bx, By]) => ([, Sx, Sy, Bx, By].map(_ => parseInt(_))))
    .map(([, Sx, Sy, Bx, By]) => {
      const distanceSensorToBeacon = Math.abs(Sx - Bx) + Math.abs(Sy - By)
      const row = 2000000
      const distanceSensorToRow = Math.abs(row - Sy)
      if (distanceSensorToRow < distanceSensorToBeacon) {
        const spareDistance = distanceSensorToBeacon - distanceSensorToRow
        lines.push([Sx - spareDistance, Sx + spareDistance])
      }
    })

  lines.sort((a, b) => a[0] - b[0])
  console.log(lines)
  const combinedLines = []
  let minMax: number[] = lines.shift()
  while (lines.length > 0 && minMax) {
    console.log(minMax)
    if (lines[0][0] <= minMax[1]) {
      const next = lines.shift()
      minMax = [minMax[0], Math.max(minMax[1], next[1])]
    }
    else {
      combinedLines.push(minMax)
      minMax = lines.shift()
    }

  }
  if (minMax) {
    combinedLines.push(minMax)
  }
  return minMax[1] - minMax[0]
  // console.log(input)
  return;
};

const part2 = (rawInput: string) => {
  const reg = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/
  const input = parseInput(rawInput).split('\n').map(_ => _.match(reg))
    .map(([, Sx, Sy, Bx, By]) => ([, Sx, Sy, Bx, By].map(_ => parseInt(_))))
  const x = Array(4000000).fill(undefined).map((_, row) => {
    const lines: number[][] = []
    input.map(([, Sx, Sy, Bx, By]) => {
      const distanceSensorToBeacon = Math.abs(Sx - Bx) + Math.abs(Sy - By)
      const distanceSensorToRow = Math.abs(row - Sy)
      if (distanceSensorToRow < distanceSensorToBeacon) {
        const spareDistance = distanceSensorToBeacon - distanceSensorToRow
        lines.push([Sx - spareDistance, Sx + spareDistance])
      }
    })

    lines.sort((a, b) => a[0] - b[0])
    const combinedLines = []
    let minMax: number[] = lines.shift()
    while (lines.length > 0 && minMax) {
      if (lines[0][0] <= minMax[1]) {
        const next = lines.shift()
        minMax = [minMax[0], Math.max(minMax[1], next[1])]
      }
      else {
        combinedLines.push(minMax)
        minMax = lines.shift()
      }

    }
    if (minMax) {
      combinedLines.push(minMax)
    }
    // return minMax[1] - minMax[0]
    // console.log(input)
    return combinedLines;
  })
  const [{ y, i }] = x.map((y, i) => ({ y, i })).filter(_ => _.y.length > 1)

  return ((y[0][1] + 1) * 4000000) + i

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
