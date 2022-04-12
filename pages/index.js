import Head from 'next/head';
import Link from 'next/link';
import Button from '../components/Button';

export default function Home() {
  return (
    <div>
      <Head>
        <title>mysocialhub.com</title>
        <meta
          name="description"
          content="Share all your socials with a single link"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* vp */}
      <section className="bg-secondary h-screen grid place-items-center">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl uppercase font-semibold text-center">
            SHARE ALL YOUR SOCIALS <br /> WITH A SINGLE LINK
          </h1>

          <span className="flex gap-4 items-center justify-center">
            <Link href="/signup">
              <Button className="self-center" text="Sign Up" />
            </Link>

            <Link href="/login">
              <Button className="self-center" text="Login" />
            </Link>
          </span>
        </div>
      </section>

      {/* what */}
      <section className="bg-primary h-screen grid place-items-center">
        <div className="flex flex-col">
          <h2 className="text-4xl uppercase font-semibold text-center">
            WITH MORE SOCIAL MEDIAS, <br /> ITS MORE DIFFICULT FOR YOUR <br />
            USERS TO BE AWARE OF THEIR <br /> EXISTENCE
          </h2>
        </div>
      </section>

      {/* how */}
      <section className="bg-secondary h-screen grid place-items-center">
        <div className="flex flex-col">
          <h2 className="text-4xl uppercase font-semibold text-center">
            HERE AT <br /> SOCIALMEDIAHUB.COM YOU <br /> CAN CREATE A HUB TO
            SHARE <br /> WITH YOUR USERS
          </h2>
        </div>
      </section>

      {/* why */}
      <section className="bg-primary h-screen grid place-items-center">
        <div className="flex flex-col gap-5">
          <h2 className="text-4xl uppercase font-semibold text-center">
            MAKE YOUR FANS LIFE EASIER, <br /> MAKE THEM ENGAGE MORE <br /> WITH
            YOUR SOCIALS WITH A HUB. <br /> START NOW.
          </h2>

          <Button className="self-center" />
        </div>
      </section>
    </div>
  );
}
