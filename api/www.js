#!/usr/bin/env node
require('@babel/register')({
	extends: './.babelrc',
	ignore: [/node_modules/],
});

require("./server");