// WorkTags 代表 FiberNode 是什么类型的节点

// 函数组件类型的节点
export const FunctionComponent = 0;
// 渲染的根节点 => eg. react.render...
export const HostRoot = 3;
// <HostComponent> HostText </HostComponent>
export const HostComponent = 5;
export const HostText = 6;


export type WorkTag = typeof FunctionComponent | typeof HostRoot | typeof HostComponent | typeof HostText;
