import './assets/css/index.css';
import { useState, useEffect } from 'react';
import { supabase } from './data/supabaseClient';
import Navbar from './components/Navbar';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [])

  return (
    <div>
      {!session ? <Navbar /> : <Navbar key={session.user.id} session={session} />}
    </div>
  )
}