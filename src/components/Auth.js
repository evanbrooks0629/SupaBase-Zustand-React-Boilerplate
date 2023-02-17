import { useState } from 'react';
import { supabase } from '../data/supabaseClient';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpMessageText, setSignUpMessageText] = useState('');
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInMessageText, setSignInMessageText] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({ email: signUpEmail, password: signUpPassword })
      if (error) throw error
      setSignUpMessageText('Check your email to complete your sign up.');
      //alert('Check your email for the login link!')
    } catch (error) {
      //alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({ email: signInEmail, password: signInPassword })
      if (error) throw error
      setSignInMessageText('Signing you in...');
      //alert('Check your email for the login link!')
    } catch (error) {
      //alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex-center flex">
      <div className="col-6 form-widget" aria-live="polite">
        <hr />

        <p className="description">Sign Up</p>
        {loading ? (
          'Sending your sign up link...'
        ) : (
          <form onSubmit={handleSignUp}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="inputField"
              type="email"
              placeholder="Your email"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="inputField"
              type="text"
              placeholder="Your Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
            />
            <button className="button block" aria-live="polite">
              Sign Up
            </button>
            <p>{signUpMessageText}</p>
          </form>
        )}

        <hr />

        <p className="description">Log In</p>
        {loading ? (
          'Signing you in...'
        ) : (
          <form onSubmit={handleSignIn}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="inputField"
              type="email"
              placeholder="Your email"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="inputField"
              type="text"
              placeholder="Your Password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
            />
            <button className="button block" aria-live="polite">
              Sign In
            </button>
            <p>{signInMessageText}</p>
          </form>
        )}

        <hr />
      </div>
    </div>
  )
}