import React from 'react'
import { connect } from 'react-redux'
import withRedirectOnNotAuth from '../../hocs/withRedirectOnNotAuth'

const MyAccountContainer = ({ auth }) =>{
  return (
    <div>Hello, {auth.displayName}!</div>
  )
}

const mapStateToProps = ({ firebase: { auth } }) => ({
  auth
})

export default connect(mapStateToProps)(
  withRedirectOnNotAuth(MyAccountContainer)
)
