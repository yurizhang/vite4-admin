
import React from 'react';
import {
  Table as Atable,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@tonic-ui/react";

import {Button, Space, Table, Tag } from 'antd';

import type { ColumnsType } from 'antd/es/table';


interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }
  
  const ButtonDemo: React.FC = () => (
    <Space wrap>
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </Space>
  );
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  
  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  const DemoTable: React.FC = () => <Table columns={columns} dataSource={data} />;

function TablePro() {
  return (
    <>
    <Atable>
      <TableHeader>
        <TableHeaderRow>
          <TableHeaderCell width="240px">Event Type</TableHeaderCell>
          <TableHeaderCell width="136px" textAlign="right">
            Detections
          </TableHeaderCell>
        </TableHeaderRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell width="240px">Virus/Malware</TableCell>
          <TableCell width="136px" textAlign="right">
            634
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell width="240px">Virus/Malware</TableCell>
          <TableCell width="136px" textAlign="right">
            778
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell width="240px">URL Filtering</TableCell>
          <TableCell width="136px" textAlign="right">
            598
          </TableCell>
        </TableRow>
      </TableBody>
    </Atable>

    <DemoTable />
    <ButtonDemo />
    </>
  );
}
export default TablePro;
