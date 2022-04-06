import Head from 'next/head';
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

          <Button className="self-center" />
        </div>
      </section>

      {/* what */}
      <section className="bg-primary h-screen grid place-items-center">
        <div className="flex flex-col">
          <h1 className="text-4xl uppercase font-semibold text-center">
            WITH MORE SOCIAL MEDIAS, <br /> ITS MORE DIFFICULT FOR YOUR <br />
            USERS TO BE AWARE OF THEIR <br /> EXISTENCE
          </h1>
        </div>
      </section>

      {/* how */}
      <section className="bg-secondary h-screen grid place-items-center">
        <div className="flex flex-col">
          <h1 className="text-4xl uppercase font-semibold text-center">
            HERE AT <br /> SOCIALMEDIAHUB.COM YOU <br /> CAN CREATE A HUB TO
            SHARE <br /> WITH YOUR USERS
          </h1>
        </div>
      </section>

      {/* why */}
      <section className="bg-primary h-screen grid place-items-center">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl uppercase font-semibold text-center">
            MAKE YOUR FANS LIFE EASIER, <br /> MAKE THEM ENGAGE MORE <br /> WITH
            YOUR SOCIALS WITH A HUB. <br /> START NOW.
          </h1>

          <Button className="self-center" />
        </div>
      </section>
    </div>
  );
}
