import run from "aocrunner";
import lodash from 'lodash'
const parseInput = (rawInput: string) => rawInput;



type File = { type: 'file', name: string, size: Number }
type Folder = { type: 'folder', up?: Folder, children: (Folder | File)[], name: string, size?: number }

function calcSizes(curr: Folder | File) {
  if (curr.type === 'file') {
    return curr.size
  }
  else {
    curr.size = lodash.sum(curr.children.map((_) => calcSizes(_)))
    return curr.size
  }
}

function getAllFoldersWithSizeLessThan1000(curr: Folder) {
  const ans: Folder[] = []
  function rec(_curr: Folder | File) {
    if (_curr.type === 'file') {
      return
    }
    else {
      if (_curr.size < 100_000) {

        ans.push(_curr)
      }
      _curr.children.forEach(_ => {
        rec(_)
      })
    }
  }
  rec(curr)
  return ans
}


function getAllFoldersWithSize(curr: Folder) {
  const ans: Folder[] = []
  function rec(_curr: Folder | File) {
    if (_curr.type === 'file') {
      return
    }
    else {
      ans.push(_curr)
      _curr.children.forEach(_ => {
        rec(_)
      })
    }
  }
  rec(curr)
  return ans
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n').slice(1);
  input.reverse()
  const cdR = /\$ cd (.+)/
  const dirR = /dir (.+)/
  const fileR = /(\d+) (.*)/
  const lsR = /\$ ls/
  const dirs: Folder = { type: 'folder', children: [], name: '/' }
  const y = dirs
  let current_dir: Folder = dirs
  while (input.length > 0) {
    const nextLine = input.pop()
    const cd = nextLine.match(cdR)
    if (cd) {
      const [, folderName] = cd
      if (folderName === '..') {
        current_dir = current_dir.up
      }
      else {
        const nextDir: Folder = current_dir.children.find(_ => (_.type === 'folder') && (_.name === folderName)) as Folder
        current_dir = nextDir
      }

    }
    const ls = nextLine.match(lsR)
    if (ls) {
      let [nextLine] = input.slice(-1)
      while (nextLine) {
        if (nextLine.match(dirR)) {
          const [, dirName] = nextLine.match(dirR)
          current_dir.children.push({ type: 'folder', name: dirName, children: [], up: current_dir })
          input.pop()
        }
        else if (nextLine.match(fileR)) {
          const [, size, fileName] = nextLine.match(fileR)
          current_dir.children.push({ type: 'file', name: fileName, size: parseInt(size) })
          input.pop()
        }
        else break
        nextLine = input.slice(-1)[0]
      }
    }
  }
  calcSizes(dirs)
  let sizes = getAllFoldersWithSize(dirs).map(_ => _.size)
  const usedSpace = y.size
  console.log(sizes)
  console.log(sizes.map(_ => (usedSpace - _)))
  sizes = sizes.filter(_ => ((usedSpace - _) < (40000000)))
  return Math.min(...sizes)
};
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n').slice(1);
  input.reverse()
  const cdR = /\$ cd (.+)/
  const dirR = /dir (.+)/
  const fileR = /(\d+) (.*)/
  const lsR = /\$ ls/
  const dirs: Folder = { type: 'folder', children: [], name: '/' }
  let current_dir: Folder = dirs
  while (input.length > 0) {
    const nextLine = input.pop()
    const cd = nextLine.match(cdR)
    if (cd) {
      const [, folderName] = cd
      if (folderName === '..') {
        current_dir = current_dir.up
      }
      else {
        const nextDir: Folder = current_dir.children.find(_ => (_.type === 'folder') && (_.name === folderName)) as Folder
        current_dir = nextDir
      }

    }
    const ls = nextLine.match(lsR)
    if (ls) {
      let [nextLine] = input.slice(-1)
      while (nextLine) {
        if (nextLine.match(dirR)) {
          const [, dirName] = nextLine.match(dirR)
          current_dir.children.push({ type: 'folder', name: dirName, children: [], up: current_dir })
          input.pop()
        }
        else if (nextLine.match(fileR)) {
          const [, size, fileName] = nextLine.match(fileR)
          current_dir.children.push({ type: 'file', name: fileName, size: parseInt(size) })
          input.pop()
        }
        else break
        nextLine = input.slice(-1)[0]
      }
    }
  }
  calcSizes(dirs)
  const foldersWithSizes = getAllFoldersWithSizeLessThan1000(dirs)
  const ans = lodash.sum(foldersWithSizes.map(_ => _.size))
  return ans
};

run({
  part1: {
    tests: [
      {
        input: `$ cd /
        $ ls
        dir a
        14848514 b.txt
        8504156 c.dat
        dir d
        $ cd a
        $ ls
        dir e
        29116 f
        2557 g
        62596 h.lst
        $ cd e
        $ ls
        584 i
        $ cd ..
        $ cd ..
        $ cd d
        $ ls
        4060174 j
        8033020 d.log
        5626152 d.ext
        7214296 k`,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `$ cd /
        $ ls
        dir a
        14848514 b.txt
        8504156 c.dat
        dir d
        $ cd a
        $ ls
        dir e
        29116 f
        2557 g
        62596 h.lst
        $ cd e
        $ ls
        584 i
        $ cd ..
        $ cd ..
        $ cd d
        $ ls
        4060174 j
        8033020 d.log
        5626152 d.ext
        7214296 k`,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
