/* eslint-disable no-tabs */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { deletePost, showPost } from '../../api/post'
import Button from 'react-bootstrap/Button'

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
      .then(res => this.setState({ post: res.data.post }))
      .then(() => {
        msgAlert({
          heading: 'Show post is success!',
          message: 'Showing post successfully',
          variant: 'success'
        })
      })
      .catch(error => {
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
        .catch(error => {
          msgAlert({
            heading: 'Failed to delete post!',
            message: 'Delete error: ' + error.message,
            variant: 'danger'
          })
        })
    }

    render () {
      if (this.state.post === null) {
        return 'Loading...'
      }
      console.log('comment was added')

      const { title, text, date, comments, owner } = this.state.post
      console.log(comments)
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
        // margin: 'auto 2px',
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
            <h6>{comments[i].title}  <span style={commentSpanStyle}>by: {comments[i]?.username}</span></h6>
            <p>{comments[i].content}</p>
          </div>
        )
      }
      console.log(this.state.post.owner)

      return (
        <div style={postStyles}>
          {/* <h3>Show a Post</h3> */}

          <h4><span style={{ 'text-decoration': 'underline' }}>{title}</span> <br/>  <span style={titleSpanStyle}>by: {owner.username}</span></h4>
          <p>{text}</p>
          <h6>{date.slice(0, 10)}</h6>

          {user._id === owner._id && (
            <>
              <Button style={buttonStyle} onClick={this.handleDelete}>Delete</Button>
              <Button style={buttonStyle}
                onClick={() => history.push(`/posts/${match.params.id}/edit`)}>
								Update
              </Button>
            </>
          )}
          <Button style={buttonStyle}
            onClick={() => history.push(`/posts/${match.params.id}/create-comment`)}>
						Add Comment
          </Button>
          <h3>Comments:</h3>
          {commentsJSX}
        </div>
      )
    }
}

export default withRouter(ShowPost)
