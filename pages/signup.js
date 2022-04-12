import Head from 'next/head';
import Link from 'next/link';
import Button from '../components/Button';
import Input from '../components/Input';
import { supabase } from '../utils/supabaseClient';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const userSignUp = async (email, password) => {
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log('signed up user', user);
    console.log('signed up user session', session);
    console.error('signed up user', error);

    // TODO after user signs up, create a hub for them, redirect to it, the user should be able to "fill" the hub with data
    // flow
    // user signs up
    // create blank hub
    // connect created blank hub to signed up user and viceversa
    // create blank theme for blank hub
    // connect theme to hub
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
          {/* <Link href="/hub/1234"> */}
          <Button
            className="self-end"
            text="sign up"
            onClick={() => userSignUp(email, password)}
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
