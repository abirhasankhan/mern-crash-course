import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";



import { useColorMode } from "@chakra-ui/react"



function Navbar() {

  const { colorMode, toggleColorMode } = useColorMode()



  return (
		<Container maxW={"container.xl"} py={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					md: "row",
				}}
			>
				<Text
					fontSize={{
						base: "22",
						sm: "28",
					}}
					frontweight={"bold"}
					textTransform={"uppercase"}
					testAlign={"center"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
				>
					<Link to={"/"}>Product Store 🛒</Link>
				</Text>

				<HStack spacing={2} alignItems={"center"}>

            <Link to={"/create"}>
              <CiSquarePlus fontSize={30} />
            </Link>
            
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <IoMoon /> : <LuSun />}
            </Button>

				</HStack>
			</Flex>
		</Container>
  );
}

export default Navbar