import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavButton = ({ href, children, ...rest }) => {
  console.log('btn');
  return (
    <Link to={href}>
      <Button size='large' type='link' {...rest}>
        {children}
      </Button>
    </Link>

  );
};

export default NavButton;
