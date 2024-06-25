import React from 'react';
import { Avatar, Badge, Space } from 'antd';

const AvatarUser = ({name}) => (
  <Space size={24}>
    <Badge className='' dot style={{ backgroundColor: 'green', top:5, right:3  }}>
      <Avatar size={35} gap={10}   style={{
          backgroundColor: "#7B1FA2",
          verticalAlign: 'middle',
        }} shape="large">
       <span className='text-lg'>{name ? name:""}</span>
      </Avatar>
    </Badge>
  </Space>
);

export default AvatarUser;
