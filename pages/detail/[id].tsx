import { useState, useEffect, useRef, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

import LikeButton from '../../components/LikeButton';
import Comments from '../../components/Comments';

import { Video } from '../../types';
import { BASE_URL } from '../../utils';
import useAuthStore from '../../store/authStore';

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [comment, setComment] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { userProfile }: any = useAuthStore();

  useEffect(() => {
    if (post && videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [post, isMuted]);

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      setPost({ ...post, likes: data.likes });
    }
  };

  const addComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userProfile && comment) {
      setIsPostingComment(true);

      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });

      setPost({ ...post, comments: data.comments });
      setComment('');
      setIsPostingComment(false);
    }
  };

  if (!post) {
    return null;
  }

  return (
    <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap xl:flex-nowrap'>
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center'>
        <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
          <p className='cursor-pointer' onClick={() => router.back()}>
            <MdOutlineCancel className='text-black text-[35px]' />
          </p>
        </div>
        <div className='relative'>
          <div className='lg:h-[100vh] h-[60vh]'>
            <video
              src={post.video.asset.url}
              ref={videoRef}
              loop
              onClick={onVideoClick}
              className='h-full cursor-pointer'
            ></video>
          </div>
          <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] cursor-pointer'>
            {!isPlaying && (
              <button>
                <BsFillPlayFill
                  className='text-white text-6xl lg:text-8xl'
                  onClick={onVideoClick}
                />
              </button>
            )}
          </div>
        </div>

        <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
          {isMuted ? (
            <button onClick={() => setIsMuted(false)}>
              <HiVolumeOff className='text-black text-2xl lg:text-4xl' />
            </button>
          ) : (
            <button onClick={() => setIsMuted(true)}>
              <HiVolumeUp className='text-black text-2xl lg:text-4xl' />
            </button>
          )}
        </div>
      </div>

      {/* right side for likes and comments */}

      <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
        <div className='lg:mt-20 mt-10'>
          <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
            <div className='w-16 h-16 md:w-20 md:h-20 ml-4'>
              <Link href='/'>
                <Image
                  width={62}
                  height={62}
                  className='rounded-full'
                  src={post.postedBy.image}
                  alt='Profile Photo'
                  layout='responsive'
                />
              </Link>
            </div>
            <div>
              <Link href='/'>
                <div className='flex flex-col gap-2 mt-3'>
                  <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                    {post.postedBy.userName}{' '}
                    <GoVerified className='text-blue-400 text-md' />
                  </p>
                  <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <p className='px-10 text-lg text-gray-600'>{post.caption}</p>

          <div className='mt-10 px-10'>
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            isPostingComment={isPostingComment}
            comments={post.comments}
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);
  return {
    props: {
      postDetails: data,
    },
  };
};

export default Detail;
