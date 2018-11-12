const base = {
    overlay: {
        zIndex: 1045,
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
        width: '70%',
    }
};

export const versionModalStyle = {
    overlay: {
        ...base.overlay,
        overflow: 'scroll',
    },
    content: {
        ...base.content,
        top: '50%',
        bottom: '-40%',
        paddingLeft: '50px',
        paddingRight: '50px',
        width: '70%',
    }

};