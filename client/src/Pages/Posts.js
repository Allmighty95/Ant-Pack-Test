import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionsCreators from '../redux/actions';
import { Link } from "react-router-dom";

function Posts({ state, getPosts, deletePost, goToEditPost }) {
    const { loading, posts } = state;
    useEffect(() => {
        getPosts();
    }, [])
    console.log("posts", posts);
    return (
        loading ? <div>
            Cargando...
        </div> : <div className="list-section">
            <table>
                <thead>
                    <th>Id</th>
                    <th>Id usuario</th>
                    <th>Titulo</th>
                    <th>Publicacion</th>
                    <th>Editar</th>
                    <th>Borrar</th>
                    <th><button onClick={() => {
                        goToEditPost()
                    }}><Link className="button" to="/createPost">+</Link></button></th>
                </thead>
                <tbody>
                    {posts.map(post => {
                        return (
                            <tr>
                                <td>{post.id}</td>
                                <td>{post.userId}</td>
                                <td>{post.title}</td>
                                <td>{post.body}</td>
                                <td><button
                                    onClick={() => {
                                        goToEditPost(post)
                                    }}><Link className="button" to="/createPost">Editar</Link></button></td>
                                <td><button onClick={() => {
                                    deletePost(post.id)
                                }}>Borrar</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}



const mapStateToProps = (state) => ({
    state,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionsCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
