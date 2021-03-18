import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
  }
  body{
    background-color: #cecbdd;
  }
`;
export const ListBoxWrapper = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 30px auto;
  background-color: #aea9c8;
  max-width: 500px;
  min-width: 300px;
  border-radius: 10px;
  padding-bottom: 20px;
`;
export const ItemListWrapper = styled.div`
  width: calc(100% - 40px);
  padding: 10px 20px ;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 1.7em;
  border-bottom: 1px solid gray;
`;

export const SearchWrapper = styled.input`
  width: 85%;
  height: 30px;
  margin: 10px 0;
  background-color: #d8d6e0;
  border: 4px solid #858094;
  font-size: 16px;
  font-family: 'Nunito Sans', sans-serif;
  padding-left: 10px;
  outline: none;
  border-radius: 5px;
`;
export const ImgWrapper = styled.img`
  width: 20px;
  margin-left: 20px;
`;
