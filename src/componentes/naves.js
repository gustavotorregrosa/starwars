import React, { Component } from 'react'
import BarraBusca from './barraBusca'
import ListaPaginacao from './listaPaginacao'

class NavesComponent extends Component {

    state = {
        naves: [],
        loading: false,
        busca: '',
        pagina: 1
    }

    parametrosNaves = [
        'model',
        'starshipClass',
        'name',
        'manufacturer'
    ]

    numItensPorPagina = 5

    alteraPagina = (pagina = null) => {
        this.setState({
            pagina
        })
    }

    componentDidMount() {
        this.exibeNaves()
        this.setState({
            loading: true
        })
    }

    listaPaginadaNaves = () => {
        let pagina = this.state.pagina
        let naves = this.listaFiltradaNaves()
        let navesF = null
        if (naves) {
            navesF = naves.filter((el, i) => {
                let inicioEm = (pagina - 1) * this.numItensPorPagina
                let finalEm = pagina * this.numItensPorPagina - 1
                if ((i >= inicioEm) && (i <= finalEm)) {
                    return true
                }
                return false
            })
        }
        return navesF
    }

    listaFiltradaNaves = () => {
        let naves = this.state.naves
        let busca = this.state.busca
        if (busca) {
            naves = naves.filter(n => (n.name.toLowerCase().includes(busca.toLowerCase()) || n.model.toLowerCase().includes(busca.toLowerCase()) || n.manufacturer.toLowerCase().includes(busca.toLowerCase()) || n.starshipClass.toLowerCase().includes(busca.toLowerCase())))
        }
        return naves
    }

    alteraTextoBusca = busca => {
        this.setState({
            busca,
            pagina: 1
        })
    }

    geraTabela = () => {
        let naves = this.listaPaginadaNaves()
        let linhas = naves.map(n => {
            return (
                <tr>
                    <td>{n.name}</td>
                    <td>{n.model}</td>
                    <td>{n.starshipClass}</td>
                    <td>{n.manufacturer}</td>
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
                            <th>Modelo</th>
                            <th>Tipo</th>
                            <th>Fabricante</th>
                        </tr>
                    </thead>
                    <tbody>
                        {linhas}
                    </tbody>
                </table>
            </div>
        )
    }

    exibeNaves = () => {
        const Starship = this.props.parse.Object.extend('Starship')
        const query = new this.props.parse.Query(Starship)
        query.ascending("name");
        const naves = []
        query.find().then(results => {
            results.forEach(element => {
                let naveInt = {
                    id: element.id
                }
                this.parametrosNaves.forEach(param => {
                    naveInt[param] = element.get(param)
                })
                naves.push(naveInt)
            });
            setTimeout(() => {
                this.setState({
                    naves,
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
                        <h5>Naves</h5>
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
                            <ListaPaginacao pagina={this.state.pagina} alteraPagina={(p) => this.alteraPagina(p)} numItensPorPagina={this.numItensPorPagina} itens={this.listaFiltradaNaves()} />
                        </div>
                    </div>
                ) : null}
            </div>
        )
    }


}

export default NavesComponent