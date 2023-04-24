import { Layout, LayoutProps } from 'react-admin';

import MyMenu from './MyMenu';

const MyLayout = (props: JSX.IntrinsicAttributes & LayoutProps) => (
  <Layout {...props} menu={MyMenu} />
);

export default MyLayout;
