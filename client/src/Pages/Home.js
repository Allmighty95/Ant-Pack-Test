import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionsCreators from '../redux/actions';
import { Link } from "react-router-dom";
import UsersImage from "../assets/users.svg";
import PostsImage from "../assets/posts.svg";

function Home({ state }) {
    console.log("state", state);
    return (
        <div className="list-section" style={{ textAlign: 'center' }}>
            <h1>Administrador de usuarios</h1>
            <p>Con este sitio web podras Crear, Ver, Actualizat y Eliminar los usuarios y publicaciones que recibas de la api https://jsonplaceholder.typicode.com, los iconos presentados son resultado de buscar concatenar a la url de gravatar el correo cifrado con md5 de cada usuario</p>
            <div className="home-content ">
                <div className="home-section">
                    Administra tus Usuarios
                    <img src={UsersImage} alt="" />
                    <button><Link className="button" to="/users">Usuarios</Link></button>
                </div>
                <div className="home-section">
                    Administra tus Publicaciones
                    <img src={PostsImage} alt="" />
                    <button><Link className="button" to="/posts">Publicaciones</Link></button>
                </div>
            </div>
        </div>
    )
}



const mapStateToProps = (state) => ({
    state,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionsCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
