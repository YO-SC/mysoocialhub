import { useRouter } from 'next/router';

export default function Hub() {
  // TODO use userId to fetch users hub data on future implementation
  const router = useRouter();
  const { userId } = router.query;

  return <div>The social hub owner is {userId}</div>;
}
