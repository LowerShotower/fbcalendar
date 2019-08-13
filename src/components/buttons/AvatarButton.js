import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

const AvatarButton = (props) => {
  return (
    <Button size='large' type='circle' style={{ color:'#000' }} {...props}>
      {props.children}
    </Button>
  );
};

export default AvatarButton;
