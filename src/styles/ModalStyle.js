const base = {
    overlay: {
        zIndex: 1045,
        overflow: 'scroll',
        background: 'rgba(0, 0, 0, 0.75)',
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
        background: 'black',
        color: 'white',
        maxHeight: '85%',
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
        width: '70%',
    }
};

export const versionModalStyle = {
    ...base,
    content: {
        ...base.content,
        bottom: '-40%',
        paddingLeft: '30px',
        paddingRight: '30px',
        width: '70%',
    }
};

export const setsFilterModalStyle = {
    ...base,
    content: {
        ...base.content,
        width: '70%',
    }
};

export const howToUseModalStyle = {
    ...base,
    content: {
        ...base.content,
        paddingTop: '5px',
        width: '70%',
    }
};