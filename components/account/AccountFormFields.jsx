import { Select, Tooltip } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import styles from './styles/Form.module.css';
import { InputField, PasswordField, SelectInputField } from '../form-elements';

const { Option } = Select;

export function EmailInput() {
  return (
    <InputField
      name="email"
      placeholder="Email"
      className={styles.form_input}
      prefix={<MailOutlined className={styles.form_input_icon} />}
      rules={[
        {
          required: true,
          pattern: /^[\w-.]+@([\w-]+\.)+([a-zA-Z]([\w]){1,5})$/,
          message: 'please input a valid email',
        },
      ]}
    />
  );
}

export function UsernameInput() {
  return (
    <InputField
      name="name"
      placeholder="Username"
      className={styles.form_input}
      prefix={<UserOutlined className={styles.form_input_icon} />}
      rules={[
        {
          required: true,
          whitespace: true,
          message: 'please input your username!',
        },
      ]}
    />
  );
}

export function PasswordInput() {
  return (
    <PasswordField
      name="password"
      placeholder="Password"
      className={styles.form_input}
      prefix={<LockOutlined className={styles.form_input_icon} />}
      rules={[
        {
          required: true,
          whitespace: true,
          min: 6,
          message: 'password must be at least 6 characters',
        },
      ]}
    />
  );
}

export function PhoneNumberInput() {
  return (
    <Tooltip
      title="Example: +86-12089452001"
      placement="topLeft"
      trigger="focus"
    >
      <InputField
        name="phone_no"
        placeholder="Phone number"
        className={styles.form_input}
        prefix={<MobileOutlined className={styles.form_input_icon} />}
        rules={[
          {
            pattern: /^\+[0-9]{1,4}-([0-9]{11})$/,
            message: 'invalid phone number',
          },
        ]}
      />
    </Tooltip>
  );
}

export function RoleSelectInput() {
  const roles = ['USER', 'ADMIN', 'SUPER_ADMIN'];
  return (
    <SelectInputField
      name="role"
      placeholder="Select role"
      className={styles.form_input}
      rules={[{ required: true, message: 'please select a role!' }]}
    >
      {roles.map((role) => (
        <Option key={role} value={role}>
          {role}
        </Option>
      ))}
    </SelectInputField>
  );
}

export function StationSelectInput({ stations = [] }) {
  return (
    <SelectInputField
      name="station"
      placeholder="Select station"
      className={styles.form_input}
    >
      {stations.map(({ _id, en_name, cn_name }) => (
        <Option key={_id} value={en_name}>
          {`${en_name} (${cn_name})`}
        </Option>
      ))}
    </SelectInputField>
  );
}
