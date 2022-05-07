import { message, notification } from 'antd';

export const openNotificationWithIcon = (type, desc) => {
  const mssgTag = type && type[0].toUpperCase() + type.slice(1);
  let content = desc;
  if (typeof content === 'object') {
    content = content[Object.keys(content)[0]];
  }
  if (content === undefined) {
    content = (
      <span>
        Unable to connect to the server.<p>Please try again later</p>
      </span>
    );
  }
  notification[type]({
    message: mssgTag,
    description: content,
  });
};

export const errorMessage = (mssg) => {
  let content = mssg;
  if (typeof content === 'object') {
    content = Object.keys(content)
      .map((key) => content[key])
      .join(' -- ');
  }
  message.error({
    content,
    duration: 4,
    style: {
      marginTop: '20vh',
    },
  });
};
