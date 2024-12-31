import {
	Box,
	Heading,
	HStack,
	IconButton,
	Image,
	Text,
	useToast,
	Modal,
	useDisclosure,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	VStack,
	Input,
	Button,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useColorModeValue } from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";

function ProductCard({ product }) {
	const [updatedProduct, setUpdatedProduct] = useState(product);

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	// Assuming useProductStore returns an object
	const { deleteProduct, updateProduct } = useProductStore();

	const handleDeleteProduct = async (id) => {
		const { success, message } = await deleteProduct(id);

		toast({
			title: success ? "Success" : "Error",
			description: message,
			status: success ? "success" : "error",
			duration: 3000,
			isClosable: true,
		});
	};

	const handleUpdateProduct = async (id, updatedProduct) => {
		const { success, message } = await updateProduct(id, updatedProduct);

		toast({
			title: success ? "Success" : "Error",
			description: message,
			status: success ? "success" : "error",
			duration: 3000,
			isClosable: true,
		});

		if (success) {
			onClose();
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUpdatedProduct((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<Box
			shadow={"lg"}
			rounded={"lg"}
			overflow={"hidden"}
			transition={"all 0.3s"}
			_hover={{
				transform: "translateY(-5px)",
				shadow: "xl",
			}}
			bg={bg}
		>
			<Image
				src={product.image}
				alt={product.name}
				h={48}
				w={"full"}
				objectFit={"cover"}
			/>

			<Box p={4}>
				<Heading as={"h2"} size={"md"} mb={2}>
					{product.name}
				</Heading>

				<Text
					fontWeight={"bold"}
					fontSize={"xl"}
					color={textColor}
					mb={4}
				>
					${product.price}
				</Text>

				<HStack spacing={2}>
					<IconButton
						icon={<EditIcon />}
						onClick={onOpen}
						colorScheme={"blue"}
					/>
					<IconButton
						icon={<DeleteIcon />}
						onClick={() => handleDeleteProduct(product._id)}
						colorScheme={"red"}
					/>
				</HStack>
			</Box>

			{/* Update Product Modal */}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder={"Product name"}
								name={"name"}
								type="text"
								value={updatedProduct.name}
								onChange={handleChange}
							/>
							<Input
								placeholder={"Price"}
								name={"price"}
								type="number"
								value={updatedProduct.price}
								onChange={handleChange}
							/>
							<Input
								placeholder={"Image URL"}
								name={"image"}
								type="text"
								value={updatedProduct.image}
								onChange={handleChange}
							/>
						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={() =>
								handleUpdateProduct(product._id, updatedProduct)
							}
						>
							Update
						</Button>
						<Button variant={"ghost"} onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
}

export default ProductCard;
