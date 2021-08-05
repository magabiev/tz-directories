export const loadFolders = () => {
    return dispatch => {
        dispatch({type: 'LOAD/FOLDERS/START'})
        fetch('http://164.90.161.80:3000/api/content')
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: 'LOAD/FOLDERS/SUCCESS',
                    payload: json
                })
            });
    }
}

export const loadFolder = (id, callback) => {
    return dispatch => {
        callback && callback(true);
        fetch(`http://164.90.161.80:3000/api/content?dirId=${id}`)
            .then(response => response.json())
            .then(json => {
                callback(false);
                dispatch({
                    type: 'LOAD/FOLDER/SUCCESS',
                    payload: json
                })
            });
    }
}