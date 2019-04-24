import { randomNumber } from './randomBg';


export var baseStyle = {
    overlay: {
        zIndex: 1045,
        overflow: 'scroll',
        background: 'rgba(0, 0, 0, 0.75)',
    },
    content: {
        position: 'absolute',
        zIndex: 1050,
        top: 0,
        left: 0,
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(12.5%, 7.5vh)',
        color: 'white',
        height: 'auto',
        maxHeight: '85vh',
        width: '80%',
        padding: '10px 20px',
        // Just having fun with bg image
        background: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(\'' + process.env.REACT_APP_BG_IMG + 'lvl-bgs/' + randomNumber() + '.jpg\')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
    }
};

export const customStyles = {
    ...baseStyle,
    content: {
        ...baseStyle.content,
        width: 'auto',
        maxWidth: '80%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, 7.5vh)',
    }
};