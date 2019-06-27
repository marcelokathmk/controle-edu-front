import axios from 'axios';
import { toastr } from 'react-redux-toastr';

const BASE_URL = 'http://localhost:9090/escola';

export const getEscolas = () => {
    const request = axios.get(`${BASE_URL}`);
    return {
        type: 'RETORNO_ESCOLAS',
        payload: request
    }
}

export const create = (descricao) => {
    return dispatch => {
        axios.post(`${BASE_URL}`, { descricao } )
        .then(resp => dispatch({type: 'CRIACAO_ESCOLA', payload: resp.data}))
        .then(resp => {
            toastr.success('Sucesso', 'Escola criada com sucesso.');
            dispatch(getEscolas())
        })
        .catch(
            e => {
                if  (e.response.data.status === 422){
                    toastr.warning('Atenção', e.response.data.message);
                }else{
                    toastr.error('Erro', e.response.data.message);
                }
            }
        )
    }
}

export const update = (id, descricao) => {
    return dispatch => {
        axios.put(`${BASE_URL}/${id}`, { id, descricao } )
        .then(resp => dispatch({type: 'ATUALIZACAO_ESCOLA', payload: resp.data}))
        .then(resp => {
            toastr.success('Sucesso', 'Atualização de escola realizada com sucesso.');
            dispatch(getEscolas()) 
        })
        .catch(
            e => {
                if  (e.response.data.status === 422){
                    toastr.warning('Atenção', e.response.data.message);
                }else{
                    toastr.error('Erro', e.response.data.message);
                }
            }
        )
    }
}

export const remove = (codigo) => {
    return dispatch => {
        axios.delete(`${BASE_URL}/${codigo}`)
        .then(resp => dispatch({type: 'EXCLUSAO_ESCOLA', payload: resp.data}))
        .then(resp => {
            toastr.success('Sucesso', 'Escola removida com sucesso.');
            dispatch(getEscolas())
        })
        .catch(
            e => {
                toastr.error(e.response.data.error, e.response.data.message);
            }
        )
    }
}