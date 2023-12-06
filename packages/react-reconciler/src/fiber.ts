import {Props, Key, Ref} from "shared/ReactTypes"
import {WorkTag} from "./WorkTags";
import {Flags, NoFlags} from "./fiberFlags";

export class FiberNode {
    type: any;
    tag: WorkTag;
    key: Key;
    stateNode: any;

    return: FiberNode | null;
    sibling: FiberNode | null;
    child: FiberNode | null;
    index: number;

    ref: Ref;

    pendingProps: Props;
    memorizedProps: Props;

    // 用于交换 current 和 WorkInProgress 两科fiber树
    alternate: FiberNode | null;
    flags: Flags;


    // pendingProps => 有哪些属性需要改变
    constructor(tag: WorkTag, pendingProps: Props, key: Key) {
        // 实例的属性
        this.tag = tag;
        this.key = key;
        // 对于HostComponent来说，如果是<div>,则保存的是div的DOM
        this.stateNode = null;
        this.type = null;

        // 构成树状结构
        this.return = null;
        this.sibling = null;
        this.child = null;
        this.index = 0;

        this.ref = null;

        // 作为工作单元
        this.pendingProps = pendingProps;  // 修改前的状态
        this.memorizedProps = null;        // 修改后的状态

        this.alternate = null;
        // 副作用
        this.flags = NoFlags;
    }
}
