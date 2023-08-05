import React, { useEffect } from 'react'
import axios from "axios";
import { server } from '../index';
import { useState } from 'react';
import { Button, Container, Heading, HStack, Image, Input, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';

const Exchanges = () => {

  const [exchanges,setExhanges]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError] =useState(false);
  const [exchangeName,setExchangeName] = useState("")


  const handleClick =()=>{
    exchanges.map((i)=>(
      (i.name).toLowerCase()===exchangeName.toLowerCase()?setExhanges([i]):setExhanges(exchanges)
    ))
  }
  

  useEffect(() => { 
    const fetchExhanges =async()=>{
      try {
      const {data}= await axios.get(`${server}/exchanges`);
      setExhanges(data);
      setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }

    }
    fetchExhanges();
  }, [exchangeName])

  if(error) return <ErrorComponent message={"Error while fetching Exchanges"}  />;
  
  return (
    <Container maxW={"container.xl"}>

      {loading?<Loader/>:<>
      <HStack>
              <Input
                width={"100"}
                value={exchangeName}
                onChange={(e)=>setExchangeName(e.target.value)}
                placeholder="Search Exchange"
                size="sm"
              />
              <Button 
              backgroundColor={"blue.200"}
              color={"white"}
              onClick={handleClick}
            >
              Search
            </Button>
              
              </HStack>
      
      <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
        {
          exchanges.map((i)=>(
            <ExchangeCard  key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} />
          ))
        }
      </HStack>
      
      
      
      </>}
    </Container>
  )
}

const ExchangeCard=({name,img,rank,url})=> (
  <a href={url} target={"blank"}>

    <VStack w={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"} transition={"all 0.3s"} m={"4"} css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }} >
      <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"Exchange"} />
      <Heading size={"md"} noOfLines={1}>{rank}</Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>



  </a>

)

export default Exchanges