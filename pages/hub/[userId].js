import { useRouter } from 'next/router';
import ProfilePicture from '../../components/ProfilePicture';
import styles from '../../styles/Hub.module.css';

export default function Hub() {
  // TODO use userId to fetch users hub data on future implementation
  const router = useRouter();
  const { userId } = router.query;

  return (
    <div className=" bg-red-600 lg:grid h-screen">
      {/* user info */}
      <div className="bg-blue-500 col-start-1 col-end-4 flex flex-col p-4 gap-4">
        <div className="bg-red-600 w-3/4 self-center">
          <ProfilePicture
            // className="flex-1"
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            // width={200}
            // height={200}
            layout="responsive"
          />
        </div>

        <div className="bg-pink-500 h-full w-3/4 self-center">
          <p>info here</p>
        </div>
      </div>

      {/* social media hubs */}
      <div className="bg-green-500 col-start-4 col-end-12">
        Social Media Hubs
      </div>
    </div>
  );
}
