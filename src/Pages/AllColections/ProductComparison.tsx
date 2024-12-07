import { Button, message } from "antd";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
}

const ProductComparison = () => {
  const [comparisonList, setComparisonList] = useState<Product[]>([]);
  const [comparisonCategory, setComparisonCategory] = useState<string | null>(
    null
  );

  // Handle adding a product to the comparison list
  const addToComparison = (product: Product) => {
    if (comparisonList.length >= 3) {
      message.warning("You can only compare up to 3 products.");
      return;
    }

    if (comparisonCategory && comparisonCategory !== product.category) {
      message.warning("Products must be from the same category to compare.");
      return;
    }

    // If this is the first product, set the comparison category
    if (comparisonList.length === 0) {
      setComparisonCategory(product.category);
    }

    // Add product to the comparison list
    setComparisonList((prevList) => [...prevList, product]);
  };

  // Handle removing a product from the comparison list
  const removeFromComparison = (productId: string) => {
    setComparisonList((prevList) =>
      prevList.filter((product) => product.id !== productId)
    );
  };

  return (
    <div>
      <h3>Product Comparison</h3>
      <div>
        {comparisonList.length > 0 ? (
          <div>
            <h4>Comparing {comparisonList.length} product(s):</h4>
            <ul>
              {comparisonList.map((product) => (
                <li key={product.id}>
                  {product.name} - {product.price} - {product.rating} stars
                  <Button onClick={() => removeFromComparison(product.id)}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No products selected for comparison</p>
        )}
      </div>

      <div>
        <h4>Select Products to Compare</h4>
        {/* Example Products */}
        <Button
          onClick={() =>
            addToComparison({
              id: "1",
              name: "Product 1",
              category: "Electronics",
              price: 100,
              rating: 4,
            })
          }
        >
          Add Product 1
        </Button>
        <Button
          onClick={() =>
            addToComparison({
              id: "2",
              name: "Product 2",
              category: "Electronics",
              price: 150,
              rating: 5,
            })
          }
        >
          Add Product 2
        </Button>
        <Button
          onClick={() =>
            addToComparison({
              id: "3",
              name: "Product 3",
              category: "Home Appliances",
              price: 200,
              rating: 3,
            })
          }
        >
          Add Product 3 (Different Category)
        </Button>
      </div>
    </div>
  );
};

export default ProductComparison;
