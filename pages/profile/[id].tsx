import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import axios from 'axios';

import { GoVerified } from 'react-icons/go';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';

import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile: NextPage<IProps> = ({ data }) => {
  return <div>Profile</div>;
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);
  return {
    props: { data: res.data },
  };
};

export default Profile;
