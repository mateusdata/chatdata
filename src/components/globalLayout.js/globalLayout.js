import React, { useContext, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import SendIcon from "@mui/icons-material/Send";
import { Layout, Menu, Button, theme, Input } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import Search from 'antd/es/input/Search';
import { Contexto } from '../../context/Contexto';
import axios from 'axios';




const { Header, Sider, Content } = Layout;
const GlobalLayout = ({ children }) => {
  const { user, setUser } = useContext(Contexto);

  const [collapsed, setCollapsed] = useState(false);
  const [mensage, setMensage] = useState()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const sendMensage = (e) => {
    e.preventDefault();
    if (mensage) {
      setMensage("");
      const currentTime = new Date();
      let hours = currentTime.getHours().toLocaleString("pt-BR", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      let minutes = currentTime.getMinutes().toLocaleString("pt-BR", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      //let seconds = currentTime.getSeconds().toLocaleString('pt-BR', {minimumIntegerDigits: 2, useGrouping:false});
      const hora = `${hours}:${minutes}`;

      axios.post("https://chat-data-api.vercel.app/send", {
        talk: mensage,
        time: hora,
        phoneUser: user.email,
        currentUser: user.nome,
      });
    }
  }


  return (
    <Layout>
      <Sider className='bg-red-600 h-screen  w-80' trigger={null} collapsible collapsed={collapsed}>
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
          className='max-h-[100%] h-2 p-0 overflow-y-auto'
        >
          {children}

        </Content>
        <div className='flex justify-center items-center'>
        <form onSubmit={sendMensage} className='w-11/12 flex  gap-4 flex-nowrap justify-center itens-center'>
          <Input
            prefix="Mensagem"
            placeholder={`Mensagem...`}
            onChange={(e) => setMensage(e.target.value)}
            value={mensage}
            className="mb-5 w-11-12 flex-1"
          />

          {false && <button className='flex justify-center itens-center   rounded-3xl h-5 bg-green-500 shadow-xl w-36 ' type="submit">
            <SendIcon className='top-3'  type="submit"/>
          </button>}
        </form>
        </div>
        
      </Layout>


    </Layout>
  );
};
export default GlobalLayout;