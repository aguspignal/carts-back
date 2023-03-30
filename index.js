const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use(express.static("dist"));

let carts = [
   {
      id: 1,
      products: [
         {
            id: 59,
            title: "Spring and summershoes",
            price: 20,
            quantity: 3,
            total: 60,
            discountPercentage: 8.71,
            discountedPrice: 55,
         },
         {
            id: 88,
            title: "TC Reusable Silicone Magic Washing Gloves",
            price: 29,
            quantity: 2,
            total: 58,
            discountPercentage: 3.19,
            discountedPrice: 56,
         },
         {
            id: 18,
            title: "Oil Free Moisturizer 100ml",
            price: 40,
            quantity: 2,
            total: 80,
            discountPercentage: 13.1,
            discountedPrice: 70,
         },
         {
            id: 95,
            title: "Wholesale cargo lashing Belt",
            price: 930,
            quantity: 1,
            total: 930,
            discountPercentage: 17.67,
            discountedPrice: 766,
         },
         {
            id: 39,
            title: "Women Sweaters Wool",
            price: 600,
            quantity: 2,
            total: 1200,
            discountPercentage: 17.2,
            discountedPrice: 994,
         },
      ],
      total: 2328,
      discountedTotal: 1941,
      userId: 97,
      totalProducts: 5,
      totalQuantity: 10,
   },
   {
      id: 2,
      products: [
         {
            id: 96,
            title: "lighting ceiling kitchen",
            price: 30,
            quantity: 2,
            total: 60,
            discountPercentage: 14.89,
            discountedPrice: 51,
         },
         {
            id: 91,
            title: "Black Motorbike",
            price: 569,
            quantity: 3,
            total: 1707,
            discountPercentage: 13.63,
            discountedPrice: 1474,
         },
         {
            id: 9,
            title: "Infinix INBOOK",
            price: 1099,
            quantity: 1,
            total: 1099,
            discountPercentage: 11.83,
            discountedPrice: 969,
         },
         {
            id: 16,
            title: "Hyaluronic Acid Serum",
            price: 19,
            quantity: 1,
            total: 19,
            discountPercentage: 13.31,
            discountedPrice: 16,
         },
         {
            id: 54,
            title: "Pubg Printed Graphic T-Shirt",
            price: 46,
            quantity: 3,
            total: 138,
            discountPercentage: 16.44,
            discountedPrice: 115,
         },
      ],
      total: 3023,
      discountedTotal: 2625,
      userId: 30,
      totalProducts: 5,
      totalQuantity: 10,
   },
   {
      id: 3,
      products: [
         {
            id: 37,
            title: "ank Tops for Womens/Girls",
            price: 50,
            quantity: 2,
            total: 100,
            discountPercentage: 12.05,
            discountedPrice: 88,
         },
         {
            id: 80,
            title: "Chain Pin Tassel Earrings",
            price: 45,
            quantity: 3,
            total: 135,
            discountPercentage: 17.75,
            discountedPrice: 111,
         },
         {
            id: 68,
            title: "Stylish Luxury Digital Watch",
            price: 57,
            quantity: 3,
            total: 171,
            discountPercentage: 9.03,
            discountedPrice: 156,
         },
         {
            id: 81,
            title: "Round Silver Frame Sun Glasses",
            price: 19,
            quantity: 1,
            total: 19,
            discountPercentage: 10.1,
            discountedPrice: 17,
         },
         {
            id: 90,
            title: "Cycle Bike Glow",
            price: 35,
            quantity: 1,
            total: 35,
            discountPercentage: 11.08,
            discountedPrice: 31,
         },
      ],
      total: 460,
      discountedTotal: 403,
      userId: 63,
      totalProducts: 5,
      totalQuantity: 10,
   },
];

function generateID() {
   const maxID =
      carts.length > 0 ? Math.max(...carts.map((cart) => cart.id)) : 0;
   return maxID + 1;
}

app.get("/", (request, response) => {
   response.send(console.log("home"));
});

app.get("/api/carts", (request, response) => {
   response.json(carts);
});

app.get("/api/carts/:id", (request, response) => {
   const id = Number(request.params.id);
   const cart = carts.find((c) => c.id === id);

   if (cart) {
      response.json(cart);
   } else {
      response.status(404).end();
   }
});

app.delete("/api/carts/:id", (request, response) => {
   const id = Number(request.params.id);
   carts = carts.filter((cart) => cart.id !== id);

   response.status(204).end();
});

app.post("/api/carts", (request, response) => {
   const body = request.body;

   if (!body.products || body.products.length === 0) {
      return response.status(400).json({
         error: "products missing",
      });
   }

   if (!body.userId) {
      return response.status(400).json({
         error: "user missing",
      });
   }

   const cart = {
      id: generateID(),
      userId: body.userId,
      products: body.products,
      totalProducts: body.products.length,
      totalQuantity: 0,
      total: body.total || 0,
      discountedTotal: body.discountedTotal || 0,
   };

   carts = [...carts, cart];

   response.json(cart);
});

app.use((request, response) => {
   response.status(404).json({
      error: "u lost allat",
   });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
