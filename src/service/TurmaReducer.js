const INITIAL_STATE = {turmas: []}

export default function(state = INITIAL_STATE, action){
    switch (action.type){
        case 'RETORNO_TURMAS':
            return { ...state, turmas: action.payload.data}
        default:
            return state
    }
}