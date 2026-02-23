import { Link } from 'react-router-dom';
import { SETTER_PATH } from '../setter/constants';

function HomePage() {
  return (
    <main className="p-4">
      <div className="flex flex-col gap-4">
        <h1>Home Page</h1>
        <Link className="bg-blue-900 p-2 w-[200px] text-center text-white" to={SETTER_PATH}>
          Go to Setter
        </Link>
      </div>
    </main>
  );
}

export default HomePage;
