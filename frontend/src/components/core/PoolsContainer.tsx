import {Grid} from "@mui/material";
import PoolCard from "./Card";
import {NFTContainer, PoolsFlexContainer} from "../../styles/styledPoolsContainer";
import Button from "@mui/material/Button";

export const PoolsContainer = () => {
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
            <Button variant={'contained'}
            sx={{margin: "0 auto", marginTop: "100px", width: "150px"}}>More</Button>
        </PoolsFlexContainer>
    )
}
