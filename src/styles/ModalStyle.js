const base = {
    overlay: {
        zIndex: 1045,
        overflow: 'scroll',
    },
    content: {
        position: 'absolute',
        zIndex: 1050,
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};

export const customStyles = {
    ...base,
};

export const headerModalStyle = {
    ...base,
    content: {
        ...base.content,
        paddingLeft: '10px',
        paddingRight: '10px',
        height: '425px',
        width: '70%',
    }
};

export const versionModalStyle = {
    overlay: {
        ...base.overlay,
    },
    content: {
        ...base.content,
        bottom: '-40%',
        paddingLeft: '30px',
        paddingRight: '30px',
        width: '70%',
    }
};

export const setsFilterModalStyle = {
    overlay: {
        ...base.overlay,
    },
    content: {
        ...base.content,
        bottom: '-40%',
        height: '460px',
        width: '70%',
    }
};