import run from "aocrunner";
import { assert } from "console";
import lodash from 'lodash'
const parseInput = (rawInput: string) => rawInput;
type Node = {
  source: string,
  rate: number,
  targets: string[],
  opened: Set<string>,
  max: number,
  tick: number,
  prev?: string,
  distanceMap?: Record<string, number>
}
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
  const input: any[] = parseInput(rawInput).split('\n').map(_ => _.match(regex))
    .map(([, source, rate, , , , ...targets]) =>
    ({
      source, rate: +rate, targets: targets.slice(0, -3)[0].split(', ')
      , opened: new Set(), max: 0, tick: 30, distanceMap: {}
    }));
  const nodes: Record<string, Node> = input.reduce((prev, curr) => {
    return {
      ...prev,
      [curr.source]: curr
    }
  }, {})
  const nonZeroValves = input.filter(_ => _.rate > 0).concat(nodes['AA'])

  nonZeroValves.forEach(valve1 => {
    nonZeroValves.filter(_ => _ !== valve1).forEach(valve2 => {
      const q: [Node, number][] = [[valve1, 0]]
      const visited = new Set<string>()
      while (q.length > 0) {
        const [node, distance] = q.pop()
        visited.add(node.source)
        if (node === valve2) {
          valve1.distanceMap[valve2.source] = distance
          break
        }
        else {
          node.targets.filter(_ => !visited.has(_)).forEach((target) => {
            q.unshift([nodes[target], distance + 1])
          })
        }
      }
    })
  })
  // console.log(nonZeroValves.map(_ => ([_.source, _.distanceMap])));

  const memo = {}

  function rec(node: string, opened: Set<string>, tick: number) {
    if (tick === 0) return 0;
    const pathOptionsResults = Object.entries(nodes[node].distanceMap)
      .filter(([id, distance]) => !opened.has(id) && tick > distance)
      .map(([targetNode, distance]) => {
        const remaining = tick - distance - 1;
        const pressure = nodes[targetNode].rate * remaining;
        const newOpened = new Set(opened).add(targetNode)
        const key = `${targetNode}_${remaining}_${[...newOpened.keys()].join('_')}`
        // console.log(key)
        if (memo[key]) {
          console.log('hit')
          return pressure + memo[key]
        }
        else {
          // console.log('miss')
          const nextRec = rec(targetNode, newOpened, remaining)
          memo[key] = nextRec
          return pressure + nextRec
        }
      })
    return Math.max(0, ...pathOptionsResults);
  }

  return rec('AA', new Set(), 30)

};
const memo = {}
function getAllSubset(arr, size) {
  const key = `${arr.join('_')}_${size}`
  // console.log(key)
  if (memo[key]) {
    console.log('subset hit')
    return memo[key]
  }
  if (size === 1) {
    return (arr.map(_ => [_]))
  }
  const temp = [...arr]
  const results = []
  while (temp.length >= size) {
    const currElement = temp.pop()
    const rests = getAllSubset(temp, size - 1)
    results.push(...rests.map(_ => [currElement, ..._]))
  }
  memo[key] = results
  return results
}
function getPairsOfSubset(arr: string[]): string[][][] {
  const limit = Math.floor(arr.length / 2)
  return Array(limit).fill(undefined).map((_, i) => {
    const firsts = getAllSubset(arr, i + 1)
    return firsts.map(first => [first, arr.filter(_ => !first.includes(_))])
  }).flat()
}
const part2 = (rawInput: string) => {
  const regex = /Valve (.+) has flow rate=(\d+); tunnel(s?) lead(s?) to valve(s?) ((.{2}(,?)( ?))+)/
  const input: any[] = parseInput(rawInput).split('\n').map(_ => _.match(regex))
    .map(([, source, rate, , , , ...targets]) =>
    ({
      source, rate: +rate, targets: targets.slice(0, -3)[0].split(', ')
      , opened: new Set(), max: 0, tick: 30, distanceMap: {}
    }));
  const nodes: Record<string, Node> = input.reduce((prev, curr) => {
    return {
      ...prev,
      [curr.source]: curr
    }
  }, {})
  const nonZeroValves = input.filter(_ => _.rate > 0).concat(nodes['AA'])

  nonZeroValves.forEach(valve1 => {
    nonZeroValves.filter(_ => _ !== valve1).forEach(valve2 => {
      const q: [Node, number][] = [[valve1, 0]]
      const visited = new Set<string>()
      while (q.length > 0) {
        const [node, distance] = q.pop()
        visited.add(node.source)
        if (node === valve2) {
          valve1.distanceMap[valve2.source] = distance
          break
        }
        else {
          node.targets.filter(_ => !visited.has(_)).forEach((target) => {
            q.unshift([nodes[target], distance + 1])
          })
        }
      }
    })
  })
  // console.log(nonZeroValves.map(_ => ([_.source, _.distanceMap])));

  const memo = {}

  function rec(node: string, opened: Set<string>, tick: number) {
    if (tick === 0) return 0;
    const pathOptionsResults = Object.entries(nodes[node].distanceMap)
      .filter(([id, distance]) => !opened.has(id) && tick > distance)
      .map(([targetNode, distance]) => {
        const remaining = tick - distance - 1;
        const pressure = nodes[targetNode].rate * remaining;
        const newOpened = new Set(opened).add(targetNode)
        // const key = `${targetNode}_${remaining}_${[...newOpened.keys()].join('_')}`

        // console.log(key)
        // if (memo[key]) {
        //   console.log('hit')
        //   return pressure + memo[key]
        // }
        // else {
        // console.log('miss')
        const nextRec = rec(targetNode, newOpened, remaining)
        // memo[key] = nextRec
        return pressure + nextRec
        // }
      })
    return Math.max(0, ...pathOptionsResults);
  }


  const paris = getPairsOfSubset(nonZeroValves.map(_ => _.source))
  console.log('finished pairs division', paris.length);

  const ress = paris.map(([me, elephent], i) => {
    console.log('remaining', (paris.length - i + 1) / paris.length)
    const res = rec('AA', new Set(me), 26) + rec('AA', new Set(elephent), 26)
    return res

  })
  return lodash.max(ress)
  // return rec('AA', new Set(), 30)

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
        expected: 1707,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
