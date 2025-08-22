import styled from "styled-components";

const FooterContainer = styled.footer`
  text-align: left;
`;

const Foot = styled.p`
  color: white;
  font-weight: bold;
`;

export function Footer() {
  return (
    <FooterContainer>
      <Foot>Copyright &copy; 2024 Keep Note. All rights reserved.</Foot>
    </FooterContainer>
  );
}
