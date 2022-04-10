import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import { useRouter } from 'next/router';
import styles from './styles/SideNav.module.css';
import sideNavMenuItems from './sideNavMenuItems';

const { SubMenu } = Menu;

function SideNavMenu() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState({
    selectedKey: '1',
    defaultOpenKey: '',
  });

  console.log('PATH_NAME', router.pathname);

  // returns the active menu based on the current url path
  const getActiveMenu = () => {
    let activeMenuItem = {};
    let defaultOpenMenu = {};

    for (let i = 0; i < sideNavMenuItems.length; i += 1) {
      const item = sideNavMenuItems[i];
      if (router.pathname === item?.href) {
        activeMenuItem = item;
        break;
      }
      if (item.children) {
        activeMenuItem = item.children.find(
          (subItem) => router.pathname === subItem.href
        );
        if (activeMenuItem !== undefined) {
          defaultOpenMenu = item;
          break;
        }
      }
    }
    return { activeMenuItem, defaultOpenMenu };
  };

  useEffect(() => {
    const { activeMenuItem, defaultOpenMenu } = getActiveMenu();
    console.log(activeMenuItem);
    console.log(defaultOpenMenu);
    setActiveMenu({
      selectedKey: activeMenuItem?.key,
      defaultOpenKey: defaultOpenMenu?.key,
    });
  }, [router.pathname]);

  return (
    <Menu
      className={styles.sider_nav_menu}
      mode="inline"
      selectedKeys={[activeMenu.selectedKey]}
      // this prop is not working as expected
      defaultOpenKeys={[activeMenu.defaultOpenKey]}
    >
      {sideNavMenuItems.map((item) =>
        item.children ? (
          <SubMenu
            key={item.key}
            title={item.text}
            className={styles.sider_nav_submenu}
          >
            {item.children.map((subItem) => (
              <Menu.Item key={subItem.key}>
                <Link href={subItem.href}>{subItem.text}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ) : (
          <Menu.Item key={item.key}>
            <Link href={item.href}>{item.text}</Link>
          </Menu.Item>
        )
      )}
    </Menu>
  );
}

export default SideNavMenu;
