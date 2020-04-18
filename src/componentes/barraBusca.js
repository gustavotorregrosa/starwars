import React, { Component } from 'react'
import classes from '../assets/barrabusca.module.css'

class BarraBusca extends Component {

    state = {
        texto: null,
        ativaCor: false
    }

    mudaTextoBusca = (e) => {
        let texto = e.target.value
        let ativaCor = texto != ""
        this.setState({
            texto,
            ativaCor
        })
        this.props.informaTxtBusca(texto)
    }





    render() {
        let listaClasses = ['card', classes.quadroinput]
        if (this.state.ativaCor) {
            listaClasses.push(classes.ativo)
        }
        listaClasses = listaClasses.join(' ')
        return (
            <div>
                <div className={listaClasses} >
                    <input  onChange={(e) => this.mudaTextoBusca(e)} id="inp-busca" type="text" placeholder="Busca"/>
                </div>
            </div>
            // <div>
            //     <div style={{
            //         backgroundColor: 'white'
            //     }} class="input-field">
            //         <input id="inp-busca" type="text" />
            //         <label for="inp-busca">Busca</label>
            //     </div>
            // </div>

        )
    }
}

export default BarraBusca