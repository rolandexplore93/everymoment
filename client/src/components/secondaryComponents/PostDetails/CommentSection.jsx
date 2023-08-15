import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextField, Typography } from "@mui/material";
import useStyles from './styles';

const CommentSection = ({ post }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [comments, setComments] = useState([1,2,3,4,5,6]);
    const [comment, setComment] = useState('');

  return (
    <div className={classes.Container}>
        <div className={classes.CommentOuterContainer}>
            <div className={classes.CommentInnerContainer}>
                <Typography gutterBottom variant="h6">Comments</Typography>
                {
                    comments.map((comment, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            HEre: {comment} is {i}
                        </Typography>
                    ))
                }
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
                <Button style={{ margin: '10px' }} fullWidth disabled={!comment} variant="container">
                    Comment
                </Button>

            </div>
        </div>
    </div>
  )
}

export default CommentSection