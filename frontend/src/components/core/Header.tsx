import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {ConnectedButton, StyledAppBar} from "../../styles/styledHeader";
import {useEffect, useMemo, useState} from "react";
import { useEthers } from "@usedapp/core";

const pages = ['Offers', 'Create lot', 'MarketPlace'];

export default function Header() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [userAddress, setUserAddress] = useState("");
    const { account, activateBrowserWallet, deactivate } = useEthers();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const shortAccount = useMemo(
        () => `${userAddress.slice(0,4)}...${userAddress.slice(-5)}`,
        [userAddress]
    );

    const checkIfWalletIsConnected = async (onConnected: any) => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length > 0) {
                const account = accounts[0];
                onConnected(account);
                return;
            }
        }
    }

    const connect = async (onConnected: any) => {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        console.log(accounts)

        onConnected(accounts[0]);
    }

    const disconnect = async () => {
        await window.ethereum.clearCachedProvider();
        setUserAddress('')
    }

    useEffect(() => {
        checkIfWalletIsConnected(setUserAddress);
    }, []);


    return (
        <StyledAppBar position="static" sx={{
            backgroundColor: "#f4f6f8"
        }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'black',
                            textDecoration: 'none',
                        }}
                    >
                        FractionNft
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex', justifyContent: 'space-around'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'black', display: 'block'}}
                            >
                                {page}
                            </Button>
                        ))}
                        {userAddress ?
                            <ConnectedButton variant="contained" sx={{
                                marginTop: "10px"
                            }} onClick={disconnect}>
                                {shortAccount}
                            </ConnectedButton>
                            :
                            <ConnectedButton variant="contained" sx={{
                                marginTop: "10px"
                            }} onClick={connect}>Connect
                            </ConnectedButton>

                        }

                    </Box>
                </Toolbar>
            </Container>
        </StyledAppBar>
    );
}


