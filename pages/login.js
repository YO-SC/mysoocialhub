import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
// import Link from 'next/link';
import Button from '../components/Button';
import Input from '../components/Input';
import { supabase } from '../utils/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  // console.log(email);
  // console.log(password);

  const userLogin = async (email, password) => {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });

    // TODO better handle the errors
    if (error) {
      return;
    }

    // console.log('the logged in user', user);
    // console.error('the logged in error', error);
    const { data: hub, error: errHub } = await supabase
      .from('hub')
      .select('id')
      .eq('owner', user.id)
      .single();

    // console.log(hub);

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
          {/* <Link href="/hub/1234"> */}
          <Button
            className="self-end"
            text="login"
            onClick={() => userLogin(email, password)}
          />
          {/* </Link> */}
        </div>
      </section>

      {/* quotes */}
      <section className="bg-secondary col-span-6 grid place-items-center p-10 px-20">
        <h2 className="text-3xl font-bold">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio,
          fugit.
        </h2>
      </section>
    </div>
  );
}
