import React from 'react';
import {SketchPicker} from 'react-color';
import axios from 'axios';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { Card, Button, Input, Select, Row, Col, Table } from "antd";

class Basic extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      displayColorPicker: false,
      color: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      },
      loading:false,
      TableData: [],
    };

    this.columns = [{
      title: 'Train Number',
      dataIndex: 'trainNumber',

  }, {
      title: 'Train Name',
      dataIndex: 'trainName',
     
  }, 
  
  ];
  }

  async componentDidMount () {
    Nprogress.start ();
    // this.setState ({loading: true});

    // await axios.post(db[0].URLName + `BranchDetails_Grid_GetAll`)
    //     .then(res => {
    //         this.setState({ TableData: JSON.parse(res.data.Data) });
    //     });

    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

    // const bodyParameters = {
    //    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTY1NzE3MjgsImNvbXBhbnlOYW1lIjoiSm9obiBEb2UgUmFpbHdheXMiLCJjbGllbnRJRCI6IjkyNjU4MDc2LTM3MjUtNDAyMS1hNzNkLTcxNjExM2IxMWM5MSIsIm93bmVyTmFtZSI6IiIsIm93bmVyRW1haWwiOiIiLCJyb2xsTm8iOiIyMEJJVDQwNzMifQ.JeuFsMpbPu1MN1_oNdtE13UJTPqa7Fvi1oV8oy1khJI"
    // };

    // await axios.post(
    //   'http://20.244.56.144/train/trains',
    //   bodyParameters,
    //   config
    // ).then(console.log).catch(console.log);

    //     this.setState({ loading: false });

    const api = 'http://20.244.56.144/train/trains';
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTY1Nzk2NzksImNvbXBhbnlOYW1lIjoiSm9obiBEb2UgUmFpbHdheXMiLCJjbGllbnRJRCI6IjkyNjU4MDc2LTM3MjUtNDAyMS1hNzNkLTcxNjExM2IxMWM5MSIsIm93bmVyTmFtZSI6IiIsIm93bmVyRW1haWwiOiIiLCJyb2xsTm8iOiIyMEJJVDQwNzMifQ.Fo0KGF_Wkacs4CU-aWPrRLVZiZwIiMXgVaGsyTztqNg';
    /*
    const config = {
      headers: {
          "Content-type": "application/json",
           "Authorization": `Bearer ${token}`,
      },
 }; 

 axios.get(`${api}`, null, config)

*/

    axios
      .get (api, {headers: {Authorization: `Bearer ${token}`}})
      .then (res => {
        console.log (res.data);
        this.setState ({TableData: res.data});
      })
      .catch (err => {
        console.log (err);
      });

    Nprogress.done ();
  }

  

  render () {
    const background = `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`;
    return (
      <Row>


      <Col lg={24} md={24} sm={24} xs={24}>
          <Table loading={this.state.loading} className="gx-table-responsive" columns={this.columns} dataSource={this.state.TableData} size="middle" bordered pagination={{ pageSizeOptions: ['10', '20', '50', '100'], showSizeChanger: true }}/>
      </Col>
  </Row>
    );
  }
}

export default Basic;
