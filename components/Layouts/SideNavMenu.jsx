import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import { useRouter } from 'next/router';
import styles from './styles/SideNav.module.css';
import sideNavMenuItems from './sideNavMenuItems';

function SideNavMenu() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(1);

  console.log('PATH_NAME', router.pathname);

  useEffect(() => {
    const matchedItem = sideNavMenuItems.find(
      (item) => router.pathname === item.href
    );
    console.log(matchedItem);
    setActiveIndex(matchedItem.key);
  }, [router.pathname]);

  return (
    <Menu
      className={styles.sider_nav_menu}
      mode="inline"
      selectedKeys={[`${activeIndex}`]}
    >
      {sideNavMenuItems.map((item) => (
        <Menu.Item key={item.key}>
          <Link href={item.href}>{item.text}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default SideNavMenu;
