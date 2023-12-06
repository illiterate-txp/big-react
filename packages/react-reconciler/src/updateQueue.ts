import {Action} from "shared/ReactTypes";

export interface Update<State> {
    action: Action<State>;
}

export interface UpdateQueue<State> {
    shared: {
        pending: Update<State> | null;
    }
}

export const createUpdate = <State>(action: Action<State>): Update<State> => {
    return {
        action
    }
}

export const createUpdateQueue = <Action>() => {
    return {
        shared: {
            pending: null
        }
    } as UpdateQueue<Action>
}

// 向 updateQueue 中添加 update
export const enqueueUpdate = <Action>(
    updateQueue: UpdateQueue<Action>,
    update: Update<Action>
) => {
    updateQueue.shared.pending = update;
}

// 这里的State是一个泛型
export const proecssUpdateQueue = <State>(
    baseState: State,
    pendingUpdate: Update<State> | null
): {memorizedState: State} => {

    const result: ReturnType<typeof proecssUpdateQueue<State>> = {
        memorizedState: baseState
    }

    if (pendingUpdate !== null) {
        // baseState 1;  update 2 => memorizedState 2
        // baseState 1;  update (x) => 2 * x   =>  memorizedState 2
        const action = pendingUpdate.action;
        if (action instanceof Function) {
            result.memorizedState = action(baseState);
        } else {
            result.memorizedState = action;
        }
    }

    return result;
}
