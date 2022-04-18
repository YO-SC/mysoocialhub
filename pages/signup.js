import Head from 'next/head';
import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { supabase } from '../utils/supabaseClient';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const router = useRouter();

  const userSignUp = async (email, password) => {
    if (!email || !password) {
      return alert('Fill the signup plz');
    }

    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
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
      // TODO display errors on ui (with better ux/ui)
      return alert(hubError.message);
    }

    // login the user in order to be able to use supabase.auth.user()
    // https://supabase.com/docs/reference/javascript/auth-user
    // FIXME do an email confirmation verification flow
    // const { user: userLogin, error: userLoginError } =
    //   await supabase.auth.signIn({
    //     email,
    //     password,
    //   });

    // console.log(userLogin);
    // console.error(userLoginError);
    // if (userLoginError) {
    //   // TODO display errors on ui (with better ux/ui)
    //   return alert(userLoginError.message);
    // }

    // return router.push(`/hub/${hubData[0].id}`);
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
            text="sign up"
            onClick={() => userSignUp(email, password)}
          />
        </div>
      </section>

      {/* quotes */}
      <section className="bg-secondary col-span-6 grid place-items-center p-10 px-20">
        <h2 className="text-3xl font-bold">
          {/* // TODO put email verification instructions here */}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio,
          fugit.
        </h2>
      </section>
    </div>
  );
}
