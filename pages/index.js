import TripInput from '../components/TripInput'
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <AccountCircleTwoToneIcon />
      <TripInput />
    </div>
  );
}
