import express from "express";
import { notFoundHandler, finalErrorHandler } from "./middleware/error.middleware.js";
import apiRouter from "./routes/api.routes.js";

const app = express();

// 1. Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// 2. Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. API routes
app.use("/api", apiRouter);

// 4. 404 handler
app.use(notFoundHandler);

// 5. Global error handler
app.use(finalErrorHandler);

// 6. Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
