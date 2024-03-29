import React, { useEffect } from "react";
import axios from "axios";
import { server } from "../index";
import { useState } from "react";
import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import { Link } from "react-router-dom";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  

  const changePagePrev = () => {
    if (page > 1) {
      setPage(page - 1);
      setLoading(true);
    }
  };
  const changePageNext = () => {
    if (coins.length() > 1) {
      setPage(page + 1);
      setLoading(true);
    }
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error) return <ErrorComponent message={"Error while fetching Coins"} />;

  return (
    <>
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
              <HStack  spacing={"4"} >
                  <Radio value={"inr"}>INR</Radio>
                  <Radio value={"eur"}>EURO</Radio>
                  <Radio value={"usd"}>USD</Radio>
              </HStack>
            </RadioGroup>

            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
              {coins.map((i) => (
                <CoinCard
                  id={i.id}
                  key={i.id}
                  name={i.name}
                  price={i.current_price}
                  img={i.image}
                  symbol={i.symbol}
                  currencySymbol={currencySymbol}
                />
              ))}
            </HStack>

            <HStack
              w={"full"}
              p={"8"}
              wrap={"wrap"}
              justifyContent={"space-between"}
            >
              <Button
                backgroundColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePagePrev()}
              >
                &larr; PREV
              </Button>

              <Button
                backgroundColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePageNext()}
              >
                NEXT &rarr;
              </Button>
            </HStack>
          </>
        )}
      </Container>
    </>
  );
};

const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "₹" }) => (
  <Link to={`/coin/${id}`}>
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
      />
      <Heading size={"md"} noOfLines={1}>
        {symbol}
      </Heading>

      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
    </VStack>
  </Link>
);

export default Coins;
