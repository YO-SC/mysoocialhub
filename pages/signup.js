import Head from 'next/head';
import Link from 'next/link';
import Button from '../components/Button';
import Input from '../components/Input';
import { supabase } from '../utils/supabaseClient';

export default function SignUp() {
  const userSignUp = async (email, password) => {
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log('signed up user', user);
    console.log('signed up user session', session);
    console.error('signed up user', error);

    // TODO after user signs up, create a hub for them, redirect to it, the user should be able to "fill" the hub with data
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
          <Input color="secondary" type="email" placeholder="email" />
          <Input color="secondary" type="password" placeholder="password" />
          {/*  // TODO make link href dynamic upon sign up, redirect user after sign up check/mutation */}
          {/* <Link href="/hub/1234"> */}
          <Button
            className="self-end"
            text="sign up"
            onClick={() => userSignUp('yodofi7423@bamibi.com', '12345678')}
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
