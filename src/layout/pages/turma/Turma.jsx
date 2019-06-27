import React, {Component} from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { bindActionCreators } from 'redux';
import { getEscolas } from '../../../service/EscolaService';
import { getTurmas, create, update, remove } from '../../../service/TurmaService';
import { toastr } from 'react-redux-toastr';

class Turma extends Component{

    constructor(props){
        super(props);
        this.state = { escolas: [], turmas: [], escola: 0, descricao: '', id: 0 }
        this.selectSchool = this.selectSchool.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderRows = this.renderRows.bind(this);
        this.save = this.save.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentWillMount(){
        this.props.getEscolas();
    }

    selectSchool(e){
        const escolaSelecionada = e.currentTarget.value;
        this.setState({...this.state, escola: escolaSelecionada, descricao: '', id: 0});
        this.props.getTurmas(escolaSelecionada);
    }

    renderSchools(){
        const list = this.props.escolas || []
        return list.map(esc => (
            <option key={esc.id} value={esc.id}>{esc.descricao}</option>
        ))
    }

    handleChange(e){
        this.setState({...this.state, descricao: e.target.value});
        this.renderRows();
    }

    renderRows(){
        const list = this.props.turmas || []
        return list.map(esc => (
            <tr key={esc.id}>
                <td>{esc.descricao}</td>
                <td width="85px"><Button type="button" variant="warning" onClick={(e) => this.edit(esc.id, esc.descricao)}>Alterar</Button></td>
                <td width="85px"><Button type="button" variant="danger" onClick={(e) => this.delete(esc.id, this.state.escola)}>Excluir</Button></td>
            </tr>
        ))
    }

    clearFields(){
        this.setState({...this.state, descricao: '', id: 0});
    }

    edit(codigo, descr){
        this.setState({...this.state, descricao: descr, id: codigo});
    }

    delete(codigo, escola){
        const toastrConfirmOptions = {
            onOk: () => this.props.remove(codigo, escola)
        };
        toastr.confirm('Deseja realmente excluir a turma?', toastrConfirmOptions);
    }

    save(){
        if  (this.state.id){
            this.props.update(this.state.escola, this.state.id, this.state.descricao);
        }else{
            this.props.create(this.state.escola, this.state.descricao);
        }
        this.clearFields();
    }

    render(){
        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>Manter Turmas</Card.Title>
                        <Form>
                            <Form.Group controlId="fieldEscola">
                                <Form.Label>Escola</Form.Label>
                                <Form.Control as="select" onChange={this.selectSchool} value={this.state.escola}>
                                    <option value={0}>Selecione a escola</option>
                                    {this.renderSchools()}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="fieldTurma">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Informe o nome da turma" value={this.state.descricao} onChange={this.handleChange} />
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={this.save}>Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <Table striped bordered hover responsive="lg">
                    <thead>
                        <tr>
                            <th>Turmas</th>
                            <th width="85px"></th>
                            <th width="85px"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </Table>
            </Container> 
        )
    }
}

const mapStateToProps = state => ({escolas: state.escolaReducer.escolas, turmas: state.turmaReducer.turmas})
const mapDispatchToProps = dispatch => bindActionCreators({getEscolas, getTurmas, create, update, remove}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Turma);