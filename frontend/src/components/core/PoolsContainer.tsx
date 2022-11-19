import {Grid} from "@mui/material";
import PoolCard from "./Card";
import {NFTContainer, PoolsFlexContainer} from "../../styles/styledPoolsContainer";
import Button from "@mui/material/Button";
import {useCallback, useEffect, useState} from "react";
import {ethers} from "ethers";
import {jsonAbi} from '../../abi';

type BigNumber = {
    _hex : string,
    _isBigNumber: true;
}
export const PoolsContainer = () => {
    const [pools, setPools] = useState(null);
    const object_abi = JSON.stringify(JSON.parse(jsonAbi), null, 2);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = '0x1F5b3a4C463b606615846FE8Dd303a23daa57Fb3';
    const contract = new ethers.Contract(address, object_abi, provider)

    const getPools = useCallback(async ()=>{
        const activePools = await contract.getActivePools()
        setPools(activePools)
    }, [pools])

    useEffect(()=>{
        console.log(contract)
        console.log(pools)
    }, [pools, getPools]);

    return (
        <PoolsFlexContainer container>
            <NFTContainer container>
                <Grid item
                      sx={{
                          padding: "20px"
                }}>
                    <PoolCard
                        filledIn={32}
                        nftDescription={'Описание нфт'}
                        nftName={'Nft-1'}
                        price={30}
                    />
                </Grid>
                <Grid item
                      sx={{
                          padding: "20px"
                }}>
                    <PoolCard
                        filledIn={32}
                        nftDescription={'Описание нфт'}
                        nftName={'Nft-1'}
                        price={30}
                    />
                </Grid>
            </NFTContainer>
            <Button variant={'contained'} onClick={getPools}
            sx={{margin: "0 auto", marginTop: "100px", width: "150px"}}>More</Button>
        </PoolsFlexContainer>
    )
}
