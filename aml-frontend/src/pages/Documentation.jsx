import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Header 1", "1", <PieChartOutlined />,[
    getItem("Sub Header 1", "3"),
    getItem("Sub Header 2", "4"),
    getItem("Sub Header 3", "5"),
  ]
  ),
  getItem("Header 2", "2", <DesktopOutlined />, [
    getItem("Sub Header 1", "3"),
    getItem("Sub Header 2", "4"),
    getItem("Sub Header 3", "5"),
  ]),
  getItem("Header 3", "sub1", <UserOutlined />, [
    getItem("Sub Header 1", "3"),
    getItem("Sub Header 2", "4"),
    getItem("Sub Header 3", "5"),
  ]),

  getItem("Header 4", "sub2", <TeamOutlined />, [
    getItem("Sub Header 1", "3"),
    getItem("Sub Header 2", "4"),
    getItem("Sub Header 3", "5"),
  ]),
  getItem("Files", "9", <FileOutlined />, [
    getItem("Sub Header 1", "3"),
    getItem("Sub Header 2", "4"),
    getItem("Sub Header 3", "5"),
  ]),
];
const Documentation = () => {
  const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
      >
        <div className="demo-logo-vertical" />
        <Menu
        //   theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
    </Layout>
  );
};
export default Documentation;
