import * as assert from 'assert';

import { pathSimplify } from '../util';

const suites = [
  ['g8up', 'g8up',],
  ['/g8up', 'g8up',],
  ['./g8up', 'g8up',],
  ['./g8up.js', 'g8up.js',],
  ['./g8up/', 'g8up/',],
  ['./g8up/cn', 'g8up/cn',],
  ['../g8up', 'g8up',],
  ['../../g8up', 'g8up',],
  ['../../../g8up', 'g8up',],
  ['.gitignore', '.gitignore',],
];

suites.forEach(suite => {
  const [suiteCase, excepted] = suite;
  assert.equal(pathSimplify(suiteCase), excepted, `fail: ${suiteCase}`);
});
