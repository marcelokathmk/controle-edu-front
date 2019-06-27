import axios from 'axios';
import { toastr } from 'react-redux-toastr';

const BASE_URL = 'http://localhost:9090/turma';

export const getTurmas = (codigo) => {
    const request = axios.get(`${BASE_URL}/escola/${codigo}`);
    return {
        type: 'RETORNO_TURMAS',
        payload: request
    }
}

export const create = (codigoEscola, descricaoTurma) => {
    const turma = { descricao: descricaoTurma, escola : codigoEscola}
    return dispatch => {
        axios.post(`${BASE_URL}`,turma)
        .then(resp => dispatch({type: 'CRIACAO_TURMA', payload: resp.data}))
        .then(resp => {
            toastr.success('Sucesso', 'Turma criada com sucesso.');
            dispatch(getTurmas(codigoEscola))
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

export const update = (codigoEscola, codigoTurma, descricaoTurma) => {
    const turma = { id: codigoTurma, descricao: descricaoTurma, escola : codigoEscola}
    return dispatch => {
        axios.put(`${BASE_URL}/${codigoTurma}`, turma)
        .then(resp => dispatch({type: 'ATUALIZACAO_TURMA', payload: resp.data}))
        .then(resp => {
            toastr.success('Sucesso', 'Atualização de turma realizada com sucesso.');
            dispatch(getTurmas(codigoEscola)) 
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

export const remove = (codigoTurma, codigoEscola) => {
    return dispatch => {
        axios.delete(`${BASE_URL}/${codigoTurma}`)
        .then(resp => dispatch({type: 'EXCLUSAO_TURMA', payload: resp.data}))
        .then(resp => {
            toastr.success('Sucesso', 'Turma removida com sucesso.');
            dispatch(getTurmas(codigoEscola))
        })
        .catch(
            e => {
                toastr.error(e.response.data.status +' '+ e.response.data.error);
            }
        )
    }
}