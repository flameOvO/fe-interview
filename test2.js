/**
 * @param {number} i
 * @param {number} j
 */
 function hash(i, j) {
   return `${i}-${j}`;
}

/**
* @param {number[][]} matrix
* @return {number[]}
*/
var spiralOrder = function(matrix) {
   const m = matrix.length;
   if (!m) {
       return [];
   }

   const n = matrix[0].length;
   if (!n) {
       return [];
   }

   const results = []; // 遍历结果
   const visited = {}; // 记录元素是否被访问过
   const directions = [
       [0, 1],
       [1, 0],
       [0, -1],
       [-1, 0]
   ]; // 顺时针方向数组

   for (let step = 0, row = 0, col = 0, dIdx = 0; step < m * n; ++step) {
       results.push(matrix[row][col]);
       visited[hash(row, col)] = true;
       // 最巧妙的地方：借助方向数组来进行row、col的更新
       const newR = row + directions[dIdx][0];
       const newC = col + directions[dIdx][1];

       if (
           !visited[hash(newR, newC)] &&
           newR >= 0 &&
           newR < m &&
           newC >= 0 &&
           newC < n
       ) {
           row = newR;
           col = newC;
       } else {
           // 转变方向
           dIdx = (dIdx + 1) % 4;
           row += directions[dIdx][0];
           col += directions[dIdx][1];
       }
   }

   return results;
};
