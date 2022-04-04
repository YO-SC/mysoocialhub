import { useRouter } from 'next/router';
import ProfilePicture from '../../components/ProfilePicture';
import styles from '../../styles/Hub.module.css';

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
          <h3 className="text-md">Description/About</h3>
        </div>
      </section>

      {/* social media hubs */}
      <section className="bg-green-500 col-start-3 col-end-12">
        Social Media Hubs
      </section>
    </main>
  );
}
