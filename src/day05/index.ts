import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n');
  const cargosData = input.slice(0, 8).map(_ => {
    const chars = _.split('')
    const cargos = []
    for (let i = 0; i < 9; i++) {
      console.log(i, chars)
      chars.shift()
      cargos.push(chars.shift())
      chars.shift()
      if (i < 8)
        chars.shift()
    }
    return cargos
  })
  let cT = cargosData.map((_col, i) => cargosData.map(_ => _[i]))
  cT.push(cargosData.map(_ => _[8]))
  cT = cT.map(_ => _.filter(_ => _ !== ' '))
  cT.map(_ => _.reverse())

  const instructions = input.slice(10).map((l) => {
    return l.match(/move (\d+) from (\d+) to (\d+)/).slice(1).map(_ => parseInt(_));
  });
  instructions.map(_ => {
    let [amount, from, to] = _
    while (amount > 0) {
      amount--
      cT[to - 1].push(cT[from - 1].pop())
    }
  })

  const ans = cT.map(_ => _.slice(-1)[0]).join('')
  return ans
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n');
  const cargosData = input.slice(0, 8).map(_ => {
    const chars = _.split('')
    const cargos = []
    for (let i = 0; i < 9; i++) {
      console.log(i, chars)
      chars.shift()
      cargos.push(chars.shift())
      chars.shift()
      if (i < 8)
        chars.shift()
    }
    return cargos
  })
  let cT = cargosData.map((_col, i) => cargosData.map(_ => _[i]))
  cT.push(cargosData.map(_ => _[8]))
  cT = cT.map(_ => _.filter(_ => _ !== ' '))
  cT.map(_ => _.reverse())

  const instructions = input.slice(10).map((l) => {
    return l.match(/move (\d+) from (\d+) to (\d+)/).slice(1).map(_ => parseInt(_));
  });
  instructions.map(_ => {
    let [amount, from, to] = _
    const move = cT[from - 1].slice(-amount)
    cT[to - 1] = cT[to - 1].concat(move)
    cT[from - 1] = cT[from - 1].slice(0, -amount)
  })

  const ans = cT.map(_ => _.slice(-1)[0]).join('')
  return ans
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
