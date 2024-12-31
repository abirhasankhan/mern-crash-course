import {
	Container,
	Heading,
	VStack,
	Box,
	useColorModeValue,
    Input,
    Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";


import { useToast } from "@chakra-ui/react";

function CreatePage() {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "0",
		image: "",
	});

	const { createProduct } = useProductStore();
	const toast = useToast();

	const handleAddProduct = async () => {
		const { success, message } = await createProduct(newProduct);

		toast({
			title: success ? "Success" : "Error",
			description: message,
			status: success ? "success" : "error",
			duration: 5000,
			isClosable: true,
		});

		if (success) {
			setNewProduct({ name: "", price: "", image: "" }); // Reset form
		}
	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"xl"} textAlign={"center"} mb={8}>
					Create a new product
				</Heading>

				<Box
					w={"full"}
					bg={useColorModeValue("white", "gray.800")}
					shadow={"md"}
					p={6}
					rounded={"lg"}
				>
					<VStack spacing={4}>
						<Input
							placeholder={"Product name"}
							name={"name"}
							type="text"
							value={newProduct.name}
							onChange={(e) =>
								setNewProduct({
									...newProduct,
									name: e.target.value,
								})
							}
						/>

						<Input
							placeholder={"Price"}
							name={"price"}
							type="number"
							value={newProduct.price}
							onChange={(e) =>
								setNewProduct({
									...newProduct,
									price: parseFloat(e.target.value) || 0,
								})
							}
						/>

						<Input
							placeholder={"Image URL"}
							name={"image"}
							type="text"
							value={newProduct.image}
							onChange={(e) =>
								setNewProduct({
									...newProduct,
									image: e.target.value,
								})
							}
						/>

						<Button
							colorScheme="blue"
							onClick={handleAddProduct}
							w={"full"}
						>
							Add product
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
}

export default CreatePage;
