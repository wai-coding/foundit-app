## Features

- **Browse products**

  - Displays a list of all available products on the homepage.
  - Products are fetched from a mock REST API using `json-server`.

- **Search products**

  - Users can search products by title using a search input.
  - Search is performed client-side and updates results in real time.

- **Filter and sort products**

  - Products can be filtered by category, condition, and status.
  - Sorting options include:
    - A–Z / Z–A (title)
    - Price (ascending / descending)
    - Most recent / oldest
  - All filtering and sorting is handled on the frontend.

- **Pagination**

  - Products are displayed with pagination on the homepage.
  - A maximum of 12 products is shown per page.
  - Page navigation buttons allow switching between pages.
  - Pagination updates automatically when filters, search, or sorting change.

- **Favorites (localStorage)**

  - Users can mark products as favorites using a heart icon.
  - Favorites are stored in the browser using `localStorage`.
  - A Favorites mode allows viewing only favorited products.
  - If no favorites exist, a temporary message is displayed.
  - Removing the last favorite automatically returns the view to all products.

- **Product status (available / sold)**

  - Each product has a status indicating whether it is available or sold.
  - New products are always created as _available_.
  - The status can be updated to _sold_ only through the edit page.
  - Products can be filtered by status on the homepage.

- **Product details page**

  - Each product has a dedicated details page.
  - Displays full product information including description, price, condition, status, and seller details.

- **Fake user reviews**

  - Displays mock user reviews on the product details page.
  - Reviews are static and used only for UI demonstration purposes.

- **Create new product (Sell page)**

  - Users can add new products using a form.
  - Form data is sent to the backend using a POST request.

- **Edit existing product**

  - Products can be edited through a dedicated edit page.
  - Existing product data is pre-filled in the form.
  - Changes are saved using a PUT request.

- **Delete product**

  - Products can be removed from the system.
  - Deletion is performed using a DELETE request.

- **404 Error Page**

  - Displays a custom ErrorPage when the URL does not match any existing route.

- **Loading and error states**

  - Loading indicators are shown while data is being fetched.
  - User-friendly error messages are displayed when requests fail.

- **Client-side routing**

  - Navigation between pages is handled using React Router without page reloads.

## Bonus Features

The following features were considered as possible improvements to the application but were **not implemented yet**:

- **Multiple images on Details Page**
  - Support for displaying multiple images per product.
  - Images could be shown as a gallery or carousel on the details page.
