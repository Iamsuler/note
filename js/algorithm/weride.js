const mapA = [
  [1, 0, 1, 0],
  [0, 0, 1, 0],
  [1, 1, 1, 0],
  [0, 0, 1, 0],
  [1, 0, 0, 0],
];

const mapB = [
  [1, 1, 1, 0],
  [1, 0, 1, 0],
  [1, 0, 1, 0],
  [0, 0, 0, 1],
  [1, 0, 1, 0],
];

function flat(map) {
  const len = map.length;
  const inLen = map[0].length;
  let canGoingMap = [];

  for (let i = 0; i < inLen; i++) {
    let start = null;
    let subMap = [];
    for (let j = 0; j < len; j++) {
      const cur = map[j][i];
      start = j;
      if (cur === 0 && start === null) {
        start = j;
      } else if (cur === 1 && start !== null) {
        start = null;
        subMap.push([start, j]);
      }
    }

    canGoingMap.push(subMap);
  }

  // 任何一列有都为1的情况
  if (canGoingMap.some((item) => item.length === 0)) {
    return false;
  }

  for (let i = 1; i < inLen - 1; i++) {
    const subMap = canGoingMap[i];
    const subMapLen = subMap.length;
    const nextSubMap = canGoingMap[i + 1];

    for (let j = 0; j < subMap.length; j++) {
      const [subMapStart, subMapEnd] = subMap[j];
      for (let k = 0; k < nextSubMap.length; k++) {
        const [nextSubMapStart, nextSubMapEnd] = nextSubMap[k];
        // 有交集
        if (subMapStart >= nextSubMapStart || nextSubMapEnd >= subMapEnd) {
        }
      }
    }
  }
}

function travers(map) {
  const len = map.length;
  const inLen = map[0].length;
  let result = false;
  const cache = Array.from(new Array(len), () => new Array(inLen).fill(false));

  function dp(lastRow, row, col) {
    // 越界返回
    if (row >= len || col >= inLen) {
      return;
    }

    // 已搜索返回
    if (cache[row][col]) {
      return;
    }
    cache[row][col] = true;

    // 遇墙返回
    if (map[row][col] === 1) {
      result = result || false;
      return;
    }

    // 成功返回
    if (col === inLen - 1 && map[row][col] === 0) {
      result = result || true;
      return;
    }

    // 搜索左侧
    result = dp(row, row, col + 1) || result;

    // 搜索上下
    result =
      (lastRow > row ? dp(row, row - 1, col) : dp(row, row + 1, col)) || result;
  }

  for (let i = 0; i < len; i++) {
    dp(0, i, 0);
  }

  return result;
}
console.time("map");
console.log(travers(mapB));
console.timeEnd("map");
