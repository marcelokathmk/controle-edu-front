import React, {Component} from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { bindActionCreators } from 'redux';
import { getEscolas, create, update, remove } from '../../../service/EscolaService';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toastr } from 'react-redux-toastr';

class Escola extends Component {
    
    constructor(props){
        super(props);
        this.state = { escolas: [], descricao: '', id: ''}
        this.handleChange = this.handleChange.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.save = this.save.bind(this);
    }

    componentWillMount(){
        this.props.getEscolas();
    }

    renderRows(){
        const list = this.props.escolas || []
        return list.map(esc => (
            <tr key={esc.id}>
                <td>{esc.descricao}</td>
                <td width="85px"><Button type="button" variant="warning" onClick={(e) => this.edit(esc.id, esc.descricao)}>Alterar</Button></td>
                <td width="85px"><Button type="button" variant="danger" onClick={(e) => this.delete(esc.id)}>Excluir</Button></td>
            </tr>
        ))
    }

    handleChange(e) {
        this.setState({...this.state, descricao: e.target.value});
    }

    edit(codigo, descr){
        this.setState({...this.state, descricao: descr, id: codigo});
    }

    delete(codigo){
        const toastrConfirmOptions = {
            onOk: () => this.props.remove(codigo)
        };
        toastr.confirm('Deseja realmente excluir a escola?', toastrConfirmOptions);
    }

    save(){
        if  (this.state.id){
            this.props.update(this.state.id, this.state.descricao);
        }else{
            this.props.create(this.state.descricao);
        }
        
        this.clearFields();
    }

    clearFields(){
        this.setState({...this.state, descricao: '', id: 0});
    }
    
    render(){
        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>Manter Escolas</Card.Title>
                        <Form>
                            <Form.Group controlId="formEscola">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Informe o nome da escola" value={this.state.descricao} onChange={this.handleChange} />
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={this.save}>Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <Table striped bordered hover responsive="lg">
                    <thead>
                        <tr>
                            <th>Nome</th>
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

const mapStateToProps = state => ({escolas: state.escolaReducer.escolas})
const mapDispatchToProps = dispatch => bindActionCreators({getEscolas, create, update, remove}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Escola);