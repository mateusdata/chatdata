import React, { useContext, useEffect, useRef, useState } from 'react';
//import './index.css';
import {
  ArrowDownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Grid, Avatar, FloatButton, Tooltip } from 'antd';
import { Contexto } from '../../context/Contexto';
import axios from 'axios';
import { ArrowLeft, Chat, ChatBubble, ChatSharp, Logout, Send } from '@mui/icons-material';
import TextArea from 'antd/es/input/TextArea';
import { api } from '../../config/api';
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

  const ws = useRef(null);


  useEffect(() => {
    ws.current = new WebSocket('ws://chat-data-api.onrender.com');
    ws.current.onopen = () => {};
    ws.current.onmessage = (event) => {};
    ws.current.onclose = () => {};
    return () => {
      ws.current.close();
    };
  }, []);

  const sendWebSocketMessage = (message) => {
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message)); // Enviar como JSON string
      //console.log('Mensagem enviada via WebSocket:', message);
    } else {
      //console.error('Erro: WebSocket não está aberto para enviar mensagem.');
    }
  };
  
  const sendMensage = async (e) => {
    try {
      e?.preventDefault();
      if (!mensage) return;
  
      const currentTime = new Date();
      const hours = currentTime.getHours().toLocaleString("pt-BR", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      const minutes = currentTime.getMinutes().toLocaleString("pt-BR", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      const hora = `${hours}:${minutes}`;
  
      const messageData = {
        talk: mensage.trim(),
        time: hora,
        phoneUser: user.email,
        currentUser: user.nome,
      };
  
      sendWebSocketMessage(messageData); // Envia a mensagem via WebSocket
  
      setMensage(""); // Limpa o campo de mensagem após o envio
  
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      alert("Erro ao enviar mensagem. Tente novamente mais tarde.");
    }
  };
  

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
      setCollapsed(true);
      setCollapsedWidth(80);
    }
  }, [screens]);

  return (
    <Layout className=''>
      <Sider className='min-h-screen '
        breakpoint='lg' collapsedWidth={collapsedWidth} trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical " />
        <Menu
          className='min-h-screen bg-[#F0F4F9]'
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <ChatBubble style={{ height: 24, width: 24, color: "#2D6CEA" }} />,
              label: <p className='text-xl'>Chatdata</p>,
            },
            {
              key: '2',
              icon: <Avatar style={{ left: -5 }} size={35} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///9NTU1KSko+Pj5GRkY5OTlDQ0NISEg3NzdAQEA4ODjU1NT8/Pzn5+fd3d00NDRqamru7u5YWFhycnJSUlL29vbHx8esrKyYmJjMzMyFhYW0tLTt7e1dXV2jo6OwsLCdnZ3AwMCQkJB9fX1xcXGJiYllZWVMV/QYAAAI1UlEQVR4nO2dbbuiLBCAVxAUTXs1K7PXU///Jz51zgajZkcFFPfh/nKua7dsRmCGgWH488disVgsFovFYrFYLBaLxWKxWCwWi8ViGSFJFIdhGEfJ0IJoYBKmu5wQgp88/ua7NJwMLZQ6ouPMx9RDjgB5FPuzNBpaNBVMsjygUDmgJg3ybOwtOd8Q9l69v0oyspkPLaQEycV3P6j3g+tfRmt5juR3/b51JMehRe1EtGCN9HvCFiO0Oen00/grg6bp0AK3ZYnrdKn5d7wcWuRWzFfVEfjwgIQwZ+Wwh+OnXuX/XWdERjXCpZZClLi7LHypMA+znUfKXhKx0QzGmBRlR9g5xNVPHZzSi0Ck+ikjiUlR7uArrPlk+BUUdRyHivtiy+DZJ6njWcEiIbzvTc7OTArW0qXrXz6/ptAoIcf8eeoXFBhffxd4coXN6H71IKMUBziRmWaNvpNNwXfYQbOEksRAWETqLEyZEBrfqdnWZiVERbi5e4MOFK00yicN7KOkjf+OgIcxuZ8mPuhsTbvoDyHo3r658eJN2FHSzMgIMtGK7k2LdArYi3Zwd62/vROvxzfV74smRF6Hr4vFOFMbEYxCsu3w/a3op4aOxJS+BPS6RbNLHjRSMyN+4Qv9boFexDuBmT5RBE3eteMjrrwRjQyjDlRaPPGSqIlef/HqpGgx6DO0MeeDiHZf3z3yfuCbtyy15lPSoLu/3vNuyn6LnPvn5KroYLybuidVgiljyWXbSDxlw9+TeQvE3NCzs8RTzryvd5n3aWXCDU2LwLdKxNdsfNOWpEQIG8iINgm4UzVtATzkL59KPYe7C2zarGb7GkCSvpobU9YlPNEJd4doJvWcGdfQNIdoNWyKuRqKcZhLPSc3dhwKW+pKPYcv9eB2q5H6Ea6aSPlD7lalJg46SNS4ajBxMG4xik8opUyEiMGYMslUwY0gPUk8RcRgciZZByLuuUs85a4kBtODiHsklnPForJUDKYHYSMkhBOvybjQ4gHPUJAYQnwwI0ehZKrgA7HrkvejH3CXY+AwLMxqLh0fcTF3RvMN2P/rZmvA5pXc1E8XJx6fd9z/E/uPUj5VH3vRBH6XJYgYfN/QTWCxddQphOKBU/fNK93E3BQ67NT62yeRqRKYtgrFEZu4bZNNCukmHbeQ+yACSTEt8yj3IH1vauB85oVwaA5CbVxGgkTaV2d32gcTkPWFVs1VTEA+nMNMW88vsA6Aio2T7+cw6zYwbZGtxI0CFRvOvUKYN00NzRYSwP7mTJskHBxAvp+RG/gl5oVMfXb/zS5G98LxKGLe/n0FmEf5PND08exdsikej2rtRgdhXVDRccmprl3mp9L5vanhVubFuaii4/rXddUDTNbX8vnLqXmLMzWUWvExD2NkmYaiuyZhuiSsfLprLC34JCydfHoOSIoJy5fX3XWZM4Krh5+bp/YbwX5Fyxp8a4E8z0MV5b678srQmLCWHXmnRy2kfdr04Jxxs3PO3w2IR2NjIJOd3+woMPJ3xm00NSS+Vy1OVT9yNzakb0A4Cz73VTeYjcqEviG64Irje+ExfDE4nm/O+sZKpU1+ipuw3Yhc/G/E2W4REMwYpZQxTILFLhvz6KthH67PWZad1+E/0TUtFovFYrH8T0nmUfwkmo81HKwj2h4319wloG4iofl1c1z/A7O3OLvkhDDqeuVQGHkufUzBF7cRz8Cj4xJj6n6O8pFLMVkeR6hlePHIm4JeNWpS4l5My1z/SHjBLRbafnAxvoxkPSNJndbqvZREB/M31+KdX1OttAmI+lezh+T2TpqOvTo8cjd3RG4X5Vp73RoSL8xcoQrzev3Q0/dhEhDmPtzg4y/B7IMfQTg3z+hEy5rlbY8yQmeXdB1GyWubdJJE4fp4+aKPucD7Xo3Il2HznY3/TlJEMV6m23r7OA/TK36zl/h8M1OTEqG33pvdQo/5s7SJYYyPM//dsjh1TRmOk+u7Hd/p8twi6+t8fedkSIOSfT0Q0op/d0metQ2QkiyvFlZ2TTiFePHLYlH/1s1rx5eg0tv9oRMV53lZJooPEqeCDqzyvMWgE7mw7AIpk63wlJZ1RJ3KaikiLeXNeMFBgWk4lMdjo/w/LdyKFa2Vbccn5QQAPFCixqzYndhCXVQQl+q50yHOW07yQl9CirtSWmxGd9H78lyyKsxCqPLC+FHRSntOzyomxerxvo455Kbgadvl/ktTVFCXPS/6ol5VnBSSuV1tPjkp9FTUY0fN4RhkOo9hFSphe71luRdKdhO9YdwJpji6PTkNeKTC8XVfoJJBe0N7cf0p7Dg9ZGYXUqpxDxO4wmGDXjKzt4Vf1D4Nn+O+FSypqP3ISQ78hN9XYi/sqLqPDW2AlenxliZQ7NuhWqP+EBg21udq3wkMDl/jUJyAFnT7PW99BT9N9a3AgbLpvZ+iAwZA38vdggOiuO/1oQT0U20rN+Cwi86xUMMW2ABNxU1F3QuHDrGnsNH9+6DsxUBHWcFQ1HJkHxRM6FxiRw5RlV5L2YUQFL0Yav0SXPKi4SgfrzM2ZFn/hRBCrgDlG8DlE8FwO9CghA1WPesHxWOGPCko5hyqrV1oyP0hiZADq3XJvJDa0CWcxB0TUtULK4DqQXjgjWcxeVN6y8dN3AAz9NUa4DYbhQYBFFIbuglhIyq0COJiDQMKqYmRqPBGIeFoDbiIKdFwoxC4BciEU/OiNJ8yW7NR/0gZxAtXVjNL2zyiI2J+JXcPAwdc7GDGLe+ZuCJCzRT5JEqvDm9nnghbo6iQK98ORabcZMuDcTXFeEEJ5Lb3UupCcUHlzLx7tEQ3pSpe+o53CaWTeSn4goOSSqdikjT0pFsgpt8Kyu+LYWhQfeZY3DUhPxDBqFYgmipUFIB/sTHytoIvhTcMiFsdzBmGIIRSYP54jzfq8p6turEj7lwkJtVTUyiWmHZjJaKpQnQt2UXFbIp/IGZETi9y8leuqWy8E4UvTAh+BTGXy7ATYBaLxWKxWCwWi8VisVgsFovFYrFYLJZ/mP8AK/5e8CsGOp4AAAAASUVORK5CYII="} />,
              label: <p className='text-lg text-black'>Conversa publica </p>,
              className: "bg-gray-100 mt-50",
              style: { marginTop: 20 }
            },
            {
              key: '3',
              icon: <Logout style={{ color: "red", height: 24, width: 24 }} />,
              label: <p className='text-lg text-[red] font-bold'>Sair</p>,
              onClick: () => { logout() },
              style: { marginTop: "75vh", backgroundColor: "transparent" }
            },
          ]}
        />
      </Sider>
      <Layout className='' >
        {/*"Aqui é a cor do fundo em volta do filho do menu"*/}
        <Header

          className='bg-gray-50'
          style={{
            padding: 0,
            background: 'colorBgContainer',

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
          className={`max-h-[100%] h-2   p-0 overflow-y-auto  overflow-x-hidden bg-gray-50`}
        >
          {children}

        </Content>
        <div className='flex  w-1/2justify-center items-center bg-gray-50  '>
          <form onSubmit={sendMensage} className='w-11/12 flex  gap-4 flex-nowrap justify-center bg-gray-50  itens-center'>
            <TextArea onClick={() => setShowScrow(true)} onChange={(e) => setMensage(e.target.value)}
              value={mensage}
              className="mb-5 w-11-12 pt-3 p-3 flex flex-col  rounded-3xl shadow-2xl border-y-2 border-gray-600 bg-gray-50  max-h-s w-full sm:w-[60%] lg:w-[50%]"
              autoSize={{ minRows: 1, maxRows: 50 }}
              onKeyUp={handleKeyPress}
              rows={1} placeholder="MENSAGEM..." maxLength={5000} />

            <button className=' flex  justify-center mt-1 h-12 w-8'>
              <Send className='hover:text-green-400' style={{ color: "green", fontSize: "38px" }} />
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