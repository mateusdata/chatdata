import React, { useContext, useEffect, useState } from 'react';
import './index.css';
import {
  ArrowDownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Grid, Avatar, FloatButton, Tooltip } from 'antd';
import { Contexto } from '../../context/Contexto';
import axios from 'axios';
import { ArrowLeft, ChatSharp, Logout, Send } from '@mui/icons-material';
import TextArea from 'antd/es/input/TextArea';
const { Header, Sider, Content } = Layout;
const App = ({ children }) => {
  const [collapsedWidth, setCollapsedWidth] = useState(80);
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
  useEffect(() => {
    setCollapsedWidth(80 - collapsedWidth);
    setCollapsed(false);
    if (!screens.lg || !screens.sm || !screens.md) {
      setCollapsed(true);
      setCollapsedWidth(80 - collapsedWidth);
    }
    else {
      setCollapsed(false);
      setCollapsedWidth(80 - collapsedWidth);
    }
  }, [screens]);

  return (
    <Layout>
      <Sider className='min-h-screen '
        breakpoint='lg' collapsedWidth={collapsedWidth} trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          className='min-h-screen'
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <ChatSharp style={{ height: 24, width: 24, color: "#2D6CEA" }} />,
              label: <p className='text-xl'>Chatdata</p>,
            },
            {
              key: '2',
              icon: <Avatar style={{ left: -5 }} size={35} src={"https://3.bp.blogspot.com/-F4MfDKjSuvk/Ti5iBgpMMfI/AAAAAAAAABs/txgMqwk5v3c/s1600/352308683.jpg"} />,
              label: <p className='text-lg text-black'>Conversa </p>,
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
      <Layout className=' ' > {"-"}
        {/*"Aqui é a cor do fundo em volta do filho do menu"*/}
        <Header

          className=''
          style={{
            padding: 0,
            background: colorBgContainer,
            margin: '-22px -16px 0 0px',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          className={`max-h-[100%] h-2  p-0 overflow-y-auto  overflow-x-hidden`}
        >
          {children}

        </Content>
        <div className='flex  w-1/2justify-center items-center'>
          <form onSubmit={sendMensage} className='w-11/12 flex  gap-4 flex-nowrap justify-center itens-center'>
            <TextArea onClick={() => setShowScrow(true)} onChange={(e) => setMensage(e.target.value)}
              value={mensage}
              className="mb-5 w-11-12 pt-3 p-3 flex flex-col  rounded-3xl shadow-2xl border-y-2 border-gray-600 bg-gray-50  max-h-s w-full sm:w-[60%] lg:w-[50%]"
              autoSize={{ minRows: 1, maxRows: 50 }}
              onKeyUp={handleKeyPress}
              rows={1} placeholder="DIGITE SUA MENSAGEM" maxLength={5000} />

            <button className=' flex  justify-center mt-3 h-12 w-8'>
              <Send style={{color:"blue", height:"20px"}}  className='"text-red-300'/>
            </button>

            <div className='hidden md:block'>

              <Tooltip color={`${!showScrow ? "blue" : "red"}`} title={`${!showScrow ? "Scroll ativado" : "Scroll desativado"}`}>

                <FloatButton

                  shape="circle"

                  type="primary"
                  style={{ right: 94 }}
                  icon={<ArrowDownOutlined onClick={() => setShowScrow(!showScrow)} className={`   ${!showScrow ? "text-gray-50" : "text-red-300"} cursor-pointer`} />}
                />
              </Tooltip>

            </div>


          </form>
        </div>

      </Layout>


    </Layout>
  );
};
export default App;