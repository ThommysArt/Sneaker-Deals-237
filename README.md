
# Sneaker Deals

Sneaker Deals is an online store for a local business in Cameroon that specializes in selling sneakers. This project is built using React, Next.js, Clerk, Tailwind CSS, and Prisma.

## Features

- Browse and search for sneakers
- View detailed product information
- Add sneakers to the shopping cart
- Manage the shopping cart (update quantities, remove items)
- Proceed to checkout and place orders

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for building server-rendered applications.
- **Clerk**: A developer-friendly authentication and identity management platform.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **Prisma**: A modern database toolkit for TypeScript and Node.js.

## Getting Started

To get started with the Sneaker Deals project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/ThommysArt/Sneaker-Deals-237.git
   ```

2. Install the dependencies:

   ```bash
   cd sneaker-deals
   npm install
   ```

3. Set up the environment variables:

   Create a `.env.local` file in the root directory and add the following variables:

   NEXT_PUBLIC_CLERK_FRONTEND_API_URL=<your-clerk-frontend-api-url>
   CLERK_API_KEY=<your-clerk-api-key>
   EDGE_STORE_ACCESS_KEY=<your-edge-store-access-key>
   EDGE_STORE_SECRET_KEY=<your-edge-store-secret-key>
   
   

   Replace `<your-clerk-frontend-api-url>`, `<your-clerk-api-key>`, `<your-edge-store-secret-key>` and `<your-edge-store-access-key>` with your actual values.

4. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
