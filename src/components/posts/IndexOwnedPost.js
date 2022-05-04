import React, { Component } from 'react'
import { indexOwnedPosts } from '../../api/post'
import { Link } from 'react-router-dom'

class IndexOwnedPost extends Component {
  constructor (props) {
    super(props)

    this.state = {
      posts: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props

    indexOwnedPosts(user)
      .then((res) => {
        res.data.posts.filter((post) => {
          if (post.owner === user._id) {
            return true
          } else {
            return false
          }
        })
      })
      .then((filteredRes) => {
        console.log(filteredRes)
        console.log('IN INDEXED OWNED POST')
      })
      .then((filteredRes) => this.setState({ posts: filteredRes }))
      .then(() => {
        msgAlert({
          heading: 'Index My Posts Success',
          message: 'Posts successfully shown!',
          variant: 'success'
        })
      })
      .catch((error) => {
        msgAlert({
          heading: 'Indexing My Posts Failed',
          message: 'Index error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { posts } = this.state

    if (posts === null) {
      return 'Loading...'
    }

    let postJSX
    if (posts.length === 0) {
      postJSX = 'No posts, create some'
    } else {
      postJSX = posts.map((post) => (
        <li key={post._id}>
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
        </li>
      ))
    }

    return (
      <>
        <h3>My Posts:</h3>
        <ul>{postJSX}</ul>
      </>
    )
  }
}

export default IndexOwnedPost
