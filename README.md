# Unsplash Image Search Application

## Overview

This Angular application provides a user interface for searching and viewing images from the Unsplash API. It allows users to search for images based on keywords, and view the results in an organized layout.

## Features

- **Image Search**: Users can search for images using keywords.
- **Search Results Display**: Search results are displayed as a list of images.
- **Image Details**: Clicking on an image navigates the user to a detailed view of the image.
- **Responsive Design**: The application is responsive and works on various devices and screen sizes.
- **Dark Mode**: Users can toggle between light and dark mode for a preferred viewing experience.

## Setup and Installation

### Prerequisites

- Node.js (latest stable version)
- npm (comes with Node.js)

### Installation Steps

1. **Clone the Repository**

git clone https://github.com/JSearra/Unsplash.git
cd /unsplash

2. **Install Dependencies**

npm install

3. **Environment Configuration**

Set up the `environment.ts` file with the necessary API keys.

4. **Run the Application**

ng serve

The application will be available at `http://localhost:4200/`.

## Application Structure

- `src/app/`
- `components/`: Contains reusable UI components like headers.
- `services/`: Contains services for business logic and API calls.
- `interfaces/`: TypeScript interfaces for data models.
- `pages/`: Components representing entire pages.
- `app.component.*`: Root component of the application.
- `app.module.ts`: Root module of the application.
- `assets/`: Static assets like images.
- `environments/`: Environment-specific configurations.

## Usage

- **Search Images**: Enter keywords in the search bar and press enter or click the search button.
- **View Image Details**: Click on any image to view its details, including a larger version and additional information.
- **Toggle Dark Mode**: Use the dark mode toggle in the header to switch themes.

## Testing

- **Unit Tests**: Run unit tests using Jasmine and Karma.

ng test