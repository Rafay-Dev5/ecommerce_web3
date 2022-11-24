import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

const Product = ({
  buy,
  description,
  price,
  title,
  image,
  deposit,
  withdraw,
  sellerID,
}) => {
  const sendMoney = () => {
    deposit(price)
      .then(() => {
        withdraw(sellerID, price).catch(() => {
          console.log("Withdraw failed");
        });
      })
      .catch(() => {
        console.log("Deposit failed");
      });
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="Camera pic"
        />
        <CardContent>
          <Typography variant="body1">{price} Wei</Typography>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {buy ? (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              sendMoney();
            }}
          >
            Buy
          </Button>
        ) : (
          <Typography variant="caption" color="text.secondary">
            Item up for Sale
          </Typography>
        )}
      </CardActions>
    </Card>
  );
};

export default Product;
