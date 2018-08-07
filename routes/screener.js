var express = require('express');
var router = express.Router();
var data = require('../data').results;
var s = require('../model/stock');


/* GET home page. */
router.get('/', function(req, res, next) {
 var datalist = [];
 var score = {};
 for(var i=0; i<data.length ; i++){
   var l = data[i].length;
   datalist.push(new s.stock(data[i][1],data[i][l-2],data[i][l-1]));
 }
  sortAscendingByPeg(datalist);
  addScore(datalist, score);
  sortDescendingByRoce(datalist);
  addScore(datalist, score);

  res.send(sortByScore(score));
});

var addScore = function (datalist, score) {
  for(var i=0 ; i<datalist.length ; i++){
    var stockname = datalist[i].name;
    if(!score[stockname]){
      score[stockname] = (i+1);
    }else{
      score[stockname] = score[stockname] + (i+1);
    }
  }
};

var sortByScore = function(score){
  var ranklist = []
  Object.keys(score).forEach(function(key,index) {
    ranklist.push(new rank(key, score[key]));
  });
  ranklist.sort(function (a, b) {
    if (a.val < b.val) {
      return -1;
    }
    if (a.val > b.val) {
      return 1;
    }
    return 0;
  });
  console.log(ranklist.length);
  return ranklist;
}

var sortAscendingByPeg = function(datalist){
  datalist.sort(function (a, b) {
    if (a.peg < b.peg) {
      return -1;
    }
    if (a.peg > b.peg) {
      return 1;
    }
    return 0;
  });
};

var sortDescendingByRoce = function(datalist){
  datalist.sort(function (a, b) {
    if (a.roce > b.roce) {
      return -1;
    }
    if (a.roce < b.roce) {
      return 1;
    }
    return 0;
  });
};

function rank(n, val){
  this.n = n;
  this.val = val;
}

module.exports = router;
