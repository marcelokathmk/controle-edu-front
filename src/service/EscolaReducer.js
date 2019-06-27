const INITIAL_STATE = {escolas: []}

export default function(state = INITIAL_STATE, action){
    switch (action.type){
        case 'RETORNO_ESCOLAS':
            return { ...state, escolas: action.payload.data}
        default:
            return state
    }
}