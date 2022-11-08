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
import {ethers, Signer} from "ethers";

const pages = ['Offers', 'Create lot', 'MarketPlace'];

export default function Header() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [userAddress, setUserAddress] = useState("");
    const address = '0x97549EA57fD48fACA6eD271fbE9A29b9ce39A516';
    const jsonAbi = `
[
  {
    "inputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "id",
        "type": "bytes32"
      }
    ],
    "name": "ChainlinkCancelled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "id",
        "type": "bytes32"
      }
    ],
    "name": "ChainlinkFulfilled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "id",
        "type": "bytes32"
      }
    ],
    "name": "ChainlinkRequested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newPercent",
        "type": "uint256"
      }
    ],
    "name": "ChangedCreatorShare",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newAmount",
        "type": "uint256"
      }
    ],
    "name": "ChangedDefaultPiecesAmount",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      
    ],
    "name": "EmergencyStopped",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "poolCreator",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "buyTokenAddress",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isERC721",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "piecesNeedToCollect",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "tokensNeedToCollect",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "piecesCollected",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "assetAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "assetId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "assetOwner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "pieceCost",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "unavailable",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "closed",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct Fraction.Pool",
        "name": "pool",
        "type": "tuple"
      }
    ],
    "name": "NewPoolCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      }
    ],
    "name": "PoolClosed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      }
    ],
    "name": "PurchasedAsset",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "piecesAmount",
        "type": "uint256"
      }
    ],
    "name": "buyAssetPiece",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "newPercent",
        "type": "uint256"
      }
    ],
    "name": "changeCreatorShare",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "newAmount",
        "type": "uint256"
      }
    ],
    "name": "changeDefaultPiecesAmountToCollect",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "checkIfNeedToFulfill",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      }
    ],
    "name": "closePool",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "assetAddress",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isERC721",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "assetId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "buyTokenAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "assetOwner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "needToCollect",
        "type": "uint256"
      }
    ],
    "name": "createPool",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "defaultCreatorShare",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "defaultPiecesAmountToCollect",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "emergencyStop",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "assetAddress",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "returnAmount",
        "type": "uint256"
      }
    ],
    "name": "finalizeAssetPurchase",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_requestId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "_result",
        "type": "bytes"
      }
    ],
    "name": "fulfill",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "getActivePoolsIDs",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "getLatestEthPrice",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "lastTimeStamp",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "pools",
    "outputs": [
      {
        "internalType": "address",
        "name": "poolCreator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "buyTokenAddress",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isERC721",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "piecesNeedToCollect",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "tokensNeedToCollect",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "piecesCollected",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "assetAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "assetId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "assetOwner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "pieceCost",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "unavailable",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "closed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "poolsAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      
    ],
    "name": "renounceOwnership",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "usersInPool",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "usersPieces",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      }
    ],
    "name": "withdrawAssetWithFullFractions",
    "outputs": [
      
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
    `
    const object_abi = JSON.stringify(JSON.parse(jsonAbi), null, 2);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(address, object_abi, provider)
    const pools = contract.getActivePoolsIDs();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const shortAccount = useMemo(
        () => `${userAddress.slice(0, 4)}...${userAddress.slice(-5)}`,
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
        console.log(object_abi);
        console.log(userAddress as unknown as Signer)
        console.log(pools)
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


