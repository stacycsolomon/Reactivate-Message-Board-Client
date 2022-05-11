import React, { Component } from 'react'
import { showPost, updatePost } from '../../api/post'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { withRouter } from 'react-router-dom'

class UpdatePost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      text: '',
      date: ''
    }
  }

  componentDidMount () {
    const { match, user, msgAlert } = this.props

    showPost(match.params.id, user)
      .then((res) =>
        this.setState({
          title: res.data.post.title,
          text: res.data.post.text,
          date: res.data.post.date
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

      handleSubmit = event => {
        event.preventDefault()

        const { user, msgAlert, history, match } = this.props

        updatePost(this.state, match.params.id, user)
          .then(() => history.push('/posts/' + match.params.id))
          .then(() => {
            msgAlert({
              heading: 'Updated Post',
              message: 'woot updated',
              variant: 'success'
            })
          })
          .catch(error => {
            msgAlert({
              heading: 'Update failed',
              message: 'Update error: ' + error.message,
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
                placeholder='Post title'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId='text'>
              <Form.Label>Post text</Form.Label>
              <Form.Control
                required
                name='text'
                value={this.state.text}
                placeholder='Post text'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId='date'>
              <Form.Label>Post date</Form.Label>
              <Form.Control
                required
                name='date'
                value={this.state.date}
                placeholder='Post date'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button type='submit'>Submit</Button>
          </Form>
        )
      }
}

export default withRouter(UpdatePost)
