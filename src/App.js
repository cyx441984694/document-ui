import './App.css';

import React from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Layout, Divider, Table, Anchor, Card, Col, Row, Statistic } from 'antd';

// TBC add backend to get monitoring statistics 
//https://codehooks.io/docs/examples/react-backend-example
const API_ENDPOINT = 'http://localhost:8888/monitoring';

const { Content, Header } = Layout;

const mapping = {
  'howto1': 'https://reactjs.org',
  'howto2': 'https://www.google.com',
  'howto3': 'https://www.baidu.com',
  'howto4': 'https://www.runoob.com'
}

const dataSource = [
  {
    key: '1',
    newJoiner: 'howto1',
    errorTroubleshoot: 'howto3',
  },
  {
    key: '2',
    newJoiner: 'howto2',
    errorTroubleshoot: 'howto4',
  }
]
const columns = [
  {
    title: 'New to CMLP',
    dataIndex: 'newJoiner',
    key: 'newJoiner',
    render: text => <a href={mapping[text]}>{text}</a>,
  },
  {
    title: 'Errors troubleshoot',
    dataIndex: 'errorTroubleshoot',
    key: 'errorTroubleshoot',
    render: text => <a href={mapping[text]}>{text}</a>,
  }
]

const currentTime = new Date().toLocaleString();

const App: React.FC =()=> {
  const [ monitorStats, setMonitorStats] = useState(null);
  useEffect(()=>{
    const fetchData = async() => {
      const response = await fetch(API_ENDPOINT, {
        method: 'GET',
        // headers: { 'x-apikey' : API_KEY }
      });
      const data = await response.json();
      setMonitorStats(data.monitorStats);
    }
    fetchData();
  },[])

  // click anchor event
  const  clickAnchor = (e: any,
    link: {
      title: React.ReactNode;
      href: String,
    },)=> {e.preventDefault(); console.log(link)
  };
  
  return (
    <Layout>
      <Header style={{ display: 'flex', color: 'white'}}><span style={{ fontWeight: 'bold', fontSize: '26px'}}>Hello CMLP</span></Header>    
      <Content style={{ padding: '0 50px', minHeight: "85vh", background: "#fff",  }}>
        <p style={{height:'5vh'}}>This page is to guidance towards CMLP.</p>
        <h2>Directory</h2>
        <Anchor affix={false} onClick={clickAnchor} 
        targetOffset={window.innerHeight/8}
        items={[
          {
            key: 'metrics',
            href: '#metrics',
            title: 'Metrics',
          },
          {
            key: 'documentation',
            href: '#documentation',
            title: 'Documentation',
            children: [
              {
                key: 'newjoiner',
                href: '#newjoiner',
                title: 'New to CMLP',
              },
              {
                key: 'errorsTroubleshoot',
                href: '#errorTroubleshoot',
                title: 'Errors troubleshoot'
              },
            ],
          },
          {
            key: 'others',
            href: '#others',
            title: 'Others',
          }
        ]}></Anchor>
        <Divider orientation="left"></Divider>
        <div style={{ height: '30vh'}}>
          <h2 id="metrics">Metrics</h2>
          <p>show kinds of statistics</p>
          <Row gutter = {16}>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic 
                  title="Active user"
                  value= { monitorStats || 'NA'}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                  />
              </Card>
            </Col>
            <Col span={12}>
              <Card boardered={false}>
                <Statistic
                  title="Current time"
                  value= {currentTime}
                />
              </Card>
            </Col>
          </Row>
        </div>
        <Divider orientation="left"></Divider> 
        <div> 
          <h2 id="documentation">
            <a aria-hidden="true" href="#documentation"></a>
          Documentation</h2>
          <Table dataSource={dataSource} columns={columns} bordered></Table>
        </div>
        <Divider orientation="left"></Divider> 
        <div style={{ height: '40vh'}}>
          <h2 id="others">Others</h2>
          <p>Placeholder for others</p>
        </div>          
      </Content>
    </Layout>
  );
}

export default App;

