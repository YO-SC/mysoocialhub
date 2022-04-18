import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { supabase } from '../utils/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userLoggingIn, setUserLoggingIn] = useState(false);
  const router = useRouter();

  const userLogin = async (email, password) => {
    if (!email || !password) {
      return alert('fill the login plz');
    }

    setUserLoggingIn(true);

    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });

    // TODO better handle the errors
    if (error) {
      setUserLoggingIn(false);
      return alert(error);
    }

    const { data: hub, error: errHub } = await supabase
      .from('hub')
      .select('id')
      .eq('owner', user.id)
      .single();

    return router.push(`/hub/${hub.id}`);
  };

  return (
    <div className="bg-red-500 h-screen lg:grid grid-cols-12">
      <Head>
        <title>mysocialhub.com - login</title>
        {/* <meta
          name="description"
          content="Share all your socials with a single link"
        /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*  form */}
      <section className="bg-primary col-span-6 grid place-items-center p-10">
        <div className="flex flex-col gap-3 w-3/4">
          <h1 className="text-3xl font-bold uppercase mb-2">Login</h1>
          {/* // TODO validate email and password */}
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
          {/*  // TODO make link href dynamic upon login, redirect user after login check/mutation */}
          <Button
            className="self-end"
            text={userLoggingIn ? 'logging in...' : 'login'}
            onClick={() => userLogin(email, password)}
            disabled={userLoggingIn}
          />
        </div>
      </section>

      {/* quotes */}
      <section className="bg-secondary col-span-6 grid place-items-center p-10 px-20">
        <h2 className="text-3xl font-bold">
          Login to your hub, add to it, customize it, and share it with your
          fans.
        </h2>
      </section>
    </div>
  );
}
