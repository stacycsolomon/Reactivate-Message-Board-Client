/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { deletePost, showPost } from '../../api/post'
import Button from 'react-bootstrap/Button'
import { deleteComment } from '../../api/comment'

class ShowPost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      post: null
    }
  }

  componentDidMount () {
    const { match, user, msgAlert } = this.props

    showPost(match.params.id, user)
      .then((res) => this.setState({ post: res.data.post }))
      .then(() => {
        msgAlert({
          heading: 'Show post is success!',
          message: 'Showing post successfully',
          variant: 'success'
        })
      })
      .catch((error) => {
        msgAlert({
          heading: 'Failure to show post!',
          message: 'Error message: ' + error.message,
          variant: 'danger'
        })
      })
  }

	handleDelete = () => {
	  const { match, user, msgAlert, history } = this.props

	  deletePost(match.params.id, user)
	    .then(() => history.push('/posts'))
	    .then(() => {
	      msgAlert({
	        heading: 'Deleted post successfully',
	        message: 'Post deleted',
	        variant: 'success'
	      })
	    })
	    .catch((error) => {
	      msgAlert({
	        heading: 'Failed to delete post!',
	        message: 'Delete error: ' + error.message,
	        variant: 'danger'
	      })
	    })
	}

	handleDeleteComment = (commentId) => {
	  const { match, user, msgAlert, history } = this.props

	  deleteComment(match.params.id, commentId, user)
	    .then(() => history.push('/posts'))
	    .then(() => {
	      msgAlert({
	        heading: 'Deleted comment successfully',
	        message: 'Comment deleted',
	        variant: 'success'
	      })
	    })
	    .catch((error) => {
	      msgAlert({
	        heading: 'Failed to delete comment!',
	        message: 'Comment delete error: ' + error.message,
	        variant: 'danger'
	      })
	    })
	}

	render () {
	  if (this.state.post === null) {
	    return 'Loading...'
	  }

	  const { title, text, date, comments, owner } = this.state.post
	  const { user, history, match } = this.props

	  const commentStyles = {
	    border: '3px solid black',
	    margin: '5px auto',
	    'border-radius': '10px',
	    'border-color': 'grey',
	    'text-align': 'left',
	    width: '80%',
	    'align-self': 'center',
	    'padding-left': '10px'
	  }
	  const postStyles = {
	    border: '2px solid black',
	    'margin-top': '15px',
	    'border-radius': '10px',
	    'border-color': 'grey',
	    'text-align': 'center',
	    'align-content': 'center',
	    padding: '10px',
	    'font-family': 'Times New Roman, Times, serif'
	  }
	  const commentSpanStyle = {
	    'font-size': '10px'
	  }
	  const titleSpanStyle = {
	    'font-size': '15px'
	  }
	  const buttonStyle = {
	    margin: '4px'
	  }
	  const commentsJSX = []
	  for (let i = 0; i < comments.length; i++) {
	    console.log(comments[i])
	    commentsJSX.push(
	      <div style={commentStyles}>
	        <h6>
	          {comments[i].title}{' '}
	          <span style={commentSpanStyle}>by: {comments[i]?.username}</span>
	        </h6>
	        <p>{comments[i].content}</p>

	        <Button
	          style={buttonStyle}
	          onClick={() => this.handleDeleteComment(comments[i]._id)}>
						Delete Comment
	        </Button>
	      </div>
	    )
	  }

	  return (
	    <div style={postStyles}>
	      <h4>
	        <span style={{ 'text-decoration': 'underline' }}>{title}</span> <br />{' '}
	        <span style={titleSpanStyle}>by: {owner.username}</span>
	      </h4>
	      <p>{text}</p>
	      <h6>{date.slice(0, 10)}</h6>

	      {user._id === owner._id && (
	        <>
	          <Button style={buttonStyle} onClick={this.handleDelete}>
							Delete Post
	          </Button>
	          <Button
	            style={buttonStyle}
	            onClick={() => history.push(`/posts/${match.params.id}/edit`)}>
							Update Post
	          </Button>
	        </>
	      )}
	      <Button
	        style={buttonStyle}
	        onClick={() =>
	          history.push(`/posts/${match.params.id}/create-comment`)
	        }>
					Add Comment
	      </Button>
	      <Button
	        onClick={() =>
	          history.push(
	            `/posts/${match.params.id}/comments/${match.params.commentId}/edit`
	          )
	        }>
					Update Comment
	      </Button>
	      <h3>Comments:</h3>
	      {commentsJSX}
	    </div>
	  )
	}
}

export default withRouter(ShowPost)
