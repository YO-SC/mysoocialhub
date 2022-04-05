import { useRouter } from 'next/router';
import ProfilePicture from '../../components/ProfilePicture';
import styles from '../../styles/Hub.module.css';
import {
  FaSmile,
  FaYoutube,
  FaFacebook,
  FaTiktok,
  FaInstagram,
} from 'react-icons/fa';

export default function Hub() {
  // TODO use userId to fetch users hub data on future implementation
  const router = useRouter();
  const { userId } = router.query;

  return (
    <main className="  lg:grid h-screen">
      {/* user info */}
      <section className="bg-primary col-start-1 col-end-3 flex flex-col p-4 gap-4">
        <div className=" w-3/4 self-center">
          <ProfilePicture
            // className="flex-1"
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            // width={200}
            // height={200}
            layout="responsive"
          />
        </div>

        <div className=" h-full w-3/4 self-center break-words">
          <h1 className="font-bold text-2xl">Username</h1>
          <h2 className="text-md">Description/About</h2>
        </div>
      </section>

      {/* social medias */}
      {/* // NOTE this section should have a grid that takes into account how many social medias the user has */}
      <section className="bg-secondary col-start-3 col-end-12 px-10 py-4 flex flex-col gap-4 overflow-y-auto">
        {/* // NOTE think about how to dynamically set / pass the icon component based on DB data. This goes for the icon size and color props too */}
        <SocialMediaCard
          icon={<FaFacebook size="2.5rem" color="white" />}
          name="Facebook"
        />
        <SocialMediaCard
          icon={<FaYoutube size="2.5rem" color="white" />}
          name="YouTube"
        />
        <SocialMediaCard
          icon={<FaTiktok size="2.5rem" color="white" />}
          name="TikTok"
        />
        <SocialMediaCard
          icon={<FaInstagram size="2.5rem" color="white" />}
          name="Instagram"
        />
      </section>
    </main>
  );
}

const SocialMediaCard = ({
  bgColor = 'bg-accent-primary',
  icon = <FaSmile size="2.5rem" color="white" />,
  name = 'Social Media Name',
  url = '#',
}) => {
  return (
    <div className={`${bgColor} p-8 rounded-xl`}>
      {/* <span> */}
      <a
        // w-fit h-fit flex-1 <- if need to dynamically adjust size
        className="flex gap-3 items-center justify-center"
        href={url}
        target="_blank"
      >
        <span>{icon}</span>
        <h3 className="text-lg font-semibold text-white">{name}</h3>
      </a>
      {/* </span> */}
    </div>
  );
};
