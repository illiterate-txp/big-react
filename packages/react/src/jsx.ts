// jsx 与 React.createElement的返回值是 ReactElement格式
// 首先定义 ReactElement 构造函数

import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Key,
	Ref,
	Props,
	ReactElementType,
	ElementType
} from 'shared/ReactTypes';

// 该方法返回 ReactElement
const ReactElement = function (
	type: ElementType,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		// __mark字段 是为了与真实的 React 区分开，实际React代码中不存在该字段
		__mark: 'TianXiaoping'
	};

	return element;
};

export const jsx = (type: ElementType, config: any) => {
	// 会被强制转换为字符串。如果缺失则为 null
	let key: Key = null;
	// 如果缺失则为 null
	let ref: Ref = null;
	const props: Props = {};

	// 除了 key 及 ref 属性，其他的放到props中
	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key' && val !== undefined) {
			key = '' + val;
			continue;
		}
		if (prop === 'ref' && val !== undefined) {
			ref = val;
			continue;
		}
		// 判断是否是其原型链上的类型
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	return ReactElement(type, key, ref, props);
};

export const jsxDEV = jsx;
