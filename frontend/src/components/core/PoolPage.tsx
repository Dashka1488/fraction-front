import {Button, Grid} from "@mui/material";
import * as React from "react";
import {PoolContainer, PurchaseContainer} from "../../styles/styledActivePool";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

type PoolPageProps = {
    poolId: number,
}

export const PoolPage = (props: PoolPageProps) => {
    const {poolId} = props;

    return (
        <PoolContainer container>
            <Grid container justifyContent="center" alignItems="center" sx={{padding: "30px"}}>
                <Grid item>
                    <Card sx={{width: 330}}>
                        <CardMedia
                            component="img"
                            height="330"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {poolId}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {poolId}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Price: {poolId} ETH
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Filled in: {poolId}%
                            </Typography>
                        </CardContent>
                    </Card>
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
