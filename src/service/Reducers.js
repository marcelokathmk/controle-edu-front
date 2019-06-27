import { combineReducers } from 'redux';
import EscolaReducer from './EscolaReducer';
import TurmaReducer from './TurmaReducer';
import { reducer as toastrReducer } from 'react-redux-toastr';

const rootReducer = combineReducers({
    escolaReducer: EscolaReducer,
    turmaReducer: TurmaReducer,
    toastr: toastrReducer
})

export default rootReducer;