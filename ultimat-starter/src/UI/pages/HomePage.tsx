import { getUserLoader } from '@/store/globalState/globalApiSlice';
import { Welcome } from '@/UI/components/welcome/Welcome';

export default function HomePage() {
  return <Welcome />;
}

export function userLoader() {
  return getUserLoader();
}
