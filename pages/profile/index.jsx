import React from 'react';
import { BasicLayout, PageCenterWrapper } from '../../components/Layouts';
import { ProfileDetails } from '../../components/profile';

function ProfilePage() {
  return (
    <PageCenterWrapper>
      <ProfileDetails />
    </PageCenterWrapper>
  );
}

export default ProfilePage;

ProfilePage.getLayout = function getLayout(page) {
  return <BasicLayout pageProtected>{page}</BasicLayout>;
};
