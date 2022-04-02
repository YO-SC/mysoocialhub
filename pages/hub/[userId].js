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
      <div className="bg-blue-500 col-start-1 col-end-5 flex flex-col">
        <div className="bg-red-600  h-1/2 w-1/2 self-center">
          <ProfilePicture
            // className="flex-1"
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            // width={200}
            // height={200}
            layout="responsive"
          />
        </div>

        <div className="bg-purple-500">
          <p>info here</p>
        </div>
      </div>

      {/* social media hubs */}
      <div className="bg-green-500 col-start-5 col-end-12">
        Social Media Hubs
      </div>
    </div>
  );
}
