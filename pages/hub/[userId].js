import { useRouter } from 'next/router';
import styles from '../../styles/Hub.module.css';

export default function Hub() {
  // TODO use userId to fetch users hub data on future implementation
  const router = useRouter();
  const { userId } = router.query;

  return (
    <div
      // className={styles.container}
      className=" bg-red-600 lg:grid"
    >
      {/* <h1>The social hub owner is {userId}</h1> */}

      <div className="bg-blue-500 col-start-1 col-end-5">User Info</div>
      <div className="bg-green-500 col-start-5 col-end-12">
        Social Media Hubs
      </div>
    </div>
  );
}
