import {useState} from 'react';
import {ethers, BigNumber} from 'ethers';
import krypticsNFT from "./../KrypticsNFT.json";
import {Box, Button, Flex, Input, Text} from '@chakra-ui/react';

const krypticsNFTAddress = "0x304A581DE90BD0E570325C8561b7AcABf60f9418";

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner(); 

            const contract = new ethers.Contract(
                krypticsNFTAddress,
                krypticsNFT.abi,
                signer
            ); 
            try{
                //calls contract mint 
                const response = await contract.mint(BigNumber.from(mintAmount),{
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString())
                }); 
            } catch(e) {
                console.log("error: ", e)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    }

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    }

    return(
        <Flex justify="center" align="center" height = "100vh" paddingBottom="240px">
            <Box width = "520px">
                <div>
                    <Text fontSize ="48px" textShadow="0 5px #000000">Kryptics</Text>
                    <Text
                     fontSize = "30px"
                     letterSpacing = "-5.5%"
                     fontFamily = "VT323"
                     textShadow = "0 2px 2px #000000"> 
                     Waiting to be deciphered by those who dare to explore.
                    </Text>
                </div>
                
                {isConnected ? (
                    <div>
                        <Flex align = "center" justify = "center">
                            <Button 
                             onClick={handleDecrement}
                             backgroundColor = "#526D69"
                             borderRadius = "5px"
                             boxShadow = "0px 2px 2px 1px #0f0f0f"
                             color = "white"
                             cursor = "pointer"
                             fontFamily = "inherit"
                             padding = "15px"
                             marginTop ="10px">
                                -
                            </Button>

                            <Input
                             appearance= "textfield"
                             readOnly
                             fontFamily = "inherit"
                             width = "100px"
                             height = "40px"
                             textAlign = "center"
                             paddingLeft = "9px"
                             marginTop = "10px"
                             type = "number"
                             value={mintAmount}
                            />

                            <Button 
                             onClick={handleIncrement}
                             backgroundColor = "#526D69"
                             borderRadius = "5px"
                             boxShadow = "0px 2px 2px 1px #0f0f0f"
                             color = "white"
                             cursor = "pointer"
                             fontFamily = "inherit"
                             padding = "15px"
                             marginTop ="10px">
                                +
                            </Button>
                        </Flex>
                        <Button 
                         onClick={handleMint}
                         backgroundColor = "#526D69"
                         borderRadius = "5px"
                         boxShadow = "0px 2px 2px 1px #0f0f0f"
                         color = "white"
                         cursor = "pointer"
                         fontFamily = "inherit"
                         padding = "15px"
                         marginTop ="10px">
                            Mint Now
                        </Button>
                    
                    </div>

                ) : (
                    <Text
                     marginTop="70px"
                     fontSize = "30px"
                     letterSpacing = "-5.5%"
                     fontFamily = "VT323"
                     textShadow = "0 3px #000000">You must be connected to Mint.</Text>
                )}
            </Box>
        </Flex>
    )
}
export default MainMint