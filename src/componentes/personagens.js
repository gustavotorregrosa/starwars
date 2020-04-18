import React, { Component } from 'react'
import BarraBusca from './barraBusca'
import ListaPaginacao from './listaPaginacao'

class PersonagensComponent extends Component {

    state = {
        pessoas: [],
        loading: false,
        busca: '',
        pagina: 1
    }

    parametrosPessoas = [
        'name',
        'height',
        'hairColor',
        'gender'
    ]

    numItensPorPagina = 5

    alteraPagina = (pagina = null) => {
        this.setState({
            pagina
        })
    }

    componentDidMount() {
        this.exibePersonagens()
        this.setState({
            loading: true
        })
    }

    listaPaginadaPessoas = () => {
        let pagina = this.state.pagina
        let pessoas = this.listaFiltradaPessoas()
        let pessoasF = null
        if (pessoas) {
            pessoasF = pessoas.filter((el, i) => {
                let inicioEm = (pagina - 1) * this.numItensPorPagina
                let finalEm = pagina * this.numItensPorPagina - 1
                if ((i >= inicioEm) && (i <= finalEm)) {
                    return true
                }
                return false
            })
        }
        return pessoasF

    }

    listaFiltradaPessoas = () => {
        let pessoas = this.state.pessoas
        let busca = this.state.busca
        if (busca) {
            pessoas = pessoas.filter(p => p.name.toLowerCase().includes(busca.toLowerCase()))
        }
        return pessoas
    }

    alteraTextoBusca = busca => {
        this.setState({
            busca,
            pagina: 1
        })
    }



    geraTabela = () => {
        let pessoas = this.listaPaginadaPessoas()
        let linhas = pessoas.map(p => {
            return (
                <tr>
                    <td>{p.name}</td>
                    <td>{p.height}</td>
                    <td>{p.hairColor}</td>
                    <td>{p.gender}</td>
                </tr>
            )
        })

        return (
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                padding: '1em',
                borderRadius: '1em'
            }}>
                <table >
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Altura</th>
                            <th>Cabelo</th>
                            <th>Gênero</th>
                        </tr>
                    </thead>
                    <tbody>
                        {linhas}
                    </tbody>
                </table>

            </div>

        )
    }

    exibePersonagens = () => {
        const Character = this.props.parse.Object.extend('Character')
        const query = new this.props.parse.Query(Character)
        query.ascending("name");
        const pessoas = []
        query.find().then(results => {
            results.forEach(element => {
                let pessoaInt = {
                    id: element.id
                }
                this.parametrosPessoas.forEach(param => {
                    pessoaInt[param] = element.get(param)
                })
                pessoas.push(pessoaInt)
            });
            setTimeout(() => {
                this.setState({
                    pessoas,
                    loading: false
                })
            }, 1000)
        })


    }

    render() {
        return (
            <div>
                <div className="row">
                    <div style={{ textAlign: 'center' }} className="col s6">
                        <h5>Personagens</h5>
                    </div>
                    <div className="col s6">
                        <BarraBusca informaTxtBusca={(t) => this.alteraTextoBusca(t)} />
                    </div>
                </div>

                <br />
                {this.state.loading ? <div className="progress"><div className="indeterminate"></div></div> : this.geraTabela()}
                {!this.state.loading ? (
                    <div className="row">
                        <div style={{ textAlign: 'center' }}>
                            <ListaPaginacao pagina={this.state.pagina} alteraPagina={(p) => this.alteraPagina(p)} numItensPorPagina={this.numItensPorPagina} itens={this.listaFiltradaPessoas()} />
                        </div>
                    </div>
                ) : null}
            </div>
        )
    }


}

export default PersonagensComponent