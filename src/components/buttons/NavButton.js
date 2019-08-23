import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import foo from './NavButton.scss';

const NavButton = ({ href, children, ...rest }) => {
  console.log('btn');
  return (
    <Link to={href}>
      <Button size='large' type='link' styleName='foo.a' {...rest}>
        {children}
      </Button>
    </Link>

  );
};

export default NavButton;
