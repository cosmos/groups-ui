import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(() => ({
  root: {
    padding: '0px 24px',
    width: '1200px',

    '& .MuiSelect-outlined': {
      backgroundColor: 'white',
    },
    '& h1,h2,h3,h4,h5': {
      fontWeight: 900,
    },
    '& h1': {
      fontSize: '32px',
      lineHeight: '44px',
    },
    '& h2': {
      fontSize: '24px',
      lineHeight: '34px',
    },
    '& h3': {
      fontSize: '21px',
      lineHeight: '31px',
    },
    '& h4': {
      fontSize: '14px',
      lineHeight: '17px',
      textTransform: 'uppercase',
    },
    '& h5': {
      fontSize: '12px',
      lineHeight: '15px',
      textTransform: 'uppercase',
    },

    '& .text': {
      fontWeight: 400,
      fontSize: '14px',
      fontFamily: " 'Lato' ",
      lineHeight: '24px',
      color: '#545555',
    },
  },
  grayBlock: {
    backgroundColor: '#FAFAFA',
    border: '1px solid #EFEFEF',
    borderRadius: '5px',
    padding: '34px 20px',
    margin: '30px 0',

    '& .values': {
      display: 'flex',
      justifyContent: 'space-between',
      textAlign: 'left',
      margin: '25px 0',
    },
  },
  link: {
    display: 'inline-flex',
    fontSize: '18px',
    alignItems: 'center',
    fontFamily: " 'Lato', sans-serif ",
    marginBottom: '35px',
  },
  parChange: {
    padding: '50px 40px',
    width: '678px',
    borderRight: '1px solid #D2D5D9',
  },
  voting: {
    width: '522px',
    backgroundColor: '#FAFAFA',
    padding: '53px 43px',
    borderRadius: '0 10px 10px 0',
  },
  btnBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',

    '& p': {
      fontSize: '14px',
      fontWeight: 800,
      color: '#545555',
      borderRadius: '3px',
      backgroundColor: '#EFEFEF',
      padding: '5px',
    },
  },

  propDetails: {
    width: '50%',

    '& h4': {
      marginBottom: '9px',
    },
    '& p': {
      marginBottom: '28px',
    },
  },
  content: {
    width: '50%',

    '& h4': {
      marginBottom: '26px',
    },
  },
}))

export const statusStyles = makeStyles(() => ({
  marker: {
    fontFamily: " 'Lato' ",
    fontSize: '12px',
    fontWeight: 'bold',
    padding: '6px 10px',
    borderRadius: '50px',
    border: '1px solid',

    '&.green': {
      color: '#4FB573',
      borderColor: '#B9E1C7',
      backgroundColor: 'rgba(220, 240, 227, 0.2)',
    },
    '&.orange': {
      color: '#FF9110',
      borderColor: '#FFA53A',
      backgroundColor: 'rgba(255, 165, 58, 0.1)',
    },
    '&.blue': {
      color: '#3D7ACF',
      borderColor: '#B1CAEC',
      backgroundColor: 'rgba(61, 122, 207, 0.05)',
    },
  },
  button: {
    border: '1.5px solid',
    width: '172px',
    fontWeight: 800,
    fontSize: '14px',
    textAlign: 'center',

    '&.green': {
      color: '#4FB573',
      borderColor: '#4FB573',

      '&:hover': {
        backgroundColor: '#4FB573',
        color: 'white',
      },
    },
    '&.orange': {
      color: '#FF9110',
      borderColor: '#FF9110',

      '&:hover': {
        backgroundColor: '#FF9110',
        color: 'white',
      },
    },
    '&.yellow': {
      color: '#FFC432',
      borderColor: '#FFC432',

      '&:hover': {
        backgroundColor: '#FFC432',
        color: 'white',
      },
    },
    '&.red': {
      color: '#DE4526',
      borderColor: '#DE4526',

      '&:hover': {
        backgroundColor: '#DE4526',
        color: 'white',
      },
    },
  },
}))
