import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    card: {
      display: 'flex',
      width: '100%',
    //   [theme.breakpoints.down('sm')]: {
    //     flexWrap: 'wrap',
    //     flexDirection: 'column',
    //   },
    },
    section: {
      borderRadius: '20px',
      margin: '10px',
      flex: 3,
    },
    imageSection: {
      marginLeft: '20px',
      flex: 2
        
    //   [theme.breakpoints.down('sm')]: {
    //     marginLeft: 0,
    //   },
    },
    media: {
        borderRadius: '20px',
        objectFit: 'cover',
        width: '100%',
        maxHeight: '600px',
    },
    recommendedSection: {
        width: '100%',
    },
    recommendedPosts: {
      display: 'flex',
      justifyContent: 'space-between'
    //   [theme.breakpoints.down('sm')]: {
    //     flexDirection: 'column',
    //   },
    },
    loadingPaper: {
      display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
    },
    CommentOuterContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    CommentInnerContainer: {
        height: '200px',
        marginRight: '30px',
        overflowY: 'auto',
    }
  }));