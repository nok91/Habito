import React from 'react'
import { withFirebase } from 'react-redux-firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import { auth as firebaseAuth } from '../../firebase'

const LoginForm = ({ onSuccess }) => {
  const uiConfig = {
    signInFlow: 'popup',
    callbacks: {
      signInSuccessWithAuthResult: () => onSuccess()
    },
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    credentialHelper: 'none' // disable redirect on email login
  }

  return (
    <>
      Login form:
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
    </>
  )
}

export default withFirebase(LoginForm)
