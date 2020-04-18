import React, { Component } from 'react'
import BarraBusca from './barraBusca'
import ListaPaginacao from './listaPaginacao'

class EspeciesComponent extends Component {

    state = {
        especies: [],
        loading: false,
        busca: '',
        pagina: 1
    }

    parametrosEspecies = [
        'name',
        'classification',
        'skinColors',
        'eyeColors'
    ]

    numItensPorPagina = 5

    alteraPagina = (pagina = null) => {
        this.setState({
            pagina
        })
    }

    componentDidMount() {
        this.exibeEspecies()
        this.setState({
            loading: true
        })
    }

    listaPaginadaEspecies = () => {
        let pagina = this.state.pagina
        let especies = this.listaFiltradaEspecies()
        let especiesF = null
        if (especies) {
            especiesF = especies.filter((el, i) => {
                let inicioEm = (pagina - 1) * this.numItensPorPagina
                let finalEm = pagina * this.numItensPorPagina - 1
                if ((i >= inicioEm) && (i <= finalEm)) {
                    return true
                }
                return false
            })
        }
        return especiesF
    }

    listaFiltradaEspecies = () => {
        let especies = this.state.especies
        let busca = this.state.busca
        if (busca) {
            especies = especies.filter(e => (e.name.toLowerCase().includes(busca.toLowerCase())))
        }
        return especies
    }

    alteraTextoBusca = busca => {
        this.setState({
            busca,
            pagina: 1
        })
    }

    geraTabela = () => {
        let especies = this.listaPaginadaEspecies()
        let linhas = especies.map(e => {
            let olhosString = ""
            if(e.eyeColors){
                olhosString = e.eyeColors.join(", ")
            }

            let peleString = ""
            if(e.skinColors){
                peleString = e.skinColors.join(", ")
            }

            return (
                <tr>
                    <td>{e.name}</td>
                    <td>{e.classification}</td>
                    <td>{olhosString}</td>
                    <td>{peleString}</td>
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
                            <th>Classificação</th>
                            <th>Cor dos olhos</th>
                            <th>Cor da pele</th>
                        </tr>
                    </thead>
                    <tbody>
                        {linhas}
                    </tbody>
                </table>
            </div>
        )
    }

    exibeEspecies = () => {
        const Specie = this.props.parse.Object.extend('Specie')
        const query = new this.props.parse.Query(Specie)
        query.ascending("name");
        const especies = []
        query.find().then(results => {
            results.forEach(element => {
                let especieInt = {
                    id: element.id
                }
                this.parametrosEspecies.forEach(param => {
                    especieInt[param] = element.get(param)
                })    
                especies.push(especieInt)
            });
            setTimeout(() => {
                this.setState({
                    especies,
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
                        <h5>Raças</h5>
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
                            <ListaPaginacao pagina={this.state.pagina} alteraPagina={(p) => this.alteraPagina(p)} numItensPorPagina={this.numItensPorPagina} itens={this.listaFiltradaEspecies()} />
                        </div>
                    </div>
                ) : null}
            </div>
        )
    }


}

export default EspeciesComponent