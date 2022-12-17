import run from "aocrunner";
import lodash from 'lodash'
const parseInput = (rawInput: string) => rawInput;
type Node = { source: string, rate: number, targets: string[], opened: Set<string>, max: number, tick: number, prev?: string }
const copy = (_: Node): Node => {
  const x: Node = JSON.parse(JSON.stringify(_))
  x.opened = copySet(_.opened)
  return x
}
function copySet(set: Set<any>) {
  return new Set([...set.values()])
}
const part1 = (rawInput: string) => {
  const regex = /Valve (.+) has flow rate=(\d+); tunnel(s?) lead(s?) to valve(s?) ((.{2}(,?)( ?))+)/
  const input: Node[] = parseInput(rawInput).split('\n').map(_ => _.match(regex))
    .map(([, source, rate, , , , ...targets]) => ({ source, rate: +rate, targets: targets.slice(0, -3)[0].split(', '), opened: new Set(), max: 0, tick: 30 }));
  const nodes: Record<string, Node> = input.reduce((prev, curr) => {
    return {
      ...prev,
      [curr.source]: curr
    }
  }, {})
  let max = 0
  let runs = 0
  function rec(curr: Node) {
    // console.log(runs++);
    console.log(max);

    // console.log(curr.tick, curr.source);
    max = Math.max(max, curr.max)
    if (curr.tick === 0) { return }
    if (!curr.opened.has(curr.source)) {
      const newMax = curr.max + (curr.rate * (curr.tick - 1))
      const next = copy(curr)
      next.max = newMax
      next.opened.add(curr.source)
      next.prev = curr.source
      next.tick = curr.tick - 1
      rec(next)
    }
    if (curr.opened.size === input.length) { return }
    curr.targets.forEach(target => {
      const next = copy(nodes[target])
      next.opened = copySet(curr.opened)
      next.max = curr.max
      next.prev = curr.source
      next.tick = curr.tick - 1
      rec(next)
    })

  }
  rec(nodes['AA'])
  return max
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
        Valve BB has flow rate=13; tunnels lead to valves CC, AA
        Valve CC has flow rate=2; tunnels lead to valves DD, BB
        Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
        Valve EE has flow rate=3; tunnels lead to valves FF, DD
        Valve FF has flow rate=0; tunnels lead to valves EE, GG
        Valve GG has flow rate=0; tunnels lead to valves FF, HH
        Valve HH has flow rate=22; tunnel leads to valve GG
        Valve II has flow rate=0; tunnels lead to valves AA, JJ
        Valve JJ has flow rate=21; tunnel leads to valve II`,
        expected: 1651,
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
  onlyTests: true,
});
