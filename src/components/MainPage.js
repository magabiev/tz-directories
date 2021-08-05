import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loadFolders} from "../redux/actions";
import Folder from "./Folder";
import {CircularProgress, List, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    mainContainer: {
        maxWidth: '100%',
        width: 500
    }
});

function MainPage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { firstFolderId, foldersLoading, folders } = useSelector(state => state);

    useEffect(() => {
        dispatch(loadFolders());
    }, [dispatch]);

    return (
        <div className={classes.mainContainer}>
            {foldersLoading
                ? <CircularProgress />
                : <List>
                    {folders[firstFolderId]?.children.map(item =>
                        <Folder
                            data={item}
                            key={item.id}
                            isMainFolder={true}
                            paddingLeft={10}
                        />
                    )}
                </List>
            }
        </div>
    );
}

export default MainPage;