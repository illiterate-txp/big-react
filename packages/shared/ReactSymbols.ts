// 用Symbol是防止 “react.element” 被滥用

// 判断当前环境是否支持symbol
const supportSymbol = typeof Symbol === 'function' && Symbol.for;

// 支持symbol的话返回 symbol 定义的独一无二的值，否则的话返回一个数字
export const REACT_ELEMENT_TYPE = supportSymbol
	? Symbol.for('react.element')
	: 0xeac7;
