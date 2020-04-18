import React, { Component } from 'react'
import BarraBusca from './barraBusca'
import ListaPaginacao from './listaPaginacao'

class PlanetasComponent extends Component {

    state = {
        planetas: [],
        loading: false,
        busca: '',
        pagina: 1
    }

    parametrosPlanetas = [
        'name',
        'climate',
        'population',
        'terrain'
    ]

    numItensPorPagina = 5

    alteraPagina = (pagina = null) => {
        this.setState({
            pagina
        })
    }

    componentDidMount() {
        this.exibePlanetas()
        this.setState({
            loading: true
        })
    }

    listaPaginadaPlanetas = () => {
        let pagina = this.state.pagina
        let planetas = this.listaFiltradaPlanetas()
        let planetasF = null
        if (planetas) {
            planetasF = planetas.filter((el, i) => {
                let inicioEm = (pagina - 1) * this.numItensPorPagina
                let finalEm = pagina * this.numItensPorPagina - 1
                if ((i >= inicioEm) && (i <= finalEm)) {
                    return true
                }
                return false
            })
        }
        return planetasF
    }

    listaFiltradaPlanetas = () => {
        let planetas = this.state.planetas
        let busca = this.state.busca
        if (busca) {
            planetas = planetas.filter(p => (p.name.toLowerCase().includes(busca.toLowerCase())))
        }
        return planetas
    }

    alteraTextoBusca = busca => {
        this.setState({
            busca,
            pagina: 1
        })
    }

    geraTabela = () => {
        let planetas = this.listaPaginadaPlanetas()
        let linhas = planetas.map(p => {
            let terrenoString = ""
            if(p.terrain){
                terrenoString = p.terrain.join(", ")
            }

            let climaString = ""
            if(p.climate){
                climaString = p.climate.join(", ")
            }

            return (
                <tr>
                    <td>{p.name}</td>
                    <td>{terrenoString}</td>
                    <td>{climaString}</td>
                    <td>{p.population}</td>
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
                            <th>Terrenos</th>
                            <th>Clima</th>
                            <th>População</th>
                        </tr>
                    </thead>
                    <tbody>
                        {linhas}
                    </tbody>
                </table>
            </div>
        )
    }

    exibePlanetas = () => {
        const Planet = this.props.parse.Object.extend('Planet')
        const query = new this.props.parse.Query(Planet)
        query.ascending("name");
        const planetas = []
        query.find().then(results => {
            results.forEach(element => {
                let planetaInt = {
                    id: element.id
                }
                this.parametrosPlanetas.forEach(param => {
                    planetaInt[param] = element.get(param)
                })
                if(planetaInt.name){
                    planetas.push(planetaInt)
                }
            });
            setTimeout(() => {
                this.setState({
                    planetas,
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
                        <h5>Planetas</h5>
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
                            <ListaPaginacao pagina={this.state.pagina} alteraPagina={(p) => this.alteraPagina(p)} numItensPorPagina={this.numItensPorPagina} itens={this.listaFiltradaPlanetas()} />
                        </div>
                    </div>
                ) : null}
            </div>
        )
    }


}

export default PlanetasComponent