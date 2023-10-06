import React from 'react';
import {Card, Button, Input, Select, Row, Col, Table} from 'antd';
import {db} from 'routes/db/db.js';
import axios from 'axios';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import {Link} from 'react-router-dom';
import {EyeOutlined, SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

export default class AllTrain extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      TableData: [],
      loading: false,
    };

    // this.columns = [{
    //     title: 'Branch Code',
    //     dataIndex: 'Branch_Code',
    //     ...this.getColumnSearchProps("Branch_Code")
    // }, {
    //     title: 'Branch Name',
    //     dataIndex: 'BranchName',
    //     ...this.getColumnSearchProps("BranchName")
    // }, {
    //     title: 'Address-1',
    //     dataIndex: 'Address1',
    // }, {
    //     title: 'Address-2',
    //     dataIndex: 'Address2',
    // }, {
    //     title: 'District',
    //     dataIndex: 'DistrictName',
    //     ...this.getColumnSearchProps("DistrictName")
    // },
    // {
    //     title: 'Action',
    //     render: (text, record) => (
    //         <span>
    //             <Link to={{
    //                 pathname: '/components/nithi/branchdetailsview',
    //                 state: {
    //                     BranchCode: record.BranchCode
    //                 }
    //             }}><EyeOutlined style={{ fontSize: '20px', color: '#08c' }}/></Link>
    //         </span>
    //     ),
    // }
    // ];
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div className="custom-filter-dropdown">
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys (e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch (selectedKeys, confirm)}
          style={{width: 188, marginBottom: 8, display: 'block'}}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch (selectedKeys, confirm)}
          size="small"
          style={{width: 90, marginRight: 8}}
        >
          <SearchOutlined /> Search
        </Button>
        <Button
          onClick={() => this.handleReset (clearFilters)}
          size="small"
          style={{width: 90}}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{fontSize: 16}} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString ()
        .toLowerCase ()
        .includes (value.toLowerCase ()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout (() => this.searchInput.select ());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString ()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm ();
    this.setState ({searchText: selectedKeys[0]});
  };

  handleReset = clearFilters => {
    clearFilters ();
    this.setState ({searchText: ''});
  };

  async componentDidMount () {
    Nprogress.start ();
    this.setState ({loading: true});
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
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTY1NzE3MjgsImNvbXBhbnlOYW1lIjoiSm9obiBEb2UgUmFpbHdheXMiLCJjbGllbnRJRCI6IjkyNjU4MDc2LTM3MjUtNDAyMS1hNzNkLTcxNjExM2IxMWM5MSIsIm93bmVyTmFtZSI6IiIsIm93bmVyRW1haWwiOiIiLCJyb2xsTm8iOiIyMEJJVDQwNzMifQ.JeuFsMpbPu1MN1_oNdtE13UJTPqa7Fvi1oV8oy1khJI";
    axios
      .post (api, {headers: {Authorization: `Bearer ${token}`}})
      .then (res => {
        console.log (res.data);
      });

    Nprogress.done ();
  }

  render () {
    return (
      <Card className="gx-card" title="All Train">
        {/* <Row>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <Link to="/components/nithi/branchdetails" style={{ float: 'right' }}>
                            <Button className="gx-btn-warning">Add New Branch</Button>
                        </Link>
                    </Col>

                    <Col lg={24} md={24} sm={24} xs={24}>
                        <Table loading={this.state.loading} className="gx-table-responsive" columns={this.columns} dataSource={this.state.TableData} size="middle" bordered pagination={{ pageSizeOptions: ['10', '20', '50', '100'], showSizeChanger: true }}/>
                    </Col>
                </Row> */}
      </Card>
    );
  }
}
