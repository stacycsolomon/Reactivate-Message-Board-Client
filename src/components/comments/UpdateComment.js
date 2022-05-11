import React, { Component } from 'react'
import { updateComment } from '../../api/comment'
import { showPost } from '../../api/post'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { withRouter } from 'react-router-dom'

class UpdateComment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      content: '',
      postId: props.match.params.id,
      commentId: props.match.params.commentId
    }
  }

  componentDidMount () {
    const { match, user, msgAlert } = this.props

    showPost(match.params.id, user)
      .then((res) =>
        this.setState({
          title: res.data.post.comments.title,
          comment: res.data.comments
        })
      )
      .then(() => {
        msgAlert({
          heading: 'Show post success',
          message: 'Woot success',
          variant: 'success'
        })
      })
      .catch((error) => {
        msgAlert({
          heading: 'Show failed',
          message: 'Error message: ' + error.message,
          variant: 'danger'
        })
      })
  }

   handleChange = (event) =>
     this.setState({
       [event.target.name]: event.target.value
     })

     handleSubmit = (event) => {
       event.preventDefault()

       const { user, msgAlert, history, match } = this.props
       updateComment(this.state, match.params.id, user, match.params.commentId)
         .then(() => history.push('/posts/' + match.params.id))
         .then(() => {
           msgAlert({
             heading: 'Comment updated successfully',
             message: 'Comment updated!',
             variant: 'success'
           })
         })
         .catch((error) => {
           msgAlert({
             heading: 'Failed to update a comment on post',
             message: 'Update comment error: ' + error.message,
             variant: 'danger'
           })
         })
     }

     render () {
       return (
         <Form onSubmit={this.handleSubmit}>
           <Form.Group controlId='title'>
             <Form.Label>Comment Title</Form.Label>
             <Form.Control
               required
               name='title'
               value={this.state.title}
               placeholder='Comment title'
               onChange={this.handleChange}
             />
           </Form.Group>
           <Form.Group controlId='content'>
             <Form.Label>Summary</Form.Label>
             <Form.Control
               required
               name='content'
               value={this.state.content}
               placeholder='Add comment here'
               onChange={this.handleChange}
             />
           </Form.Group>
           <Button type='submit'>Submit</Button>
         </Form>
       )
     }
}

export default withRouter(UpdateComment)
