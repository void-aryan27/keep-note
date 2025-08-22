import React from "react";
import styled from "styled-components";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export function Header({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("user"); 

    navigate("/login");
  };

  


  return (
    <HeaderWrapper>

      <LeftGroup>
        <Typography variant="h5" style={{ fontWeight: 'bold', color: 'white' }}>
          Keep Note
        </Typography>
        {children}
      </LeftGroup>

   
      <RightGroup>
        <Button 
          variant="text"
          color="inherit" 
          onClick={() => navigate("/home")} 
          startIcon={<HomeIcon />}
        >
        </Button>
        <Button 
          variant="text"
          color="inherit" 
          onClick={() => navigate("*")}
          startIcon={<AccountCircleIcon />}
        >
        </Button>
        <Button 
          variant="text"
          color="inherit"
          onClick={() => navigate("/")} 
          startIcon={<ExitToAppIcon />}
        >
        </Button>
      </RightGroup>
    </HeaderWrapper>
  );
}
