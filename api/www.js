#!/usr/bin/env node
require('@babel/register')({
	extends: './.babelrc',
	ignore: [/node_modules/],
	cache: false,
});

require("./server");