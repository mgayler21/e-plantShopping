import React from "react";
import "./ProductList.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectIsInCart } from "./CartSlice";

function ProductList() {
  const dispatch = useDispatch();
  

  const plantsArray = [
  {
    category: "Aromatic Plants",
    blurb:
      "Fragrant plants that freshen your space and bring a calming, spa-like vibe.",
    plants: [
      {
        id: "lavender",
        name: "Lavender",
        image:
          "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop",
        description: "Calming scent, used in aromatherapy.",
        price: 20,
      },
      {
        id: "jasmine",
        name: "Jasmine",
        image:
          "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop",
        description: "Sweet fragrance, promotes relaxation.",
        price: 18,
      },
      {
        id: "mint",
        name: "Mint",
        image:
          "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
        description: "Refreshing aroma, used in teas and cooking.",
        price: 12,
      },
    ],
  },
  {
    category: "Medicinal Plants",
    blurb:
      "Plants known for traditional wellness uses and easy indoor care routines.",
    plants: [
      {
        id: "aloe-vera",
        name: "Aloe Vera",
        image:
          "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
        description: "Soothing gel used for skin ailments.",
        price: 14,
      },
      {
        id: "echinacea",
        name: "Echinacea",
        image:
          "https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg",
        description: "Boosts immune system, helps fight colds.",
        price: 16,
      },
      {
        id: "chamomile",
        name: "Chamomile",
        image:
          "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg",
        description: "Soothes anxiety and promotes sleep.",
        price: 15,
      },
    ],
  },
];

  return (
    <div style={{ padding: 16, paddingTop: 90 }}>
      {plantsArray.map((section) => (
        <div key={section.category} style={{ marginBottom: 24 }}>
         <h2>{section.category}</h2>

        <p style={{ marginTop: 6, opacity: 0.8 }}>
            {section.blurb}
        </p>

    <hr style={{ margin: "14px 0" }} />

          <div className="product-grid">
            {section.plants.map((plant) => {
              const inCart = useSelector(selectIsInCart(plant.id));

              return (
                <div className="product-card" key={plant.id}>
                  <img
                    className="product-image"
                    src={plant.image}
                    alt={plant.name}
                  />

                <h3>{plant.name}</h3>
                <p>{plant.description}</p>

                <p>
                   <strong>${plant.price.toFixed(2)}</strong>
                </p>

                <button
                  className={`product-button ${inCart ? "added-to-cart" : ""}`}
                  onClick={() => dispatch(addToCart(plant))}
                  disabled={inCart}
                >
                  {inCart ? "Added" : "Add to cart"}
                </button>
            </div>
        );
         })}
    </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
