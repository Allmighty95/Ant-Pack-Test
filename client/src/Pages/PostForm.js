import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import * as actionsCreators from '../redux/actions';

function PostForm({ state, createPost, updatePost }) {

    const { post, success, failure } = state;

    const [data, setData] = useState({
        userId: "",
        title: "",
        body: "",
    })

    useEffect(() => {
        if (post) {
            setData(post)
        }
    }, [])

    const formPreventDefault = (e) => {
        e.preventDefault();
        console.log("data de peticion", JSON.stringify(data));
        if (post) {
            updatePost(data)
        }
        else {
            createPost(data)
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
            <h1>Crear publicacion!</h1>
            <form onSubmit={formPreventDefault} >
                <label>Id usuario: </label>
                <input onChange={(event) => {
                    setData({ ...data, userId: event.target.value })
                }} type="number" name="userId" value={data.userId} />
                <br />
                <label>Titulo: </label>
                <input onChange={(event) => {
                    setData({ ...data, title: event.target.value })
                }} type="text" name="title" value={data.title} />
                <br />
                <label>Publicacion: </label>
                <input onChange={(event) => {
                    setData({ ...data, body: event.target.value })
                }} type="text" name="body" value={data.body} />
                < br />
                <button className="button" type="submit">{post ? "Actualizar" : "Publicar"}</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);






