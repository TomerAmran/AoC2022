import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getNeighbor = (i: number, j: number, m: number, n: number) => {
  const neighs = []
  if (i > 0) {
    neighs.push([i - 1, j])
  }
  if (j > 0) {
    neighs.push([i, j - 1])
  }

  if (i < m - 1) {
    neighs.push([i + 1, j])
  }
  if (j < n - 1) {
    neighs.push([i, j + 1])
  }
  return neighs

}
const val = (char: string) => {
  if (char === 'S') {
    return val('a')
  }
  if (char === 'E') {
    return val('z')
  }
  return char.charCodeAt(0)
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n').map(_ => _.trim().split(''));
  const distance = input.map(_ => _.map(_ => -1))
  const [m, n] = [input.length, input[0].length]
  let start: number[], end: number[]
  input.forEach((_, i) => {
    _.forEach((_, j) => {
      if (_ === 'S') {
        start = [i, j]
      }
      if (_ === 'E') {
        end = [i, j]
      }
    })
  })
  let stack = [start]
  distance[start[0]][start[1]] = 0
  let ans = -1
  while (stack.length > 0) {
    const [currI, currJ] = stack.pop()
    const currVal = val(input[currI][currJ])
    const neigs = getNeighbor(currI, currJ, m, n)
    neigs.forEach(([nI, nJ]) => {
      const neigVal = val(input[nI][nJ])
      const visited = distance[nI][nJ] > -1
      if (!visited && (neigVal <= currVal + 1)) {
        distance[nI][nJ] = distance[currI][currJ] + 1
        if (nI === end[0] && nJ === end[1]) {
          ans = distance[nI][nJ]
        }

        stack = [[nI, nJ]].concat(stack)
      }
    })
    if (ans > 0) {
      break
    }
  }
  return ans;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n').map(_ => _.trim().split(''));
  const [m, n] = [input.length, input[0].length]
  let starts: number[][] = [], end: number[]
  input.forEach((_, i) => {
    _.forEach((_, j) => {
      if (_ === 'S' || _ === 'a') {
        starts.push([i, j])
      }
      if (_ === 'E') {
        end = [i, j]
      }
    })
  })

  const anss = starts.map((start) => {
    const distance = input.map(_ => _.map(_ => -1))
    let stack = [start]
    distance[start[0]][start[1]] = 0
    let ans = -1
    while (stack.length > 0) {
      const [currI, currJ] = stack.pop()
      const currVal = val(input[currI][currJ])
      const neigs = getNeighbor(currI, currJ, m, n)
      neigs.forEach(([nI, nJ]) => {
        const neigVal = val(input[nI][nJ])
        const visited = distance[nI][nJ] > -1
        if (!visited && (neigVal <= currVal + 1)) {
          distance[nI][nJ] = distance[currI][currJ] + 1
          if (nI === end[0] && nJ === end[1]) {
            ans = distance[nI][nJ]
          }

          stack = [[nI, nJ]].concat(stack)
        }
      })
      if (ans > 0) {
        break
      }
    }
    return ans;
  })
  console.log(anss);

  return anss.filter(_ => _ > -1).sort((a, b) => a - b)[0]
};

run({
  part1: {
    tests: [
      {
        input: `Sabqponm
        abcryxxl
        accszExk
        acctuvwj
        abdefghi`,
        expected: 31,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Sabqponm
        abcryxxl
        accszExk
        acctuvwj
        abdefghi`,
        expected: 29,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
