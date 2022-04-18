import Head from 'next/head';
import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { supabase } from '../utils/supabaseClient';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userSignedUp, setUserSignedUp] = useState(false);
  const [userSigningUp, setUserSigningUp] = useState(false);

  const userSignUp = async (email, password) => {
    if (!email || !password) {
      return alert('Fill the signup plz');
    }

    setUserSigningUp(true);

    const { user, session, error } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      { redirectTo: 'http://localhost:3000/login' }
    );

    console.table({ user, session, error });

    if (error) {
      setUserSigningUp(false);
      // TODO display errors on ui (with better ux/ui)
      return alert(error.message);
    }

    const { data: hubOwnerData, error: hubOwnerError } = await supabase
      .from('hub_owner')
      .insert({
        id: user.id,
        avatar: null,
        username: null,
        description: null,
      });

    if (hubOwnerError) {
      setUserSigningUp(false);
      // TODO display errors on ui (with better ux/ui)
      return alert(hubOwnerError.message);
    }

    const { data: hubThemeData, error: hubThemeError } = await supabase
      .from('hub_theme')
      .insert({
        primaryColor: null,
        secondaryColor: null,
        primaryAccent: null,
        secondaryAccent: null,
      });

    if (hubThemeError) {
      setUserSigningUp(false);
      // TODO display errors on ui (with better ux/ui)
      return alert(hubThemeError.message);
    }

    const { data: hubData, error: hubError } = await supabase
      .from('hub')
      .insert({
        owner: user.id,
        theme: hubThemeData[0].id,
      });

    if (hubError) {
      setUserSigningUp(false);
      // TODO display errors on ui (with better ux/ui)
      return alert(hubError.message);
    }

    setUserSignedUp(true);
    setUserSigningUp(false);
  };

  return (
    <div className="bg-red-500 h-screen lg:grid grid-cols-12">
      <Head>
        <title>mysocialhub.com - sign up</title>
        {/* <meta
          name="description"
          content="Share all your socials with a single link"
        /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*  form */}
      <section className="bg-primary col-span-6 grid place-items-center p-10">
        <div className="flex flex-col gap-3 w-3/4">
          <h1 className="text-3xl font-bold uppercase mb-2">Sign Up</h1>
          <Input
            color="secondary"
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            color="secondary"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/*  // TODO make link href dynamic upon sign up, redirect user after sign up check/mutation */}
          <Button
            className="self-end"
            text={userSigningUp ? 'signing up...' : 'sign up'}
            onClick={() => userSignUp(email, password)}
            disabled={userSigningUp || userSignedUp}
          />
        </div>
      </section>

      {/* quotes */}
      <section className="bg-secondary col-span-6 grid place-items-center p-10 px-20">
        <h2 className="text-3xl font-bold">
          {userSignedUp
            ? 'Signed up ✅. Check and confirm your email to access your hub!'
            : 'Make your fans life easier by signing up, a hub will be automatically created.'}
        </h2>
      </section>
    </div>
  );
}
