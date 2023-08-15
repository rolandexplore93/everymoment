import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextField, Typography } from "@mui/material";
import useStyles from './styles';
import { postComment } from '../../../services/actions/posts'

const CommentSection = ({ post }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef()

    const submitComment = async () => {
        const name = user.data ? user?.data?.name : user?.user?.name;
        const userComment = `${name}: ${comment} `
        const newComments = await dispatch(postComment(userComment, post._id));
        setComments(newComments);
        setComment('');
        commentsRef.current.scrollIntoView({ behaviour: 'smooth' })
    }

  return (
    <div className={classes.Container}>
        <div className={classes.CommentOuterContainer}>
            <div className={classes.CommentInnerContainer}>
                <Typography gutterBottom variant="h6">Comments</Typography>
                {
                    comments.map((comment, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{comment.split(': ')[0]}</strong>
                            {comment.split(':')[1]}
                        </Typography>
                    ))
                }
                <div ref={commentsRef} />
            </div>
            <div style={{ width: '70%' }}>
                <Typography gutterBottom variant="h6">Share your views </Typography>
                <TextField 
                    fullWidth
                    rows={5}
                    label="Comments"
                    variant="outlined"
                    multiline
                    value={comment}
                    onChange={(e) => setComment(e.target.value) }
                />
                <Button style={{ marginTop: '10px' }} color="primary" fullWidth disabled={!comment} variant="contained" onClick={submitComment}>
                    Comment
                </Button>
            </div>
        </div>
    </div>
  )
}

export default CommentSection