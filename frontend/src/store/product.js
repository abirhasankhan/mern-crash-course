import {create} from "zustand"

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct) => {

        if(!newProduct.name || !newProduct.price || !newProduct.image) {
            return {
                success: false, 
                message: "Please fill all fields"
            }
        }


        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            if (!res.ok) {
                throw new Error("Failed to create product");
            }

            const data = await res.json();

            set((state) => ({
                products: [...state.products, data.data],
            }));

            return {
                success: true,
                message: "Product created successfully",
            };
        } catch (error) {
            console.error("Error creating product:", error.message);

            return {
                success: false,
                message: "Failed to create product. Please try again later.",
            };
        }

    },

    fetchProducts: async () => {
        try {
            const res = await fetch("/api/products");

            if (!res.ok) {
                throw new Error("Failed to fetch products");
            }

            const data = await res.json();

            set({products: data.data});

        } catch (error) {
            console.error("Error fetching products:", error.message);
        }
    },

    deleteProduct: async (id) => {
        
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete product");
            }

            set((state) => ({
                products: state.products.filter((product) => product._id !== id),
            }));

            return {
                success: true,
                message: "Product deleted successfully",
            };
        } catch (error) {
            console.error("Error deleting product:", error.message);

            return {
                success: false,
                message: "Failed to delete product. Please try again later.",
            };
        }
    },

    updateProduct: async (id, updatedProduct) => {
        if(!updatedProduct.name || !updatedProduct.price || !updatedProduct.image) {
            return {
                success: false, 
                message: "Please fill all fields"
            }
        }

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!res.ok) {
                throw new Error("Failed to update product");
            }

            const data = await res.json();

            if (!data.success) {
                return {
                    success: false,
                    message: data.message,
                };
            }

            set((state) => ({
                products: state.products.map((product) =>
                    product._id === id ? data.data : product
                ),
            }));

            return {
                success: true,
                message: "Product updated successfully",
            };
            
        } catch (error) {
            console.error("Error updating product:", error.message);

            return {
                success: false,
                message: "Failed to update product. Please try again later.",
            };
        }
    },
}))