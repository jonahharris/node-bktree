// Burkhard-Keller Tree (BK-Tree) Example
// Jonah H. Harris <jonah.harris@gmail.com>

var levenshtein = (function () {
  var row2 = [];
  return function (s1, s2) {
    if (s1 === s2) {
      return 0;
    } else {
      var s1_len = s1.length,
        s2_len = s2.length;
      if (s1_len && s2_len) {
        var i1 = 0,
          i2 = 0,
          a, b, c, c2, row = row2;
        while (i1 < s1_len)
          row[i1] = ++i1;
        while (i2 < s2_len) {
          c2 = s2.charCodeAt(i2);
          a = i2;
          ++i2;
          b = i2;
          for (i1 = 0; i1 < s1_len; ++i1) {
            c = a + (s1.charCodeAt(i1) === c2 ? 0 : 1);
            a = row[i1];
            b = b < a ? (b < c ? b + 1 : c) : (a < c ? a + 1 : c);
            row[i1] = b;
          }
        }
        return b;
      } else {
        return s1_len + s2_len;
      }
    }
  };
})();

function bktree (term) {
  if (term instanceof Array) {
    var tree = new bktree(term.pop);
    tree.addTerms(term);
    return tree;
  }
  this.term = term;
  this.children = {};
}

bktree.prototype.addTerms = function (newTerms) {
  var len = newTerms.length;
  for (ii = 0; ii < len; ++ii) {
    this._addTerm(newTerms[ii]);
  }
};

bktree.prototype._addTerm = function (newTerm) {
  var dist = levenshtein(this.term, newTerm);
  if ('undefined' !== typeof this.children[dist]) {
    this.children[dist]._addTerm(newTerm);
  } else {
    this.children[dist] = new bktree(newTerm);
  }
};

bktree.prototype.query = function (queryTerm, maxDist, k) {
  var k = k || null;
  tempResults = [];
  this._query(queryTerm, maxDist, null, tempResults);

  tempResults.sort(function (a, b) {
    return (a.d - b.d);
  });

  var results = [];
  var len = tempResults.length;
  if (null !== k) {
    len = Math.min(k, tempResults.length);
  }
  for (var ii = 0; ii < len; ++ii) {
    results.push(tempResults[ii].t);
  }
  return results;
};

bktree.prototype._query = function (queryTerm, maxDist, d, results) {
  var dist = levenshtein(this.term, queryTerm);
  if (dist <= maxDist) {
    results.push({ t: this.term, d: dist });
  }

  if (null === d) {
    d = dist;
  }

  var min = (dist - maxDist);
  var max = (dist + maxDist);
  for (var ii = min; ii <= max; ++ii) {
    if ('undefined' !== typeof this.children[ii]) {
      this.children[ii]._query(queryTerm, maxDist, d, results);
    }
  }
};

module.exports = bktree;

