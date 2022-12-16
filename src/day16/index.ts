import run from "aocrunner";
import lodash from 'lodash'
const parseInput = (rawInput: string) => rawInput;
type Node = { source: string, rate: number, targets: string[], visited: Set<string>, max: number, tick: number }
const copy = (_) => JSON.parse(JSON.stringify(_))
const part1 = (rawInput: string) => {
  const regex = /Valve (.+) has flow rate=(\d+); tunnel(s?) lead(s?) to valve(s?) ((.{2}(,?)( ?))+)/
  const input: Node[] = parseInput(rawInput).split('\n').map(_ => _.match(regex))
    .map(([, source, rate, , , , ...targets]) => ({ source, rate: +rate, targets: targets.slice(0, -3)[0].split(', '), visited: new Set(), max: 0, tick: 30 }));
  const nodes: Record<string, Node> = input.reduce((prev, curr) => {
    return {
      ...prev,
      [curr.source]: curr
    }
  }, {})
  // console.log(nodes)
  let currQueue: Node[] = [nodes['AA']]
  for (let tick = 28; tick > 0; tick = tick - 2) {
    let nextMap: Record<string, Node> = {}
    while (currQueue.length > 0) {
      const curr = currQueue.pop()
      curr.targets.forEach(target => {
        // const newVal = nextMap[target].rate * (curr.visited ? 0 : 1) * tick
        if (!nextMap[target] || nextMap[target].rate * (curr.visited ? 0 : 1) * tick > nextMap[target].max) {
          // console.log((nodes[target]), target);
          nextMap[target] = copy(nodes[target])
          nextMap[target].visited = new Set([...curr.visited.values()].concat(curr.source))
          nextMap[target].max = nextMap[target].rate * (curr.visited.has(target) ? 0 : 1) * tick
        }
      })
    }
    currQueue = Object.values(nextMap)
  }
  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
