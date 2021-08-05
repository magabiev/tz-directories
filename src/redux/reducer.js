const initialState = {
    firstFolderId: '',
    folders: {},
    foldersLoading: false,
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case 'LOAD/FOLDERS/START': {
            return {
                ...state,
                foldersLoading: true
            }
        }
        case 'LOAD/FOLDERS/SUCCESS': {
            return {
                ...state,
                folders: {
                    ...state.folders,
                    [payload?.id]: payload
                },
                firstFolderId: payload.id,
                foldersLoading: false,
            }
        }
        case 'LOAD/FOLDER/SUCCESS': {
            return {
                ...state,
                folders: {
                    ...state.folders,
                    [payload?.id]: payload
                }
            }
        }
        default:
            return state;
    }
}
