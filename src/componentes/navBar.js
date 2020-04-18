import React, { Component } from 'react'
import history from '../suporte/history'
import M from 'materialize-css'

class NavBar extends Component {


    constructor(props){
        super(props)
        this.sideNav = React.createRef()
        this.sideNavElem = null
        this.sideNavInstance = null
    }

    componentDidMount(){
        this.sideNavElem = this.sideNav.current
        this.sideNavInstance = M.Sidenav.init(this.sideNavElem, {});
    }


    componentWillUnmount(){
        this.sideNavInstance.destroy()

    }

    abreMenuSideBar = (e) => {
        e.preventDefault()
        this.sideNavInstance.open()

    }


    redirecionar = (e, path) => {
        e.preventDefault()
        history.push(path)
    }

    render() {
        return (
            <div>
                <nav className="black">
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">Star Wars</a>
                        <a onClick={(e) => this.abreMenuSideBar(e)} href="#" data-target="navbar" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                        <ul id="navbar" className="right hide-on-med-and-down">
                            <li><a onClick={(e) => this.redirecionar(e, '/personagens')} href="#">Personagens</a></li>
                            <li><a onClick={(e) => this.redirecionar(e, '/naves')} href="#">Naves</a></li>
                            <li><a onClick={(e) => this.redirecionar(e, '/planetas')} href="#">Planetas</a></li>
                            <li><a onClick={(e) => this.redirecionar(e, '/racas')} href="#" >Raças</a></li>
                        </ul>
                    </div>
                </nav>


                <ul ref={this.sideNav} id="slide-out" className="sidenav">
                    <li><a onClick={(e) => this.redirecionar(e, '/personagens')} href="#">Personagens</a></li>
                    <li><a onClick={(e) => this.redirecionar(e, '/naves')} href="#">Naves</a></li>
                    <li><a onClick={(e) => this.redirecionar(e, '/planetas')} href="#">Planetas</a></li>
                    <li><a onClick={(e) => this.redirecionar(e, '/racas')} href="#" >Raças</a></li>
    
                </ul>
            </div>
        )
    }

}

export default NavBar