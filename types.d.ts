export interface Video {
  _id: string;
  caption: string;
  video: {
    _id: string;
    asset: {
      _id: string;
      url: string;
    };
  };
  postedBy: {
    _id: string;
    userName: string;
    image: string;
  };
  likes: {
    postedBy: {
      _id: string;
      userName: string;
      image: string;
    };
  }[];
  comments: {
    _key: string;
    comment: string;
    postedBy: {
      _ref: string;
    };
  }[];
  userId: string;
}

export interface IUser {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}

export interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: {
    _id: string;
    _ref: string;
  };
}
