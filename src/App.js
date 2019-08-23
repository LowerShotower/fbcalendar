import React, { Component } from "react";
import { Layout, PageHeader } from 'antd';
import { BrowserRouter as Router } from "react-router-dom";
import ContentWrapper from './components/layout/ContentWrapper';
import Navigation from './components/layout/Navigation';
import Routes from "./components/routes/Routes";
import { selectors } from './store/reducers/selectors';
import './App.css';
const { Header, Content, Footer } = Layout;
class App extends Component {
  render() {
    return (
      <Router>
        <Layout className='Layout'>
          <Header className='PageHeader'>
            <Navigation />
          </Header>
          <Content className='Content'>
            <ContentWrapper >
              <Routes />
            </ContentWrapper>
          </Content>
          <Footer className='Footer'>
            Firebase Calendar ©2019 Created by Artsem Zhgrou
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
