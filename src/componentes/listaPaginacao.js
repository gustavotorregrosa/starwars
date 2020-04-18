import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import '../assets/paginacao.css'

class ListaPaginacao extends Component {

    getNumPaginas = () => {
        let num = 0
        if(this.props.itens){
            let numTotal = this.props.itens.length
            num = Math.ceil(numTotal / this.props.numItensPorPagina)
        }
        return num
    }

    alteraPagina = (e, p) => {
        e.preventDefault()
        if(p > 0 && p <= this.getNumPaginas()){
            this.props.alteraPagina(p)
        }
    }

    getListaItens = () => {
        let listaJSX = null
        if(this.getNumPaginas() > 1){
            let lista = []
            for(let i = 1; i <= this.getNumPaginas(); i++){
                let classHTML = "waves-effect"
                if(i == this.props.pagina){
                    classHTML = "active"
                }
                lista.push(
                    <li onClick={(e) => this.alteraPagina(e, i)} className={classHTML}><a href="#!">{i}</a></li>
                )
            }
            let classeLeft = "waves-effect"
            let classeRight = "waves-effect"
            if(this.props.pagina == 1){
                classeLeft = "disabled"
            }
            if(this.props.pagina == this.getNumPaginas()){
                classeRight = "disabled"
            }
            listaJSX = (
                <div>
                    <ul className="pagination">
                        <li onClick={(e) => this.alteraPagina(e, (this.props.pagina -1))} className={classeLeft}><a href="#"><i className="material-icons">chevron_left</i></a></li>
                            {lista}
                        <li onClick={(e) => this.alteraPagina(e, (this.props.pagina +1))} className={classeRight}><a href="#"><i className="material-icons">chevron_right</i></a></li>
                    </ul>
                </div>
            )
        }
        return listaJSX
    }

    render() {
        return this.getListaItens()
    }

}

export default ListaPaginacao
