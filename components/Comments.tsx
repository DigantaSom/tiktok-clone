import { Dispatch, FormEvent, SetStateAction } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { GoVerified } from 'react-icons/go';

import NoResults from './NoResults';

import useAuthStore from '../store/authStore';
import { IComment } from '../types';

interface IProps {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: FormEvent<HTMLFormElement>) => void;
  isPostingComment: boolean;
  comments: IComment[];
}

const Comments: NextPage<IProps> = ({
  comment,
  setComment,
  addComment,
  isPostingComment,
  comments,
}) => {
  const { userProfile } = useAuthStore();

  return (
    <div className='border-t-2 border-b-2 border-gray-200 bg-[#F8F8F8] pt-4 px-10 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll lg:h-[475px]'>
        {comments?.length ? (
          <div>videos</div>
        ) : (
          <NoResults text='No comments yet' />
        )}
      </div>

      {userProfile && (
        <div className='absolute bottom-0 left-0 pb-6 px-2 md:px-10'>
          <form className='flex gap-4' onSubmit={addComment}>
            <input
              type='text'
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder='Add comment...'
              className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
            />
            <button type='submit' className='text-md text-gray-400'>
              {isPostingComment ? 'Commenting...' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
