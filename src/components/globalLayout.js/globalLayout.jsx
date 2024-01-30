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
import TextArea from 'antd/es/input/TextArea';




const { Header, Sider, Content } = Layout;
const GlobalLayout = ({ children }) => {
  const { user, logout } = useContext(Contexto);

  const [collapsed, setCollapsed] = useState(false);
  const [mensage, setMensage] = useState()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const sendMensage = (e) => {
    e?.preventDefault();
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
  const handleKeyPress = (event) => {
    if (event?.key === 'Enter') {

      sendMensage();
    }
  };

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
              icon: <UploadOutlined  style={{color:"red"}}/>,
              label: 'Sair',
              onClick:()=>{logout()}
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
          className='max-h-[100%] h-2 p-0 overflow-y-auto  overflow-x-hidden'
        >
          {children}

        </Content>
        <div className='flex justify-center items-center'>
          <form onSubmit={sendMensage} className='w-11/12 flex  gap-4 flex-nowrap justify-center itens-center'>
            {false && <Input
              type='textarea'
              prefix="Mensagem"
              placeholder={`Mensagem...`}
              onChange={(e) => setMensage(e.target.value)}
              value={mensage}
              className="mb-5 w-11-12  max-h-s "
              autoSize={{ minRows: 10, maxRows: 50 }}
              style={{ whiteSpace: 'pre-wrap' }}
            />}


            <TextArea onChange={(e) => setMensage(e.target.value)}
              value={mensage}
              className="mb-5 w-11-12  max-h-s w-full sm:w-[60%] lg:w-[50%]"
              autoSize={{ minRows: 2, maxRows: 50 }}
              onKeyUp={handleKeyPress}
              rows={1} placeholder="Mensagem" maxLength={5000} />

            {false && <button className='flex justify-center itens-center   rounded-3xl h-5 bg-green-500 shadow-xl w-36 ' type="submit">
              <SendIcon className='top-3' type="submit" />
            </button>}
          </form>
        </div>

      </Layout>


    </Layout>
  );
};
export default GlobalLayout;