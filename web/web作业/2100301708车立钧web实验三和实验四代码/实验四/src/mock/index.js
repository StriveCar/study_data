// 首先引入Mock
import shopping from './json/shoppingList';
const Mock = require('mockjs');

Mock.mock("/shoppingList", {code: 200, data: shopping})
