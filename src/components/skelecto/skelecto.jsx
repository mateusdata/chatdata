import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Avatar, List, Skeleton, Switch } from 'antd';
const listData = Array.from({
  length: 5,
}).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i + 1}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));
const IconText = ({ icon, text }) => (
  <>
    {React.createElement(icon, {
      style: {
        marginRight: 8,
      },
    })}
    {text}
  </>
);
const Skelecto = ({loading}) => {
  
 
  return (
    <>
     
      <List
        itemLayout="vertical"
        size="large"
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={
              !loading
                ? [
                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                  ]
                : undefined
            }
            extra={
              !loading && (
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              )
            }
          >
            <Skeleton loading={loading} active avatar>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};
export default Skelecto;