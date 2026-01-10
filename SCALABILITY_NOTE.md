-**Technical Approach**: Scaling for Production As part of my development process, I considered how this application would handle growth beyond this MVP. If this project were to scale to 100,000+ users, here is how I would optimize the Frontend-Backend integration:

-**Frontend Performance (Pagination)**: Currently, the dashboard loads all records at once. To scale, I would implement cursor-based pagination, loading data in small chunks (e.g., 20 items at a time) to ensure the application remains fast regardless of how much data a user has.

-**Database Optimization (Indexing)**: To keep the search functionality instant as the dataset grows, I would add Database Indexes to the searchable columns (like title and category) in PostgreSQL, ensuring queries remain efficient even with millions of records.

-**Security (Rate Limiting)**: I would implement API Rate Limiting on the backend to prevent abuse and ensure that no single user can overload the server with too many requests.
