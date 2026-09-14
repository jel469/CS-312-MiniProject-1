# Field Notes — Mini Blog

A basic blog built with Node.js, Express, and EJS. Posts are stored in memory and reset when the server restarts.

## Run

```bash
npm start
```

Then open http://localhost:3000

## Routes

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/` | Homepage — create form + all posts |
| POST | `/posts` | Create a post |
| GET | `/posts/:id/edit` | Edit form |
| PUT | `/posts/:id` | Update a post |
| DELETE | `/posts/:id` | Delete a post |

PUT/DELETE use `method-override` via `?_method=`.
