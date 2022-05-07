import { Result, Button } from 'antd';

export default function Forbidden() {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" href="/">
          Back Home
        </Button>
      }
    />
  );
}
