export const userRoutes = {
  home: '/user',
  profile: '/user/profile',
  reportHistory: '/user/report-history',
  community: {
    index: '/user/community',
    friendRequest: '/user/community/friend-request',
    addFriend: '/user/community/add-friend',
  },
  chat: '/user/chat',
  stories: {
    index: '/user/stories',
    myStories: '/user/stories/my-stories',
    addStory: '/user/stories/add-story',
    show: '/user/stories/show',
    edit: '/user/stories/edit',
  },
  membership: '/user/membership',
};

export const guestRoutes = {
  home: '/',
};
