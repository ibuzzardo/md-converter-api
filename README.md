# md-converter-api

Simple Markdown to HTML converter API — Sr. Engineer test project

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

- `PORT` - Port for the API server
- `CORS_ORIGINS` - Comma-separated list of allowed CORS origins. Use `*` to allow all origins.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Compile TypeScript to `dist/`
- `npm start` - Run compiled server

## API

### GET /health

Returns service health status.

#### Response

```json
{
  "success": true,
  "message": "Service is healthy"
}
```

### POST /convert

Converts markdown to sanitized HTML.

#### Request Body

```json
{
  "markdown": "# Hello world"
}
```

#### Success Response

```json
{
  "success": true,
  "data": {
    "html": "<h1>Hello world</h1>\n"
  }
}
```

#### Validation Error Response

```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "details": [
      "Markdown is required"
    ]
  }
}
```

## Notes

- Request body size limit is 1MB.
- HTML output is sanitized with DOMPurify and JSDOM to reduce XSS risk.
- All error responses are structured JSON.
