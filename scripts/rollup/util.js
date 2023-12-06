import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';

// 所有包的路径
const pkgPath = path.resolve(__dirname, '../../packages');
// 打包产物的路径
// 因为打包产物不止有一个包，而npm包都是放在node_modules文件夹下
// 所以这里打包产物目录放置在node_modules之下
const distPath = path.resolve(__dirname, '../../dist/node_modules');

// 解析包的路径
// pkgName: 包名；    isDisk: 是否是打包产物
export function resolvePkgPath(pkgName, isDisk) {
	if (isDisk) {
		return `${distPath}/${pkgName}`;
	}
	return `${pkgPath}/${pkgName}`;
}

export function getPackageJson(pkgName) {
	const path = `${resolvePkgPath(pkgName)}/package.json`;
	const str = fs.readFileSync(path, { encoding: 'utf-8' });
	return JSON.parse(str);
}

export function getBaseRollupPlugins({ typescript = {} } = {}) {
	return [cjs(), ts(typescript)];
}
