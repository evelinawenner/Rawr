import styled from "styled-components";

export const DropdownStyled = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 15px 0 0 0;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  @media (min-width: 768px) {
    margin-top: 5px;
    padding: 0;
    border-radius: 5px;
    border-top: 0;
  }
`;

export const DropItem = styled.a`
  text-decoration: none;
  list-style: none;
  width: 100vw;
  color: black;
  @media (min-width: 768px) {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    padding: 0px 15px 5px 15px;
  }

  &:hover {
    background-color: blue;
    color: white;
    border-radius: 5px;
  }
`;
export const DropItemNoLink = styled.span`
  text-decoration: none;
  list-style: none;
  color: black;
  @media (min-width: 768px) {
    background-color: #ffffff;
    width: 100%;
    padding: 0px 25px 5px 25px;
  }

  &:hover {
    background-color: blue;
    color: black;
    cursor: pointer;
  }
`;
