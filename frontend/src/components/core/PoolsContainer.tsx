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

type PoolData = {
    id: number,
    name : string,
    description: string,
    image: any,
    price: number,
    filledIn: number,
    piecesNeedToCollect: number,
    piecesCollected: number,
    tokensNeedToCollect: number,
}

export const PoolsContainer = () => {
    const [pools, setPools] = useState<PoolData[]>([]);
    const [contract, setContract] = useState<any>(null);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = '0x1F5b3a4C463b606615846FE8Dd303a23daa57Fb3';

    const getPools = useCallback(async () => {
        const pools =  await contract.functions.getActivePools();
        const mapped : PoolData = pools.map((pool: any, index: number) => {
          const id = index;
          const price = Number(pools[index][0].tokensNeedToCollect._hex);
          const piecesNeedToCollect = Number(pools[index][0].piecesNeedToCollect._hex);
          const piecesCollected = Number(pools[index][0].piecesCollected._hex);

          return {
              id: id,
              price: price,
              piecesNeedToCollect: piecesNeedToCollect,
              piecesCollected: piecesCollected
          }
        })
        setPools(prevPools => [...prevPools, mapped])
    }, [contract])

    useEffect(() => {
        if (!contract && provider) {
            setContract(new ethers.Contract(address, jsonAbi, provider));
        }
    }, [contract, provider]);

    useEffect(() => {
        if (contract) {
            getPools().then(r=> r)
        }
    }, [contract]);

    return (
        <PoolsFlexContainer container>
            <NFTContainer container>
                <Grid item
                      sx={{
                          padding: "20px"
                }}>
                    {pools.map((pool :PoolData)=> (
                        <PoolCard
                            poolId={pool.id}
                            filledIn={(pool.piecesNeedToCollect / pool.piecesCollected) * 100}
                            nftDescription={"nft"}
                            nftName={"nft"}
                            price={pool.price}
                        />
                    ))}

                </Grid>
            </NFTContainer>
            <Button variant={'contained'} onClick={getPools}
            sx={{margin: "0 auto", marginTop: "100px", width: "150px"}}>More</Button>
        </PoolsFlexContainer>
    )
}
