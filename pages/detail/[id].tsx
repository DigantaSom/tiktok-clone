import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

import { Video } from '../../types';
import { BASE_URL } from '../../utils';

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

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
