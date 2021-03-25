// 约定：
// title数据类型为String
// userId为主键，数据类型为Number
var data = [
  {userId: 8,  title: 'title1'},
  {userId: 11, title: 'other'},
  {userId: 15, title: null},
  {userId: 19, title: 'title2'}
];


var find = function(origin) {
  return new Find(origin);
}

function Find(data) {
  this.value = data;
}
Find.prototype.where = function(rule) {
  var [key, reg] = Object.entries(rule)[0];
  const data = this.value;
  var filteredData = data.filter(item => {
    return reg.test(item[key]);
  })
  return new Find(filteredData);
}

Find.prototype.orderBy = function(key, sortType) {
  const data = this.value;
  data.sort(function (a,b) {
    return sortType === 'desc' ? b[key] - a[key] : a[key] - b[key]
  });
  return this;
}
Find.prototype.get = function() {
  return this.value;
}
// 查找 data 中，符合条件的数据，并进行排序
var result = find(data).where({'title': /\d$/}).orderBy('userId', 'desc').get();
console.log(result);
// [{ userId: 19, title: 'title2'}, { userId: 8, title: 'title1' }];