import TripInput from '../components/TripInput'
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { Inter } from 'next/font/google'
import NavBar from '@/components/NavBar';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <NavBar/>
    </div>
  );
}
