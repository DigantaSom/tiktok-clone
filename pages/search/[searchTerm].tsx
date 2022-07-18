import { useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';

import { GoVerified } from 'react-icons/go';

import NoResults from '../../components/NoResults';

import useAuthStore from '../../store/authStore';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';
import VideoCard from '../../components/VideoCard';

interface IProps {
  videos: Video[];
}

const Search: NextPage<IProps> = ({ videos }) => {
  const [showAccounts, setShowAccounts] = useState(false);
  const router = useRouter();
  const { allUsers }: { allUsers: IUser[] } = useAuthStore();

  const { searchTerm } = router.query;

  const isAccounts = showAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const isVideos = !showAccounts ? 'border-b-2 border-black' : 'text-gray-400';

  const searchedAccounts = allUsers.filter(user =>
    user.userName.toLowerCase().includes((searchTerm as string).toLowerCase())
  );

  return (
    <div className='w-full'>
      <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isAccounts}`}
          onClick={() => setShowAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setShowAccounts(false)}
        >
          Videos
        </p>
      </div>
      {showAccounts ? (
        <div className='md:mt-16'>
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map(user => (
              <Link key={user._id} href={`/profile/${user._id}`}>
                <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                  <div>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      className='rounded-full'
                      alt='user profile'
                    />
                  </div>
                  <div className='hidden lg:block'>
                    <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                      {user.userName.replaceAll(' ', '')}{' '}
                      <GoVerified className='text-blue-400' />
                    </p>
                    <p className='capitalize text-gray-400 text-xs'>
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No video results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
          {videos.length ? (
            videos.map(video => <VideoCard key={video._id} post={video} />)
          ) : (
            <NoResults text={`No video results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  return {
    props: { videos: data },
  };
};

export default Search;
