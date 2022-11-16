import {Button, Grid} from "@mui/material";
import * as React from "react";
import {PoolContainer, PurchaseContainer} from "../../styles/styledActivePool";
import PoolCard from "./Card";

export const PoolPage = () => {
    return (
        <PoolContainer container>
            <Grid container justifyContent="center" alignItems="center" sx={{padding: "30px"}}>
                <Grid item>
                    <PoolCard
                        filledIn={32}
                        nftDescription={'Описание нфт'}
                        nftName={'Nft-1'}
                        price={30}
                    />
                </Grid>
            </Grid>

            <PurchaseContainer container justifyContent="center" flexDirection={'column'} alignItems={'center'}>
                <Grid item>
                    Take part in purchase:
                </Grid>

                <Grid item>Amount: </Grid>
                <Grid item>Percent: </Grid>
            </PurchaseContainer>

            <Button variant="contained" sx={{margin: "0 auto", marginTop:"20px"}}>Deposit</Button>
        </PoolContainer>
    )
}
