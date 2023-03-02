import React from 'react';
import {Box, Button, Flex, Image, Link, Spacer} from '@chakra-ui/react';
import Facebook from "./../assets/facebook_32x32.png";
import Email from "./../assets/email_32x32.png";
import Twitter from "./../assets/twitter_32x32.png";


const NavBar = ({accounts, setAccounts}) => {
  
  const isConnected = Boolean(accounts[0]); //boolean to check if account is Connected

  async function connectAccount () {
    if(window.ethereum){
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        setAccounts(accounts);
    }
  }

  return (
    <Flex justify = "space-between" align="center" padding ="30px">
        {/*Left Side - Social Media Icons */}
        <Flex justify="space-around" width="40%" padding="0 75px">
          <Link href="https://www.facebook.com">
            <Image src = {Facebook} boxSize="42px" margin = "0 15px"/>
          </Link>
          <Link href="https://www.twitter.com">
            <Image src = {Twitter} boxSize="42px" margin = "0 15px"/>
          </Link>
          <Link href="https://www.gmail.com">
            <Image src = {Email} boxSize="42px" margin = "0 15px"/>
          </Link>
        </Flex>

        {/*Right Side - Sections and Connect */}
        <Flex justify="space-around" align = "center" width = "40%" padding="30px">
          <Box margin = "0 15px">About</Box>
          <Spacer/>
          <Box margin = "0 15px">Mint</Box>
          <Spacer/>
          <Box margin = "0 15px">Team</Box>
          <Spacer/>

          {/*Connect - ? is short for if/else branch */}
          {isConnected ? (
              <Box margin = "0 15px">Connected</Box>
          ) : (
              <Button 
                onClick={connectAccount}
                backgroundColor = "#526D69"
                borderRadius = "5px"
                boxShadow = "0px 2px 2px 1px #0f0f0f"
                color = "white"
                cursor = "pointer"
                fontFamily = "inherit"
                padding = "15px"
                margin = "0 15px">Connect</Button>
          )}
        </Flex>
    </Flex>
  )
}

export default NavBar