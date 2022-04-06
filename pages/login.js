import Input from '../components/Input';
import Button from '../components/Button';
import Head from 'next/head';

export default function Login() {
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
          <Input color="secondary" type="email" placeholder="email" />
          <Input color="secondary" type="password" placeholder="password" />
          <Button className="self-end" text="Login" />
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
