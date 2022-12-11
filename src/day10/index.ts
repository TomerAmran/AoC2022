import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n').map(_ => _.trim());
  let register = 1
  let cycle = 0
  // 20th, 60th, 100th, 140th, 180th, and 220t
  const cycleSave = [20, 60, 100, 140, 180, 220]
  let signalStrength = 0
  const addSignal = (cycleNum: number) => {
    if (cycleSave.includes(cycle)) {
      signalStrength += cycleNum * register
    }
  }
  input.forEach(_ => {
    if (_ === 'noop') {
      cycle++
      addSignal(cycle)
    }
    else {
      const [_addx, val] = _.split(' ')
      cycle++
      addSignal(cycle)
      cycle++
      addSignal(cycle)

      register += parseInt(val)
    }
  })
  return signalStrength
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n').map(_ => _.trim());
  console.log(input.length)
  let register = 1
  let cycle = 0
  // 20th, 60th, 100th, 140th, 180th, and 220t
  const pixels = [[]]
  const cycleSave = [20, 60, 100, 140, 180, 220]
  let signalStrength = 0
  function x() {
    let [last] = pixels.slice(-1)
    if (last.length === 40) {
      last = []
      pixels.push(last)
    }
    last.push(
      (last.length - 1 <= register && register <= last.length + 1) ?
        '#' : '.'
    )
  }
  const addSignal = (cycleNum: number) => {
    if (cycleSave.includes(cycle)) {
      signalStrength += cycleNum * register
    }
  }
  input.forEach(_ => {
    if (_ === 'noop') {
      cycle++
      x()
      addSignal(cycle)
    }
    else {
      const [_addx, val] = _.split(' ')
      cycle++
      addSignal(cycle)
      x()
      cycle++
      addSignal(cycle)
      x()

      register += parseInt(val)
    }
  })
  console.log(pixels.map(_ => _.join('')).join('\n'))
  return signalStrength
};

run({
  part1: {
    tests: [
      {
        input: `addx 15
        addx -11
        addx 6
        addx -3
        addx 5
        addx -1
        addx -8
        addx 13
        addx 4
        noop
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx -35
        addx 1
        addx 24
        addx -19
        addx 1
        addx 16
        addx -11
        noop
        noop
        addx 21
        addx -15
        noop
        noop
        addx -3
        addx 9
        addx 1
        addx -3
        addx 8
        addx 1
        addx 5
        noop
        noop
        noop
        noop
        noop
        addx -36
        noop
        addx 1
        addx 7
        noop
        noop
        noop
        addx 2
        addx 6
        noop
        noop
        noop
        noop
        noop
        addx 1
        noop
        noop
        addx 7
        addx 1
        noop
        addx -13
        addx 13
        addx 7
        noop
        addx 1
        addx -33
        noop
        noop
        noop
        addx 2
        noop
        noop
        noop
        addx 8
        noop
        addx -1
        addx 2
        addx 1
        noop
        addx 17
        addx -9
        addx 1
        addx 1
        addx -3
        addx 11
        noop
        noop
        addx 1
        noop
        addx 1
        noop
        noop
        addx -13
        addx -19
        addx 1
        addx 3
        addx 26
        addx -30
        addx 12
        addx -1
        addx 3
        addx 1
        noop
        noop
        noop
        addx -9
        addx 18
        addx 1
        addx 2
        noop
        noop
        addx 9
        noop
        noop
        noop
        addx -1
        addx 2
        addx -37
        addx 1
        addx 3
        noop
        addx 15
        addx -21
        addx 22
        addx -6
        addx 1
        noop
        addx 2
        addx 1
        noop
        addx -10
        noop
        noop
        addx 20
        addx 1
        addx 2
        addx 2
        addx -6
        addx -11
        noop
        noop
        noop`,
        expected: 13140,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `addx 15
        addx -11
        addx 6
        addx -3
        addx 5
        addx -1
        addx -8
        addx 13
        addx 4
        noop
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx -35
        addx 1
        addx 24
        addx -19
        addx 1
        addx 16
        addx -11
        noop
        noop
        addx 21
        addx -15
        noop
        noop
        addx -3
        addx 9
        addx 1
        addx -3
        addx 8
        addx 1
        addx 5
        noop
        noop
        noop
        noop
        noop
        addx -36
        noop
        addx 1
        addx 7
        noop
        noop
        noop
        addx 2
        addx 6
        noop
        noop
        noop
        noop
        noop
        addx 1
        noop
        noop
        addx 7
        addx 1
        noop
        addx -13
        addx 13
        addx 7
        noop
        addx 1
        addx -33
        noop
        noop
        noop
        addx 2
        noop
        noop
        noop
        addx 8
        noop
        addx -1
        addx 2
        addx 1
        noop
        addx 17
        addx -9
        addx 1
        addx 1
        addx -3
        addx 11
        noop
        noop
        addx 1
        noop
        addx 1
        noop
        noop
        addx -13
        addx -19
        addx 1
        addx 3
        addx 26
        addx -30
        addx 12
        addx -1
        addx 3
        addx 1
        noop
        noop
        noop
        addx -9
        addx 18
        addx 1
        addx 2
        noop
        noop
        addx 9
        noop
        noop
        noop
        addx -1
        addx 2
        addx -37
        addx 1
        addx 3
        noop
        addx 15
        addx -21
        addx 22
        addx -6
        addx 1
        noop
        addx 2
        addx 1
        noop
        addx -10
        noop
        noop
        addx 20
        addx 1
        addx 2
        addx 2
        addx -6
        addx -11
        noop
        noop
        noop`,
        expected: 13140,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
