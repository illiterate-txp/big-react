import {FiberNode} from "./fiber";
import {beginWork} from "./beginWork";
import {completeWork} from "./completeWork";

let workInProgress: FiberNode | null = null;

function prepareRefreshStack(fiber: FiberNode) {
    workInProgress = fiber;
}

// 执行更新的过程
function renderRoot(root: FiberNode) {
    // 初始化workInProgress
    prepareRefreshStack(root);

    do {
        try {
            workLoop();
            break;
        }
        catch(e) {
            console.warn("workLoop发生错误", e);
            workInProgress = null;
        }
    } while(true)
}

function workLoop() {
    while (workInProgress !== null) {
        performUnitOfWork(workInProgress);
    }
}

// performUnitOfWork => 更新workInProgress的值
function performUnitOfWork(fiber: FiberNode) {
    const next = beginWork(fiber);
    // 工作完之后，memorizedProps中的属性状态 更新为 想要更新的状态pendingProps
    fiber.memorizedProps = fiber.pendingProps;

    // 无子节点 null, 遍历兄弟节点
    if (next === null) {
        completeUnitOfWork(fiber);
    } else {
        // 遍历孩子节点
        workInProgress = next;
    }
}

function completeUnitOfWork(fiber: FiberNode) {
    let node: FiberNode | null = fiber;

    do {
        completeWork(node);

        const sibling = node.sibling;
        if (sibling !== null) {
            workInProgress = sibling;
            return;
        }
        node = node.return;
        workInProgress = null;
    } while (true)

}
