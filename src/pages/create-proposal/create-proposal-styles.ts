import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        width: '560px',
        "& .active": {
            display: 'block',
        }
    },

    heroBlock: {

        '& h1': {
            fontWeight: 900,
            fontSize: '38px',
            lineHeight: '49px'
        }
    },

    description: {
        color: '#545555',
        fontSize: '18px',
        fontWeight: 400,
        lineHeight: '27px',
        fontFamily: " 'Lato', sans-serif "
    },

    heroLink: {
        padding: 4,
        fontFamily: " 'Mulish', sans-serif ",
        fontWeight: 800,
        fontSize: '14px',
        lineHeight: '17.5px',
        marginLeft: '20px'
    },

    groupName: {
        fontWeight: 800,
        fontSize: '12px',
        lineHeight: '15px',
        marginBottom: '30px',

        '& span': {
            textTransform: 'uppercase',
            marginRight: '6px',
        },
        '& p': {
            display: 'inline',
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: '27px',
            fontFamily: " 'Lato', sans-serif "
        }
    },

    paperHead: {
        padding: '30px',
        backgroundColor: '#EFEFEF',
        borderBottom: '1px solid #D2D5D9',
        borderRadius: '10px 10px 0 0',

        '& h2': {
            fontSize: '18px'
        }
    },

    paperBody: {
        padding: '33px 30px',
        fontFamily: " 'Lato', sans-serif ",
        fontWeight: 400,
        fontSize: '14px',

        '& .marginB': {
            marginBottom: '30px'
        }
    },

    paperTitle: {
        fontWeight: 700,
        fontSize: '18px',
        lineHeight: '26px',
        marginBottom: '9px'
    },

    previewTitle: {
        fontFamily: 'Mulish',
        fontWeight: 800,
        fontSize: '14px',
        lineHeight: '17.57px',
        marginBottom: '9px',
        textTransform: 'uppercase',
    },

    paperSubtitle: {
        lineHeight: '21px',
        display: 'flex',
        alignItems: 'center',

        '& span': {
            fontWeight: 800,
            lineHeight: '17.5px'
        }
    },

    inputBlock: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    expandBtn: {
        position: 'absolute',
        left: '48.4%',
        verticalAlign: 'top',
        top: '-55px',
        backgroundColor: '#D2D5D9',
        color: '#545555',
        minWidth: '30px',
        height: '30px',
        borderRadius: '100%',
        padding: 0,
        cursor: 'pointer',
        border: 'none',

        '& .horizontal': {
            backgroundColor: '#545555',
            height: '3px',
            position: 'absolute',
            top: '46%',
            left: '20%',
            right: '20%',
        },
        '& .vertical': {
            position: 'absolute',
            top: '46%',
            left: '20%',
            right: '20%',
            transform: 'rotate(90deg)',
            height: '3px',
            backgroundColor: '#545555',
        },
    },
    actionBtn: {
        backgroundColor: 'white',
        borderRadius: '10px',
        color: '#545555',
        fontSize: '14px',
        lineHeight: '18px',
        fontWeight: 800,
        padding: '40px 0',
    },
    hiddenBlock: {
        display: 'none',
        marginBottom: '100px'
    },
    finishedBtn: {
        display: 'block',
        margin: '50px auto',
        marginBottom: '200px',
        backgroundColor: '#3D7ACF',
        borderRadius: '2px',
        padding: '8px 20px',
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 800,
        fontSize: '18px',
        lineHeight: '23px'
    },
    textArea: {
        width: '100%',
        fontSize: '18px',
        resize: 'none',
        overflow: 'hidden',
        minHeight: '50px',
        padding: '10px',
        border: '1px solid #D2D5D9',
        borderRadius: '5px'
    }
}))
