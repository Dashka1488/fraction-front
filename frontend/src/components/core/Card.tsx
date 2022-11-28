import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

type PoolCardDataProps = {
    poolId: number,
    price: number,
    filledIn: number,
    nftName: string,
    nftDescription: string
}

export default function PoolCard(props: PoolCardDataProps) {
    const {poolId, price, filledIn, nftName, nftDescription} = props;

    return (
        <Card sx={{width: 330}}>
            <CardMedia
                component="img"
                height="330"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {nftName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {nftDescription}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price: {price} ETH
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Filled in: {filledIn}%
                </Typography>
            </CardContent>
        </Card>
    );
}
