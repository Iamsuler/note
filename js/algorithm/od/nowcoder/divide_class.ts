// 幼儿园两个班的小朋友在排队时混在了一起，每位小朋友都知道自己是否与前面一位小朋友是否同班，请你帮忙把同班的小朋友找出来。

// 小朋友的编号为整数，与前一位小朋友同班用Y表示，不同班用N表示。

// 输入描述:

// 输入为空格分开的小朋友编号和是否同班标志。
// 比如：6/N 2/Y 3/N 4/Y，表示共4位小朋友，2和6同班，3和2不同班，4和3同班。
// 其中，小朋友总数不超过999，每个小朋友编号大于0，小于等于999。
// 不考虑输入格式错误问题。
// 输出描述:

// 输出为两行，每一行记录一个班小朋友的编号，编号用空格分开。且：

// 编号需要按照大小升序排列，分班记录中第一个编号小的排在第一行。
// 若只有一个班的小朋友，第二行为空行。
// 若输入不符合要求，则直接输出字符串ERROR。
// 示例1：

// 输入
// 1/N 2/Y 3/N 4/Y
// 输出

// 1 2
// 3 4
// 说明

// 2的同班标记为Y，因此和1同班。
// 3的同班标记为N，因此和1、2不同班。
// 4的同班标记为Y，因此和3同班。
// 所以1、2同班，3、4同班，输出为
// 1 2
// 3 4

function nowcoder_divide_class(str: string): number[][] {
  let arr = str.split(' ');
  let len = arr.length;
  let res: number[][] = [[], []];
  let start = 0;

  res[0].push(Number(arr[0].split('/')[0]))

  for (let i = 1; i < len; i++) {
    let [n, flag] = arr[i].split('/');
    let cur = Number(n);

    if (flag === 'N') {
      start = start === 0 ? 1 : 0;
    }
    res[start].push(cur);
  }

  return res;
}

console.log(nowcoder_divide_class('1/N 2/Y 3/N 4/Y 5/Y 6/Y 7/N'));