import styled from 'styled-components';

export const ListItemWrapper = styled.div`
  width: calc(100% - 20px);
  border-bottom: 1px solid gray;
  padding: 10px;
  user-select: none;
  &:hover{
    transition: 0.5s;
    background-color: #79698f;
  }
`;

export const ButtonWrapper = styled.div`
  width: 20px;
  height: 30px;
  margin: 10px;
  color: #473e5b;
  display: inline-block;
  user-select: none;
  &:hover{
    transition: 0.5s;
    color: #231f2f;
  }
`;

export const LIWrapper = styled.li`
  list-style-type: none;
  font-family: 'Lato', sans-serif;
  font-size: 1.2em;
`;

export const ItemPropertyValueWrapper = styled.span`
  margin: 10% 2% auto 2%;
`;

export const AllButtonsWrapper = styled.div`
  width: 20%;
  display: inline-block;
  margin-left: -20px;
  position: relative;
  
`;
export const ItemPropWrapper = styled.div`
  width: ${props => props.show ? 'calc(100% - 20px)' : 'calc(60% - 20px)'}; 
  ${props => !props.show ? 'display: inline-block' : ''};
  text-align: left;
  margin-left: 20px;
`;
