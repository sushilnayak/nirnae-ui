import { all , fork} from "redux-saga/effects";
import editor from './editor'

export default function* index() {
  yield all([fork(editor)]);
}
