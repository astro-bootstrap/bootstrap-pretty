#!/usr/bin/env node

/*!
 * Bootstrap Pretty 0.2.0 (https://github.com/bootstrap-pretty/bootstrap-pretty#readme)
 * Based on Bootstrap 5.3.0-alpha1 (https://getbootstrap.com/docs/5.3/getting-started/introduction/)
 * Copyright 2011-2023 Bootstrap (https://getbootstrap.com)
 * Copyright 2023 Bootstrap Pretty (https://bootstrappretty.dev)
 * Original code licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * Licensed under MIT (https://github.com/bootstrap-pretty/bootstrap-pretty/blob/master/LICENSE)
 */

'use strict';

const path = require('node:path');
const rollup = require('rollup');
const globby = require('globby');
const { babel } = require('@rollup/plugin-babel');
const banner = require('./banner.js');

const sourcePath = path.resolve(__dirname, '../js/src/').replace(/\\/g, '/');
const jsFiles = globby.sync(`${sourcePath}/**/*.js`);

// Array which holds the resolved plugins
const resolvedPlugins = [];

// Trims the "js" extension and uppercases => first letter, hyphens, backslashes & slashes
const filenameToEntity = filename => filename.replace('.js', '')
  .replace(/(?:^|-|\/|\\)[a-z]/g, str => str.slice(-1).toUpperCase());

for (const file of jsFiles) {
    resolvedPlugins.push({
        src: file,
        dist: file.replace('src', 'dist'),
        fileName: path.basename(file),
        className: filenameToEntity(path.basename(file))
        // safeClassName: filenameToEntity(path.relative(sourcePath, file))
    });
}

const build = async plugin => {
    const globals = {};

    const bundle = await rollup.rollup({
        input: plugin.src,
        plugins: [
            babel({
                // Only transpile our source code
                exclude: 'node_modules/**',
                // Include the helpers in each file, at most one copy of each
                babelHelpers: 'bundled'
            })
        ],
        external(source) {
            // Pattern to identify local files
            const pattern = /^(\.{1,2})\//;

            // It's not a local file, e.g a Node.js package
            if (!pattern.test(source)) {
                globals[source] = source;
                return true;
            }

            const usedPlugin = resolvedPlugins.find(plugin => {
                return plugin.src.includes(source.replace(pattern, ''));
            });

            if (!usedPlugin) {
                throw new Error(`Source ${source} is not mapped!`);
            }

            // We can change `Index` with `UtilIndex` etc if we use
            // `safeClassName` instead of `className` everywhere
            globals[path.normalize(usedPlugin.src)] = usedPlugin.className;
            return true;
        }
    });

    await bundle.write({
        banner: banner(plugin.fileName),
        format: 'umd',
        name: plugin.className,
        sourcemap: true,
        globals,
        generatedCode: 'es2015',
        file: plugin.dist
    });

    console.log(`Built ${plugin.className}`);
};

(async () => {
    try {
        const basename = path.basename(__filename);
        const timeLabel = `[${basename}] finished`;

        console.log('Building individual plugins...');
        console.time(timeLabel);

        await Promise.all(Object.values(resolvedPlugins).map(plugin => build(plugin)));

        console.timeEnd(timeLabel);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();