import { Menu } from 'react-admin';
import { AiFillHome } from 'react-icons/ai';

export const MyMenu = () => (
  <Menu>
    <Menu.DashboardItem />
    <Menu.ResourceItem name="users" />
    <Menu.ResourceItem name="articles" />
    <Menu.ResourceItem name="categories" />
    <Menu.ResourceItem name="user_infos" />
    <Menu.Item to="/" primaryText="Accueil" leftIcon={<AiFillHome size={'25px'} />} />
  </Menu>
);

export default MyMenu;
