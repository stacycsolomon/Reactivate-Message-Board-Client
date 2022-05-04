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

      const commentsJSX = []
      for (let i = 0; i < comments.length; i++) {
        commentsJSX.push(
          <>
            <p>{comments[i].title}</p>
            <p>{comments[i].content}</p>
          </>
        )
      }
      // console.log(this.state.post.owner)

      // console.log('owner:' + owner)
      // console.log(user)
      // return (<p>{commentsJSX}</p>)
      return (
        <>
          <h3>Show a Post</h3>

          <h4>{title}</h4>
          <h5>{text}</h5>
          <h6>{date.slice(0, 10)}</h6>
          {/* <p>{comments[0].title}</p> */}
          <h3>Comments: </h3>
          {commentsJSX}

          {user._id === owner && (
            <>
              <Button onClick={this.handleDelete}>Delete</Button>
              <Button
                onClick={() => history.push(`/posts/${match.params.id}/edit`)}>
								Update
              </Button>
            </>
          )}
          <Button
            onClick={() => history.push(`/posts/${match.params.id}/create-comment`)}>
						Add Comment
          </Button>
        </>
      )
    }
}

export default withRouter(ShowPost)
