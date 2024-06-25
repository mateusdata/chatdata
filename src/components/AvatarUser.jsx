import React, { useContext } from 'react';
import { Avatar, Badge, Space } from 'antd';
import { ContextWebSocket } from '../context/WebSocketContext';

const AvatarUser = ({ name }) => {
  const { websocketOpen } = useContext(ContextWebSocket)

  return (
    <Space size={24}>
      <Badge className='' dot style={{ backgroundColor: websocketOpen ? 'green' : "red", top: 5, right: 3 }}>
        <Avatar size={35} gap={10} style={{
          backgroundColor: "#7B1FA2",
          verticalAlign: 'middle',
        }} shape="large">
          <span className='text-lg'>{name ? name : ""}</span>
        </Avatar>
      </Badge>
    </Space>
  )
};

export default AvatarUser;
