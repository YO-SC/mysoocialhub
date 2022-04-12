import Error from 'next/error';
import Head from 'next/head';
import { FaReact } from 'react-icons/fa';
import ProfilePicture from '../../components/ProfilePicture';
import { supabase } from '../../utils/supabaseClient';

export default function Hub(props) {
  if (props.errors.errHub || props.errors.errHubSocialMedia) {
    return <Error statusCode={404} />;
  }
  // TODO if this is the logged in user's hub, be able to edit stuff

  const {
    hub: {
      owner: { avatar, username, description },
      social_medias: socialMedias,
      // theme,
      theme: { primaryColor, secondaryColor },
    },
  } = props;

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
            src={avatar ?? '/default_profile_picture.png'}
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
        } 
        col-span-9 px-10 py-4 flex flex-col gap-4 overflow-y-auto`}
      >
        {/* // NOTE think about how to dynamically set / pass the icon component based on DB data. This goes for the icon size and color props too */}
        {socialMedias &&
          socialMedias.map((socialMedia) => {
            const { id, name, url } = socialMedia;

            return <SocialMediaCard key={id} name={name} url={url} />;
          })}
      </section>
    </main>
  );
}

// FIXME make both dynamic icons and hub theme work

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
        {/* <span>{icon}</span> */}
        <h3 className="text-lg font-semibold text-white">{name}</h3>
      </a>
    </div>
  );
};

export async function getServerSideProps(context) {
  const {
    params: { hubId },
  } = context;

  let { data: hub, error: errHub } = await supabase
    .from('hub')
    .select(
      `id,
      owner(
        id,
        avatar,
        username,
        description
      ),
      theme(
        id,
        primaryColor,
        secondaryColor
      )
    `
    )
    .eq('id', hubId)
    .single();

  let { data: hubSocialMedia, error: errHubSocialMedia } = await supabase
    .from('hub_social_media')
    .select(
      `id,
      icon,
      name,
      url
    `
    )
    .eq('hub', hubId);

  // inserting hub social medias to the hub obj
  if (hubSocialMedia && hubSocialMedia.length !== 0) {
    hub['social_medias'] = [...hubSocialMedia];
  }

  return {
    props: {
      hub,
      errors: { errHub, errHubSocialMedia },
    }, // will be passed to the page component as props
  };
}
