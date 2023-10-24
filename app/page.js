"use client";
import  { useState, useMemo } from "react";
import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";

import { ethers } from "ethers";
import { formatEther } from "@ethersproject/units";

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


import abi from "./abi.json";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
const [metaMask, hooks] = initializeConnector(
  (actions) => new MetaMask({ actions })
);
const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } = hooks;

const contractChain = 11155111;
const contractAddress = "0x0667c065Dd8f5bDF0A10a1b523d17BcE17B0Db29";

export default function Page() {
  const chainId = useChainId()
  const accounts = useAccounts()
  const isActive = useIsActive()

  const provider = useProvider()
  const [error, setError] = useState(undefined)

  useMemo(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask')
    })
  }, [])

  const handleConnect = () => {
    metaMask.activate()
  }

  const handleDisconnect = () => {
    metaMask.resetState()
  }
  
return (
    <div>
       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {accounts && <Stack direction="row" spacing={1}>
            <Chip label={accounts && accounts[0]} />
            </Stack>}
           
          { !isActive ? <Button color="inherit" onClick={handleConnect}>Connect</Button> 
          : <Button color="inherit"  onClick={handleDisconnect}>DisConnect</Button>}
         
        </Toolbar>
      </AppBar>
    </Box>
      <p>chainId: { chainId }</p>
      <p>isActive: { isActive.toString() }</p>
      
    </div>
  )
}
