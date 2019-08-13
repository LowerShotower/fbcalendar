import React, { Component } from "react";
import { Layout, PageHeader } from 'antd';
import { BrowserRouter as Router } from "react-router-dom";
import ContentWrapper from './components/layout/ContentWrapper';
import Navigation from './components/layout/Navigation';
import Routes from "./components/routes/Routes";
import { selectors } from './store/reducers/selectors';
const { Header, Content, Footer } = Layout;
class App extends Component {
  render() {
    return (
      <Router>
        <Layout style={styles.Layout}>
          <Header style={styles.PageHeader}>
            <Navigation />
          </Header>
          <Content style={styles.Content}>
            <ContentWrapper >
              <Routes />
            </ContentWrapper>
          </Content>
          <Footer style={styles.Footer}>Firebase Calendar ©2019 Created by Artsem Zhgrou</Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;

const styles = {
  Content: {
    flex: '1 0 auto',
    display: 'flex',
    justifyContent: 'stretch',
    alignItems: 'stretch',
    alignContent: 'stretch',
    padding: '0 50px',
    backgroundColor: '#fff'
  },
  Footer: {
    textAlign: 'center',
  },
  Layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    minHeight: '100%'
  },
  PageHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: '#001529'
  }
};