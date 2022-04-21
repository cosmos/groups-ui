import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    flexWrap: 'wrap',
    '& > *': {
      margin: '0 auto',
      width: '560px',
      padding: '50px 30px',
    },
  },
  title: {
    fontWeight: 900,
    fontSize: '38px',
    margin: '0 auto',
    textAlign: 'center',
  },
  subTitle: {
    marginTop: '25px',
    textAlign: 'center',
    fontSize: '18px',
    lineHeight: '27px',
  },
  finishedBtn: {
    display: 'block',
    margin: '50px auto',
    backgroundColor: '#3D7ACF',
    borderRadius: '2px',
    padding: '5px 9px',
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 800,
    fontSize: '18px',
    lineHeight: '23px',
  },
  label: {
    width: '100%',
    display: 'block',
    margin: '0 auto 42px auto',
    '& .max': {
      marginTop: '10px',
      marginBottom: '10px',
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
  input: {
    display: 'flex',
    alignItems: 'center',

    '& p': {
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '23.2px',
      marginLeft: '20px',
    },
  },
  inputTitle: {
    fontFamily: "'Lato', sans-serif",
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '145%',
    marginBottom: '10px',
    '& span': {
      color: '#D2D5D9',
    },
    '& .subTitle': {
      marginTop: '5px',
      color: '#545555',
      fontSize: '14px',
      lineHeight: '21px',
      fontWeight: 400,
    },
  },
  cardBtn: {
    padding: '12px',
    fontFamily: "'Mulish' sans-serif",
    fontSize: '18px',
    fontWeight: 'bold',
    lineHeight: '23px',
  },
  radio: {
    width: '100%',
    padding: '20px',
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',

    '& p': {
      fontFamily: "'Lato', sans-serif",
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '145%',

      '& span': {
        color: '#545555',
      },
    },

    '& input': {
      appearance: 'none',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      border: '2px solid #999',
      transition: '0.2s all linear',
      marginRight: '12px',
    },
    '& input:checked': {
      border: '5px solid #3D7ACF',
    },
  },
  radioBox: {
    border: '1px solid #D2D5D9',
    borderRadius: '5px',
    marginBottom: '10px',
  },
}))

export const radioStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
}))
