import { add } from './math';
import $ from 'underscore';
import _ from 'lodash'
import res from './async';

add(1, 6);

// 同步任务
$.map([1, 2, 3], function(num){ console.log(num * 3); });

console.log(_.join(['Eddie', 'Gao'], '-'))

res();