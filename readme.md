# My Restaurant List

A full-stack web application for managing your personal restaurant collection. Built with React, TypeScript, and FastAPI.

![Restaurant List App](https://img.shields.io/badge/React-19.1.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=for-the-badge&logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-0.118.0-green?style=for-the-badge&logo=fastapi)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.14-38B2AC?style=for-the-badge&logo=tailwind-css)

## Features

- **Add Restaurants**: Create new restaurant entries
- **View Collection**: Browse restaurants
- **Edit Restaurants**: Update restaurant details with a simple interface
- **Delete with Confirmation**: Remove restaurants with confirmation dialog
- **UI**: Built with Shadcn UI components and Tailwind CSS

## Tech Stack

### Frontend
- **React** - React
- **TypeScript** - Type-safe development
- **Vite** - Build tool
- **Tailwind CSS** - CSS framework
- **Shadcn UI** - Component library
- **React Query (TanStack Query)** - Data fetching and caching
- **React Hook Form** - Forms
- **Zod** - Schema validation

### Backend
- **Python** - Python 
- **FastAPI** - Py web framework
- **SQLModel** - SQL db
- **Pydantic** - Data validation for Python
- **SQLite** - Lightweight db for local development

### Project Structure
```
my-restaurant-list/
├── my-restaurant-list-frontend/     # React frontend
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── services/              # API service layer
│   │   └── schemas/               # TypeScript schemas
│   └── package.json
├── my-restaurant-list-backend/      # FastAPI backend
│   ├── app/
│   │   ├── models.py              # Database models
│   │   ├── schemas.py             # Pydantic schemas
│   │   ├── endpoint.py            # API endpoints
│   │   └── main.py                # FastAPI application
│   └── requirements.txt
└── README.md
```



