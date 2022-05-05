/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { Component } from 'react'
import { createComment } from '../../api/comment'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { withRouter } from 'react-router-dom'

class CreateComment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      content: '',
      postId: props.match.params.id
    }
  }

	handleChange = (event) =>
	  this.setState({
	    [event.target.name]: event.target.value
	  })

	handleSubmit = (event) => {
	  event.preventDefault()

	  const { user, msgAlert, history, match } = this.props

	  // createComment(this.state, match.params.id, user)
	  createComment(this.state, user)
	    .then(() => history.push('/posts/' + match.params.id))
	    .then(() => {
	      msgAlert({
	        heading: 'Comment created successfully',
	        message: 'Comment created!',
	        variant: 'success'
	      })
	    })
	    .catch((error) => {
	      msgAlert({
	        heading: 'Failed to create a comment on post',
	        message: 'Create comment error: ' + error.message,
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
	          placeholder='Post title'
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

export default withRouter(CreateComment)
