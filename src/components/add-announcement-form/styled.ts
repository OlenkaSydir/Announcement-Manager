import styled from "styled-components";

export const FormWrapper = styled.div`
  border-bottom: 1px solid gray;
`
export const AddWrapper = styled.div`
  padding-top: 10px;
  text-align: left;
  margin-left: 45px;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 1.5em;
`
export const InputWrapper = styled.input`
  width: 85%;
  height: 30px;
  margin: 10px 0;
  background-color: #d8d6e0;
  border: 4px solid #858094;
  font-size: 1em;
  padding-left: 10px;
  outline: none;
  border-radius: 5px;
`
export const ButtonWrapper = styled.button`

  width: 100px;
  height: 40px;
  border: 2px solid #6c5c80;
  color: #473d53;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 24px;
  font-weight: bold;
  background-color: #9c90ae;
  border-radius: 5px;
  outline: none;
  margin: 10px;

  &:hover{
    transition: 0.5s;
    background-color: #473d53;
    color: #aea9c8;
    border: #473d53;
  }
`
export const HeadingWrapper = styled.div`
  width: calc(100% - 40px);
  padding: 10px 20px ;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 2.3em;
  border-bottom: 1px solid gray;
`
export const ImgWrapper = styled.img`
  width: 20px;
  margin-left: 20px;
`