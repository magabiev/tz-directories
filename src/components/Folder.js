import React, {Fragment, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    Collapse,
    IconButton,
    LinearProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles
} from "@material-ui/core";
import {loadFolder} from "../redux/actions";
import { ExpandLess, ExpandMore, Image, LibraryBooks, ListAlt } from "@material-ui/icons";
import FolderIcon from '@material-ui/icons/Folder';

const useStyles = makeStyles({
    listItem: {
        borderBottom: '1px solid #cac9c9',
        cursor: 'pointer'
    },
    listItemText: {
        display: 'flex',
        alignItems: 'center'
    }
});

function Folder({ data, paddingLeft = 0 }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { folders } = useSelector(state => state);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { children, id, title } = data;

    const itemClick = () => {
        setOpen(!open);
        if (children && !folders[id]) {
            dispatch(loadFolder(id, setLoading));
        }
    };

    const currentIcon = (
        title.includes('jpg')
            ? <Image />
            : title.includes('epub')
                ? <LibraryBooks />
                : title.includes('zip')
                    ? <ListAlt />
                    : null
        );

    return (
        <Fragment>
            <ListItem
                onClick={itemClick}
                className={classes.listItem}
            >
                <ListItemIcon>
                 {children ? <FolderIcon fontSize="small" /> : currentIcon}
                </ListItemIcon>
                <ListItemText className={classes.listItemText}>
                    {title}
                </ListItemText>
                <ListItemIcon>
                    {children
                        && <IconButton size="small">
                            {open
                              ? <ExpandLess fontSize="inherit" />
                               : <ExpandMore fontSize="inherit" />
                            }
                        </IconButton>
                    }
                </ListItemIcon>
            </ListItem>
            {children
                && <Collapse in={open} timeout="auto" unmountOnExit>
                    {loading
                        ? <LinearProgress />
                        : <List style={{ paddingLeft }}>
                            {folders[id] && folders[id].children.length
                                ? folders[id].children.map(item =>
                                    <Folder
                                        data={item}
                                        key={item.id}
                                        paddingLeft={paddingLeft + 10}
                                    />)
                                :
                                <ListItem>
                                    <ListItemText>
                                        Нет данных
                                    </ListItemText>
                                </ListItem>
                            }
                        </List>
                    }
                </Collapse>
            }
        </Fragment>
    );
}

export default Folder;