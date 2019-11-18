import {all, put,  takeLatest, select} from "@redux-saga/core/effects";
import {ActionTypes} from "../types";

export const getNodeToBeDelete = (state) => state.menuBar

function* editorToolbarDeleteNode() {
    let {deleteType, deleteId} = yield select(getNodeToBeDelete);
    try{
        yield put({type: ActionTypes.WORKSPACE_CANVAS_DELETE_NODE, payload: deleteId})
    }catch (e) {
        //TODO: add action for failure so that fronend is notified
        console.log("There was a problem deleting node")
    }
}

// Editor Saga
export default function* root() {
    yield all([takeLatest(ActionTypes.EDITOR_TOOLBAR_DELETE_ACTION, editorToolbarDeleteNode),])
}