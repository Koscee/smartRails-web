import PageCenterWrapper from './Layouts/PageCenterWrapper';
import LoadingSpinner from './LoadingSpinner';

function PageLoading() {
  return (
    <PageCenterWrapper>
      <LoadingSpinner size="large" />
    </PageCenterWrapper>
  );
}

export default PageLoading;
