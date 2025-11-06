import { addUUID } from '@configs/utils/addUUID';

import { type IMenuConfig, type IMenuItem } from './type';

class MenuBuilder {
  private menu: IMenuConfig;

  constructor(initialMenu: IMenuConfig) {
    this.menu = initialMenu;
  }

  addIds(): MenuBuilder {
    Object.entries(this.menu).forEach(([menuKey, menuItems]) => {
      menuItems.forEach((item: IMenuItem) => {
        if (!item.id) {
          item.id = addUUID(menuKey);
        }
      });
    });
    return this;
  }

  getMenu(): IMenuConfig {
    return this.menu;
  }
}

const initialMenu: IMenuConfig = {
  headerCTAMenu: [
    {
      title: 'Zaloguj się',
      url: '/logowanie',
    },
    {
      title: 'Załóż konto',
      url: '/logowanie',
      button: true,
    },
  ],
  headerMenu: [
    {
      title: 'O projekcie',
      url: '/o-projekcie',
    },
  ],
};

const menuContent = new MenuBuilder(initialMenu).addIds().getMenu();

export default { menu: menuContent };
