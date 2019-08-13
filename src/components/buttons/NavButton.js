import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

const NavButton = (props) => {
  return (
    <Button size='large' type='link' {...props}>
      {props.children}
    </Button>
  );
};

export default NavButton;
