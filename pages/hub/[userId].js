import { useRouter } from 'next/router';
import ProfilePicture from '../../components/ProfilePicture';
import styles from '../../styles/Hub.module.css';
import { FaSmile, FaYoutube, FaFacebook } from 'react-icons/fa';

export default function Hub() {
  // TODO use userId to fetch users hub data on future implementation
  const router = useRouter();
  const { userId } = router.query;

  return (
    <main className=" bg-red-600 lg:grid h-screen">
      {/* user info */}
      <section className="bg-blue-500 col-start-1 col-end-3 flex flex-col p-4 gap-4">
        <div className="bg-red-600 w-3/4 self-center">
          <ProfilePicture
            // className="flex-1"
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            // width={200}
            // height={200}
            layout="responsive"
          />
        </div>

        <div className="bg-pink-500 h-full w-3/4 self-center break-words">
          <h1 className="font-bold text-2xl">Username</h1>
          <h2 className="text-md">Description/About</h2>
        </div>
      </section>

      {/* social medias */}
      {/* // NOTE this section should have a grid that takes into account how many social medias the user has */}
      <section className="bg-green-500 col-start-3 col-end-12 p-4 grid gap-4 overflow-y-scroll">
        {/* // NOTE think about how to dynamically set / pass the icon component based on DB data */}
        <SocialMediaCard icon={<FaYoutube />} name="YouTube" />
      </section>
    </main>
  );
}

const SocialMediaCard = ({
  icon = <FaSmile />,
  name = 'Social Media Name',
  url = '#',
}) => {
  return (
    <a
      className="bg-purple-600 p-8 rounded-xl"
      href={'https://www.youtube.com/channel/UCvjLVsW-VlUyAssyS3QsRQA'}
      target="_blank"
    >
      <h3>{name}</h3>
      {icon}
    </a>
  );
};
