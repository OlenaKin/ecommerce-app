# ecommerce-app

# README

## Project Overview
This project is a small e‑commerce application built with Vue 3, TypeScript, Pinia, and Vite. It demonstrates core frontend development skills, including component architecture, state management, routing, and responsive UI implementation.

The application includes product browsing, product detail pages, a shopping cart, a wishlist, and basic login functionality. Styling is implemented using a structured SCSS architecture with global variables, mixins, and component‑level scoped styles.

## Features
- Product listing with dynamic routing
- Product detail view
- Add to cart and remove from cart
- Wishlist management
- Login page (mock implementation)
- Responsive layout
- Reusable components (Header, ProductCard)
- State management using Pinia
- Global SCSS styling with design tokens

## Technology Stack
- Vue 3 (Composition API)
- TypeScript
- Pinia
- Vue Router
- SCSS
- Vite

## Styling Architecture
The project uses a modular SCSS structure:

- variables.scss — color palette, spacing scale, typography tokens
- mixins.scss — reusable SCSS helpers
- global.scss — resets, layout rules, typography, global components
- main.scss — entry point for global styles
- Component‑level scoped styles for local adjustments

Cart and Wishlist views share unified button styles for consistency.

## Use of AI Assistance
AI assistance (Microsoft Copilot) was used during development to support repetitive or time‑consuming tasks, including:

- Refining SCSS structure and resolving layout inconsistencies
- Debugging UI issues
- Generating commit messages
- Improving readability and organization of code
- Providing suggestions under time constraints

All architectural decisions, component logic, and final implementations were written manually.  
AI was used strictly as a productivity aid, not as an autonomous code generator.

# Project Structure
src/
assets/
components/
views/
stores/
styles/
router/


## Notes
This project was completed under a limited timeframe and is intended as a functional demonstration of frontend development skills using Vue 3 and modern tooling. It also represents my first project built with Vue 3 and TypeScript.

