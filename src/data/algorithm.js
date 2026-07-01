export const algorithmPosts = [
  {
    id: 'a1',
    title: '快速排序（Quick Sort）深度解析',
    date: '2026-06-20',
    tags: ['排序', '分治', '热门'],
    difficulty: '中级',
    readTime: 12,
    excerpt: '快速排序是最常用的排序算法之一。本文从原理、实现、优化到复杂度分析，全方位解读快排。',
    content: `
      <h2>算法简介</h2>
      <p>快速排序（Quick Sort）由 C. A. R. Hoare 在 1960 年提出，是一种基于分治思想的排序算法。</p>
      <h3>核心思想</h3>
      <ol>
        <li>从数组中选一个元素作为"基准"（pivot）</li>
        <li>将数组分为两部分：小于基准的放左边，大于基准的放右边</li>
        <li>递归地对左右两部分进行排序</li>
      </ol>
      <h3>JavaScript 实现</h3>
      <pre><code>function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}</code></pre>
      <h3>时间复杂度</h3>
      <ul>
        <li>平均情况：O(n log n)</li>
        <li>最坏情况：O(n²) - 当数组已经有序时</li>
        <li>最好情况：O(n log n)</li>
      </ul>
      <h3>空间复杂度</h3>
      <p>O(log n) - 递归调用栈的深度</p>
      <blockquote>快速排序虽然平均时间复杂度为 O(n log n)，但在实际应用中通常比其他 O(n log n) 算法更快。</blockquote>
    `
  },
  {
    id: 'a2',
    title: '二分搜索（Binary Search）详解',
    date: '2026-06-15',
    tags: ['搜索', '基础'],
    difficulty: '入门',
    readTime: 8,
    excerpt: '二分搜索是每个程序员必须掌握的基础算法。在有序数组中快速定位目标值。',
    content: `
      <h2>算法简介</h2>
      <p>二分搜索（Binary Search）在有序数组中查找目标值，每次将搜索范围缩小一半。</p>
      <h3>前提条件</h3>
      <p>数组必须是<strong>有序</strong>的。</p>
      <h3>JavaScript 实现</h3>
      <pre><code>function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}</code></pre>
      <h3>时间复杂度</h3>
      <ul>
        <li>O(log n) - 每次将搜索范围减半</li>
      </ul>
      <blockquote>二分搜索的思想不仅适用于数组搜索，还广泛应用于各种算法问题中。</blockquote>
    `
  },
  {
    id: 'a3',
    title: '动态规划入门：从斐波那契到背包问题',
    date: '2026-06-10',
    tags: ['动态规划', '进阶'],
    difficulty: '高级',
    readTime: 15,
    excerpt: '动态规划是解决最优化问题的强大工具。通过斐波那契数列和0/1背包问题，理解DP的核心思想。',
    content: `
      <h2>什么是动态规划？</h2>
      <p>动态规划（Dynamic Programming, DP）通过将复杂问题分解为更小的子问题来求解。</p>
      <h3>两个关键特性</h3>
      <ul>
        <li><strong>最优子结构</strong>：问题的最优解包含子问题的最优解</li>
        <li><strong>重叠子问题</strong>：子问题被重复计算</li>
      </ul>
      <h3>斐波那契数列</h3>
      <pre><code>// 记忆化搜索（自顶向下）
function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n] !== undefined) return memo[n];
  memo[n] = fib(n-1, memo) + fib(n-2, memo);
  return memo[n];
}

// 动态规划（自底向上）
function fibDP(n) {
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  return dp[n];
}</code></pre>
      <h3>0/1 背包问题</h3>
      <pre><code>function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(n+1).fill(0)
    .map(() => Array(capacity+1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(
          values[i-1] + dp[i-1][w-weights[i-1]],
          dp[i-1][w]
        );
      } else {
        dp[i][w] = dp[i-1][w];
      }
    }
  }
  return dp[n][capacity];
}</code></pre>
      <blockquote>掌握动态规划需要大量练习，但一旦理解，你会发现它优雅而强大。</blockquote>
    `
  },
  {
    id: 'a4',
    title: '图的遍历：DFS 与 BFS',
    date: '2026-06-05',
    tags: ['图', '搜索', '基础'],
    difficulty: '中级',
    readTime: 10,
    excerpt: '深度优先搜索（DFS）和广度优先搜索（BFS）是图论中最基本的两种遍历方式。',
    content: `
      <h2>深度优先搜索（DFS）</h2>
      <p>DFS 使用栈（递归或显式栈）来遍历图，尽可能深地探索分支。</p>
      <pre><code>function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  console.log(start);
  
  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}</code></pre>
      <h2>广度优先搜索（BFS）</h2>
      <p>BFS 使用队列，按层遍历图。</p>
      <pre><code>function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);
  
  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node);
    
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}</code></pre>
      <blockquote>DFS 适合寻找所有解，BFS 适合寻找最短路径。</blockquote>
    `
  }
]