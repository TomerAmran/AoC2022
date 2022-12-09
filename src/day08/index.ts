import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n').map(_ => _.trim().split('').map(_ => parseInt(_)));
  const [m, n] = [input.length, input[0].length]
  const fromLeft = Array(m).fill(1).map(_ => Array(n).fill(-1))
  const fromRight = Array(m).fill(1).map(_ => Array(n).fill(-1))
  const fromTop = Array(m).fill(1).map(_ => Array(n).fill(-1))
  const fromBottom = Array(m).fill(1).map(_ => Array(n).fill(-1))

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      //left
      for (let k = j - 1; k > -1; k--) {
        if (input[i][k] >= input[i][j]) {
          fromLeft[i][j] = j - k
          break
        }
      }
      if (fromLeft[i][j] === -1) {
        fromLeft[i][j] = j
      }
      //right
      for (let k = j + 1; k < n; k++) {
        if (input[i][k] >= input[i][j]) {
          fromRight[i][j] = k - j
          break
        }
      }
      if (fromRight[i][j] === -1) {
        fromRight[i][j] = n - 1 - j
      }
      //top
      for (let k = i - 1; k > -1; k--) {
        if (input[k][j] >= input[i][j]) {
          fromTop[i][j] = i - k
          break
        }
      }
      if (fromTop[i][j] === -1) {
        fromTop[i][j] = i
      }

      //bottom
      for (let k = i + 1; k < m; k++) {
        if (input[k][j] >= input[i][j]) {
          fromBottom[i][j] = k - i
          break
        }
      }
      if (fromBottom[i][j] === -1) {
        fromBottom[i][j] = m - 1 - i
      }
    }
  }

  let ans = -1

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      ans = Math.max(ans, fromBottom[i][j] * fromLeft[i][j] * fromRight[i][j] * fromTop[i][j])
    }
  }
  return ans
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n').map(_ => _.trim().split('').map(_ => parseInt(_)));
  const [m, n] = [input.length, input[0].length]
  const fromLeft = Array(m).fill(1).map(_ => Array(n).fill(false))
  const fromRight = Array(m).fill(1).map(_ => Array(n).fill(false))
  const fromTop = Array(m).fill(1).map(_ => Array(n).fill(false))
  const fromBottom = Array(m).fill(1).map(_ => Array(n).fill(false))

  for (let i = 0; i < m; i++) {
    let max = -1
    for (let j = 0; j < n; j++) {
      // console.log(i, j, input[i][j], max)
      if (input[i][j] > max) {
        max = input[i][j]
        fromLeft[i][j] = true
      }
    }
  }

  for (let i = 0; i < m; i++) {
    let max = -1
    for (let j = n - 1; j > -1; j--) {
      if (input[i][j] > max) {
        max = input[i][j]
        fromRight[i][j] = true
      }
    }
  }


  for (let j = 0; j < n; j++) {
    let max = -1
    for (let i = 0; i < m; i++) {
      if (input[i][j] > max) {
        max = input[i][j]
        fromTop[i][j] = true
      }
    }
  }


  for (let j = 0; j < n; j++) {
    let max = -1
    for (let i = n - 1; i > -1; i--) {
      if (input[i][j] > max) {
        max = input[i][j]
        fromBottom[i][j] = true
      }
    }
  }

  let ans = 0

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      ans += (fromBottom[i][j] || fromLeft[i][j] || fromRight[i][j] || fromTop[i][j]) ? 1 : 0
    }
  }

  // console.log(fromLeft)

  return ans
  //4 matrices, 1 for each direction.
  //go from one direction, and remember the highest number you've seen (start with -1)
  //for each cell if the number is higher from the highest mark as true and update the highest
  //do an or on the matrices

};
type TreeData = { blockedBy: number, distanceToBlock: number }
// const part2 = (rawInput: string) => {
//   const input = parseInput(rawInput).split('\n').map(_ => _.trim().split('').map(_ => parseInt(_)));
//   const [m, n] = [input.length, input[0].length]
//   const fromLeft: TreeData[][] = Array(m).fill(1).map(_ => Array(n).fill(null))
//   const fromRight: TreeData[][] = Array(m).fill(1).map(_ => Array(n).fill(null))
//   const fromBottom: TreeData[][] = Array(m).fill(1).map(_ => Array(n).fill(null))
//   const fromTop: TreeData[][] = Array(m).fill(1).map(_ => Array(n).fill(null))

//   for (let i = 0; i < m; i++) {
//     let max = { blockedBy: -1, distanceToBlock: 0, myVal: -1 }
//     for (let j = 0; j < n; j++) {
//       // console.log(i, j, input[i][j], max)
//       if (input[i][j] > max) {
//         max = input[i][j]
//         fromLeft[i][j] = true
//       }
//     }
//   }

//   for (let i = 0; i < m; i++) {
//     let max = -1
//     for (let j = n - 1; j > -1; j--) {
//       if (input[i][j] > max) {
//         max = input[i][j]
//         fromRight[i][j] = true
//       }
//     }
//   }


//   for (let j = 0; j < n; j++) {
//     let max = -1
//     for (let i = 0; i < m; i++) {
//       if (input[i][j] > max) {
//         max = input[i][j]
//         fromTop[i][j] = true
//       }
//     }
//   }


//   for (let j = 0; j < n; j++) {
//     let max = -1
//     for (let i = n - 1; i > -1; i--) {
//       if (input[i][j] > max) {
//         max = input[i][j]
//         fromBottom[i][j] = true
//       }
//     }
//   }

//   let ans = 0

//   for (let i = 0; i < m; i++) {
//     for (let j = 0; j < n; j++) {
//       ans += (fromBottom[i][j] || fromLeft[i][j] || fromRight[i][j] || fromTop[i][j]) ? 1 : 0
//     }
//   }

//   // console.log(fromLeft)

//   return ans
//   //4 matrices, 1 for each direction.
//   //go from one direction, and remember the highest number you've seen (start with -1)
//   //for each cell if the number is higher from the highest mark as true and update the highest
//   //do an or on the matrices

// };

run({
  part1: {
    tests: [
      {
        input: `30373
        25512
        65332
        33549
        35390
        `,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `30373
        25512
        65332
        33549
        35390
        `,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
