import {Grid} from "@mui/material";
import PoolCard from "./Card";
import {NFTContainer, PoolsFlexContainer} from "../../styles/styledPoolsContainer";
import Button from "@mui/material/Button";
import {useCallback, useEffect, useState} from "react";
import {ethers} from "ethers";
import jsonAbi from '../../abi.json';

type BigNumber = {
    _hex : string,
    _isBigNumber: true;
}
export const PoolsContainer = () => {
    const [pools, setPools] = useState<any>(null);
    const [contract, setContract] = useState<any>(null);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = '0x1F5b3a4C463b606615846FE8Dd303a23daa57Fb3';

    const getPools = useCallback(async () => {
        return await contract.functions.getActivePools();
    }, [contract])

    useEffect(() => {
        if (!contract && provider) {
            setContract(new ethers.Contract(address, jsonAbi, provider));
        }
    }, [contract, provider]);

    useEffect(() => {
        if (contract) {
            getPools().then(setPools);
        }
    }, [contract]);

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
