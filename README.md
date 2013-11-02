```javascript
// Burkhard-Keller Tree (BK-Tree) Example
// Jonah H. Harris <jonah.harris@gmail.com>
var bktree = require('./index');
var terms = [
  'accommodate', 'accommodation', 'achieve', 'across',
  'aggression', 'aggressive', 'apparently', 'appearance',
  'argument', 'assassination', 'basically', 'beginning',
  'believe', 'bizarre', 'business', 'calendar',
  'caribbean', 'cemetery', 'chauffeur', 'colleague',
  'coming', 'committee', 'completely', 'conscious',
  'curiosity', 'definitely', 'dilemma', 'disappear',
  'disappoint', 'ecstasy', 'embarrass', 'environment',
  'existence', 'fahrenheit', 'familiar', 'finally',
  'fluorescent', 'foreign', 'foreseeable', 'forty',
  'forward', 'friend', 'further', 'gist',
  'glamorous', 'government', 'guard', 'happened',
  'harass', 'harassment', 'honorary', 'humorous',
  'idiosyncrasy', 'immediately', 'incidentally', 'independent',
  'interrupt', 'irresistible', 'knowledge', 'liaise',
  'liaison', 'lollipop', 'millennia', 'millennium',
  'neanderthal', 'necessary', 'noticeable', 'occasion',
  'occurred', 'occurrence', 'occurring', 'pavilion',
  'persistent', 'pharaoh', 'piece', 'politician',
  'portuguese', 'possession', 'preferred', 'preferring',
  'propaganda', 'publicly', 'really', 'receive',
  'referred', 'referring', 'religious', 'remember',
  'resistance', 'sense', 'separate', 'siege',
  'successful', 'supersede', 'surprise', 'tattoo',
  'tendency', 'therefore', 'threshold', 'tomorrow',
  'tongue', 'truly', 'unforeseen', 'unfortunately',
  'until', 'weird', 'wherever', 'which'
  ];

// Build the tree
var tree = new bktree(terms);

// Get correctly spelled words at distance <= 3
var r = tree.query('refered', 3);
// [ 'referred', 'preferred' ]

// Return closest
var r = tree.query('refered', 3, 1);
// [ 'referred' ]
```
