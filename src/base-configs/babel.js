const babelRegister = require('@babel/register');

/**
 * Utility wrapper over @babel/register
 * Must be called before any attempts to use modern syntax within node
 * @param babelOptions
 */
module.exports = function startBabelRegister(babelOptions) {
	babelRegister({
		presets: [
			[
				"@babel/preset-env",
				{
					targets: {
						node: "current"
					}
				}
			]
		],
		...babelOptions
	});
}