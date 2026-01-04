## Features

- **Browse products**

  - Displays a list of all available products on the homepage.
  - Products are fetched from a mock REST API using `json-server`.

- **Search products**

  - Users can search products by title using a search input.
  - Search is performed client-side and updates results in real time.

- **Filter and sort products**

  - Products can be filtered by category and condition.
  - Sorting options allow ordering by price, title and date.
  - All filtering and sorting is handled on the frontend.

- **Product details page**

  - Each product has a dedicated details page.
  - Displays full product information including description, price, condition, and seller details.

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

- **Favorites**

  - Allow users to mark products as favorites.
  - Favorited products could be stored using `localStorage` or persisted in the backend.

- **Pagination**

  - Display only 10 products at a time on the homepage.
  - Navigation buttons (1, 2, 3, etc.) to load and display the next set of products.

- **Listing status**

  - Products could have a status such as _available_ or _sold_.
  - Sold items could be visually distinguished or hidden from the main listing.

- **Multiple images on Details Page**

  - Support for displaying multiple images per product.
  - Images could be shown as a gallery or carousel on the details page.

- **Fake user reviews**
  - Display mock user reviews on the product details page.
  - Reviews would be static or generated data, used only for UI demonstration purposes.
