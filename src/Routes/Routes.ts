export const userRoutes = {
  home: '/user',
  profile: {
    main: '/user/profile/main',
    community: '/user/profile/:userId',
  },
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
  membership: '/user/store',
};

export const guestRoutes = {
  home: '/',
};
