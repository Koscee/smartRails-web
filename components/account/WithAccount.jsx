import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/AuthContext';
import PageLoading from '../PageLoading';
import { isSuperOrBasicAdmin } from '../../utils/permissionCheck';

export default function WithAccount({ children }) {
  const { authData } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const redirectURL = isSuperOrBasicAdmin(authData.user?.role)
      ? '/admin/dashboard'
      : '/';
    if (authData.isAuthenticated) {
      router.push(redirectURL);
    }
  }, [router, authData]);

  if (!authData.isAuthenticated) {
    return children;
  }

  return <PageLoading />;
}
