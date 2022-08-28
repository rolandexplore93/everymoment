const postReducer = (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL': return {
            posts: posts + 1
        }

        case 'CREATE': return {
            posts: posts
        }
            
        default: return posts
    }
}

export default postReducer