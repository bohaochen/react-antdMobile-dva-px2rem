import React from 'react';
import { Card, Icon } from 'antd-mobile';

const Loading = () => (<div
  style={{
    height: '100%',
    backgroundColor: '#f0f4f7',
    paddingTop: '5%',
  }}
>
  <Card
    title={(<span><Icon type="coffee" /> Loading...</span>)}
    style={{ width: '50%', margin: '0 auto' }}
  >
    正在努力为您加载...
  </Card>
</div>);

const Error = () => (<div
  style={{
    height: '100%',
    backgroundColor: '#f0f4f7',
    paddingTop: '5%',
  }}
>
  <Card
    title={(<span><Icon type="frown" /> 页面加载失败</span>)}
    style={{ width: '50%', margin: '0 auto' }}
  >
    Oops，页面似乎崩溃了！
  </Card>
</div>);

export default function MyLoadingComponent({ error, pastDelay }) {
  if (error) {
    console.log(error)
    return <Error />;
  } else if (pastDelay) {
    return <Loading />;
  } else {
    return null;
  }
}
