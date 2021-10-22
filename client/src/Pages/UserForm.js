import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import * as actionsCreators from '../redux/actions';

function UserForm({ createUser, state, updateUser }) {
    const { user, success, failure } = state;
    const [data, setData] = useState({
        name: "",
        email: "",
        city: "",
        company: "",
    })

    useEffect(() => {
        if (user) {
            setData(user)
        }
    }, [])

    const formPreventDefault = (e) => {
        e.preventDefault();
        console.log("data de peticion", JSON.stringify(data));
        if (user) {
            updateUser(data)
        }
        else {
            createUser(data)
        }
    }

    if (success) {
        alert('Transaccion exitosa');
        return <Redirect to="/users" />
    }
    else if (failure) {
        alert('Fallo en la transaccion');
        return <Redirect to="/users" />
    }

    return (

        <div className="sectionForm">
            <h1>Crear usuario!</h1>
            <form onSubmit={formPreventDefault} >
                <label>Nombre: </label>
                <input onChange={(event) => {
                    setData({ ...data, name: event.target.value })
                }} type="text" name="name" value={data.name} />
                <br />
                <label>Correo electrónico: </label>
                <input onChange={(event) => {
                    setData({ ...data, email: event.target.value })
                }} type="text" name="email" value={data.email} />
                <br />
                <label>Ciudad: </label>
                <input onChange={(event) => {
                    setData({ ...data, city: event.target.value })
                }} type="text" name="city" value={data.city} />
                <br />
                <label>Compañia: </label>
                <input onChange={(event) => {
                    setData({ ...data, company: event.target.value })
                }} type="text" name="company" value={data.company} />
                <br />
                <button className="button" type="submit">{user ? "Actualizar Usuario" : "Crear usuario"}</button>
            </form >
        </div >
    )
}
const mapStateToProps = (state) => ({
    state,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionsCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);






