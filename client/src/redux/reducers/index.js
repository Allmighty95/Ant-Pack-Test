
const initialState = {
  users: [],
  posts: [],
  user: {},
  post: {},
  loading: false,
  success: false,
  failure: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
        success: false,
        failure: false,
      }
    case 'SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        failure: false,
      }
    case 'FAILURE':
      return {
        ...state,
        loading: false,
        success: false,
        failure: true,
      }
    case 'RECEIVE_USERS':
      return {
        ...state,
        loading: false,
        success: false,
        failure: false,
        users: action.users
      }
    case 'RECEIVE_POSTS':
      return {
        ...state,
        loading: false,
        success: false,
        failure: false,
        posts: action.posts
      }
    case 'EDIT_POST':
      return {
        ...state,
        loading: false,
        success: false,
        failure: false,
        post: action.post
      }
    case 'EDIT_USER':
      return {
        ...state,
        loading: false,
        success: false,
        failure: false,
        user: action.user
      }
    default:
      return { ...state }
  }
}

export default reducer;