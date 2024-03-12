import React, { useContext, useEffect, useState } from 'react';
import {
  ArrowDownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Grid, Avatar, Tooltip, FloatButton } from 'antd';
import { Contexto } from '../../context/Contexto';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';
import './index.css';
import { ChatSharp, Logout, LogoutOutlined} from '@mui/icons-material';

const { Header, Sider, Content } = Layout;
const GlobalLayout = ({ children }) => {
  const { user, logout, showScrow, setShowScrow } = useContext(Contexto);
  const screens = Grid.useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  const [mensage, setMensage] = useState("")
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
        talk: mensage.trim(),
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
      {screens.lg && (
        <Sider
          className='h-screen custom-sider'
          trigger={null}
          collapsible
          collapsed={collapsed}
          collapsedWidth={0}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['1']}
            className='bg-gray-50  h-full'
            items={[
              {
                key: '1',
                icon: <ChatSharp style={{ height: 24, width: 24, color: "#2D6CEA" }} />,
                label: <p className='text-xl'>Chatdata - 4</p>,
              },
              {
                key: '2',
                icon: <Avatar style={{ left: -5 }} size={35} src={"https://3.bp.blogspot.com/-F4MfDKjSuvk/Ti5iBgpMMfI/AAAAAAAAABs/txgMqwk5v3c/s1600/352308683.jpg"} />,
                label: <p className='text-lg text-black'>Mateus santos</p>,
                className: "bg-gray-100 mt-50",
                style: { marginTop: 20 }
              },
              {
                key: '3',
                icon: <Logout style={{ color: "red", height: 24, width: 24 }} />,
                label: <p className='text-lg text-[red] font-bold'>Sair</p>,
                onClick: () => { logout() },
                style: { marginTop: "74vh", backgroundColor: "transparent" }
              },
            ]}
          />
        </Sider>
      )}

      <Layout className='min-h-[95vh] md:min-h-[98vh]'>

        <Header
          style={{
            padding: 0,
            background: "white",
          }}
        >

          <div>
            <Button
              type="text"
              className='hidden sm:flex'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => {
                setCollapsed(!collapsed)

              }}
              style={{
                fontSize: '16px',
                width: 100,
                height: 64,
              }}
            />
            <div className=' sm:hidden flex flex-nowrap px-5 pt-3 flex-row items-center justify-between'>
              <div onClick={() => logout()} className='flex items-center gap-0  px-1 rounded-lg '>
                <LogoutOutlined style={{ height: 40, width: 40, color: "red" }} className='ml-0 p-1' />
                <p className='tex-white text-lg'>Sair</p>
              </div>

              <p className='tex-white text-lg   px-1 py-2  shadow-sm' >Chatdata <ChatSharp style={{ height: 24, width: 24, color: "#2D6CEA" }} /></p>


            </div>
          </div>

        </Header>
        <Content
          className={`max-h-[100%] h-2  p-0 overflow-y-auto  overflow-x-hidden`}
        >
          {children}

        </Content>
        <div className='flex justify-center items-center'>
          <form onSubmit={sendMensage} className='w-11/12 flex  gap-4 flex-nowrap justify-center itens-center'>

            <TextArea onClick={() => setShowScrow(true)} onChange={(e) => setMensage(e.target.value)}
              value={mensage}
              className="mb-5 w-11-12 pt-3 p-3 flex flex-col  rounded-3xl shadow-2xl border-y-2 border-gray-600 bg-gray-50  max-h-s w-full sm:w-[60%] lg:w-[50%]"
              autoSize={{ minRows: 1, maxRows: 50 }}
              onKeyUp={handleKeyPress}
              rows={1} placeholder="DIGITE SUA MENSAGEM" maxLength={5000} />

            <Tooltip color={`${!showScrow ? "blue" : "red"}`} title={`${!showScrow ? "Scroll ativado" : "Scroll desativado"}`}>
          
            <FloatButton
            
              shape="circle"
              
              type="primary"
              style={{ right: 94 }}
              icon={<ArrowDownOutlined onClick={() => setShowScrow(!showScrow)} className={`   ${!showScrow ? "text-gray-50" : "text-red-300"} cursor-pointer`} />}
            />
            </Tooltip>
           

          </form>
        </div>

      </Layout>


    </Layout>
  );
};
export default GlobalLayout;