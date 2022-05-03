/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { createPost } from '../../api/post'

class CreatePost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      text: '',
      date: ''
    }
  }

	handleChange = (event) =>
	  this.setState({
	    [event.target.name]: event.target.value
	  })

	handleSubmit = (event) => {
	  event.preventDefault()

	  const { user, msgAlert } = this.props

	  createPost(this.state, user)
	    .then(() => {
	      msgAlert({
	        heading: 'New Post created',
	        message: 'New post created successfully!',
	        variant: 'success'
	      })
	    })
	    .catch((error) => {
	      msgAlert({
	        heading: 'Failed to create new post',
	        message: 'Post error: ' + error.message,
	        variant: 'danger'
	      })
	    })
	}

	render () {
	  return (
	    <Form onSubmit={this.handleSubmit}>
	      <Form.Group controlId='title'>
	        <Form.Label>Post Title</Form.Label>
	        <Form.Control
	          required
	          name='title'
	          value={this.state.title}
	          placeholder='Post Title'
	          onChange={this.handleChange}
	        />
	      </Form.Group>
	      <Form.Group controlId='text'>
	        <Form.Label>Post Content</Form.Label>
	        <Form.Control
	          required
	          name='text'
	          value={this.state.text}
	          placeholder='Post Content'
	          onChange={this.handleChange}
	        />
	      </Form.Group>
	      <Form.Group controlId='date'>
	        <Form.Label>Date</Form.Label>
	        <Form.Control
	          required
	          name='date'
	          value={this.state.date}
	          placeholder='yyyy-mm-dd'
	          onChange={this.handleChange}
	        />
	      </Form.Group>
	      <Button type='submit'>Submit</Button>
	    </Form>
	  )
	}
}

export default CreatePost
