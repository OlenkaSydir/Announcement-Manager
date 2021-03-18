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
export const SimButtonWrapper = styled.button`
  width: 85px;
  height: 30px;
  border: 2px solid #6c5c80;
  color: #473d53;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  font-weight: bold;
  background-color: #9c90ae;
  border-radius: 5px;
  outline: none;
  user-select: none;
  &:hover{
    transition: 0.5s;
    background-color: #473d53;
    color: #aea9c8;
    border: #473d53;
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
  width: 40%;
  display: inline-block;
`;
export const ItemPropWrapper = styled.div`
  width: ${props => props.show ? 'calc(100% - 20px)' : 'calc(60% - 20px)'}; 
  ${props => !props.show ? 'display: inline-block' : ''};
  text-align: left;
  margin-left: 20px;
`;
