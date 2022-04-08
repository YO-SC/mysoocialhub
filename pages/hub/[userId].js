import Head from 'next/head';
import { useRouter } from 'next/router';
// import React from 'react';
import { FaReact } from 'react-icons/fa';
// import * as FontIcon from 'react-icons/fa';
import ProfilePicture from '../../components/ProfilePicture';

export default function Hub() {
  // test data
  const userHub = {
    id: `abc${Math.floor(Math.random() * 10000)}`,
    user: {
      id: `abc${Math.floor(Math.random() * 10000)}`,
      avatar: '/photo.jpg',
      username: 'MKBHD',
      description:
        'MKBHD: Quality Tech Videos | YouTuber | Geek | Consumer Electronics | Tech Head | Internet Personality!',
    },
    socialMedias: [
      {
        id: `abc${Math.floor(Math.random() * 10000)}`,
        icon: 'youtube',
        name: 'YouTube',
        url: 'https://youtube.com/c/mkbhd',
      },
      {
        id: `abc${Math.floor(Math.random() * 10000)}`,
        icon: 'twitter',
        name: 'Twitter',
        url: 'https://twitter.com/c/MKBHD',
      },
      {
        id: `abc${Math.floor(Math.random() * 10000)}`,
        icon: 'instagram',
        name: 'Instagram',
        url: 'https://instagram.com/MKBHD',
      },
    ],
    theme: {
      // TODO check if colors are sent to the backend with the '#', if not then add it
      primaryColor: null,
      secondaryColor: null,
      primaryAccent: null,
      secondaryAccent: null,
      primaryText: null,
      secondaryText: null,
    },
  };

  // TODO when fetching for data, if hub does not exists display a 404 not found
  // TODO if this is the logged in user's hub, be able to edit stuff
  const router = useRouter();
  // TODO use userId to fetch users hub data on future implementation
  const { userId } = router.query;
  console.log(userHub);

  const {
    user: { avatar, username, description },
    socialMedias,
    theme,
    theme: { primaryColor, secondaryColor },
  } = userHub;

  return (
    <main className="lg:grid lg:grid-cols-12 h-screen w-full">
      <Head>
        <title>mysocialhub.com - hub</title>
        {/* <meta
          name="description"
          content="Share all your socials with a single link"
        /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* user info */}
      <section
        className={`${
          primaryColor ? `bg-[${primaryColor}]` : 'bg-primary'
        } col-span-3 flex flex-col justify-center items-center p-4 gap-4`}
      >
        <div className=" w-3/4 self-center">
          <ProfilePicture
            // className="flex-1"
            // TODO have a fallback source, just in case
            src={avatar}
            // width={200}
            // height={200}
            layout="responsive"
          />
        </div>

        <div className="h-full w-3/4 self-center break-words">
          <h1 className="font-bold text-2xl mb-2">{username}</h1>
          <h2 className="text-md">{description}</h2>
        </div>
      </section>

      {/* social medias */}
      {/* // NOTE this section should have a grid that takes into account how many social medias the user has */}
      <section
        className={`${
          secondaryColor ? `bg-[${secondaryColor}]` : 'bg-secondary'
        } col-span-9 px-10 py-4 flex flex-col gap-4 overflow-y-auto`}
      >
        {/* // NOTE think about how to dynamically set / pass the icon component based on DB data. This goes for the icon size and color props too */}
        {/* <SocialMediaCard
          icon={<FaFacebook size="2.5rem" color="white" />}
          name="Facebook"
        /> */}
        {socialMedias.map((socialMedia) => {
          const { id, name, url } = socialMedia;

          return <SocialMediaCard key={id} name={name} url={url} />;
        })}
      </section>
    </main>
  );
}

const SocialMediaCard = ({
  bgColor = 'bg-accent-primary',
  icon = <FaReact size="2.5rem" color="white" />,
  name = 'Social Media Name',
  url = '#',
}) => {
  return (
    <div className={`${bgColor} p-8 rounded-xl`}>
      <a
        // w-fit h-fit flex-1 <- if need to dynamically adjust size
        className="flex gap-3 items-center"
        href={url}
        target="_blank"
      >
        <span>{icon}</span>
        <h3 className="text-lg font-semibold text-white">{name}</h3>
      </a>
    </div>
  );
};
