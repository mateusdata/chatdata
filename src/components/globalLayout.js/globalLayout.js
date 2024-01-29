import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Input } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import Search from 'antd/es/input/Search';
const { Header, Sider, Content } = Layout;
const GlobalLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider className='bg-red-600 h-screen '  trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          className='bg-gray-50  h-full' 
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Chatdata v.2.0',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Conversa principal',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 100,
              height: 64,
            }}
          />
        </Header>
        <Content
        className='max-h-[800px] h-2 p-0 overflow-y-auto'
        >
          {children}
        </Content>
       {false &&  <Input prefix="Mensagem"  className='mb-5'/>}
       
      </Layout>
     
    </Layout>
  );
};
export default GlobalLayout;