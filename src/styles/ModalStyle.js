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
    ...base
};

export const headerModalStyle = {
    ...base,
    content: {
        ...base.content,
        top: '50%',
        bottom: '-2%',
        paddingLeft: '10px',
        paddingRight: '10px',
        width: '70%',
    }
};

export const versionModalStyle = {
    overlay: {
        ...base.overlay,
    },
    content: {
        ...base.content,
        top: '50%',
        bottom: '-40%',
        paddingLeft: '30px',
        paddingRight: '30px',
        width: '70%',
    }
};