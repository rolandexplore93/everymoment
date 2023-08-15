import { CircularProgress, Divider, Paper, Typography } from "@mui/material";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useStyles from './styles';
import { useEffect } from "react";
import { getPostById, getPostsBySearch } from "../../../services/actions/posts";
import CommentSection from "./CommentSection";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { post, posts, isLoading } = useSelector(state => state.posts);
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPostById(id))
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',')}))
    }
  }, [post, dispatch])

  const recommendedPosts = post && posts && posts.length > 0
  ? posts.filter(({ _id }) => post._id !== _id) 
  : [];

  const viewPost = (postID) => {
    navigate(`/posts/${postID}`)
  }

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    )
  };

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px'}} elevation={3}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1">
            <CommentSection post={post} />
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      { recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">Recommended posts</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <div className={classes.recommendedPosts}>
            {
              recommendedPosts.map(({ title, message, name, likes, selectedFile, _id }) => (
                <div key={_id} style={{ margin: '10px', cursor: 'pointer' }} elevation={6} onClick={() => viewPost(_id)}>
                  <Typography gutterBottom variant="h6">{ title }</Typography>
                  <Typography gutterBottom variant="subtitle2">{ name }</Typography>
                  <Typography gutterBottom variant="subtitle2">{ message }</Typography>
                  <Typography gutterBottom variant="subtitle1">{ likes.length }</Typography>
                  <img src={selectedFile} width="180px" alt="Img" />
                </div>
              ) )
            }
          </div>
        </div>
      ) }
    </Paper>
  )
}

export default PostDetails