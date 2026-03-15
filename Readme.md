This is a complex backend project. Peace!!!


#  Video Platform REST API

A production-ready REST API backend for a YouTube-like video streaming and social platform. Built with Node.js, Express, and MongoDB.

🔧 **Live API:** [gaurav-s-backend.onrender.com](https://gaurav-s-backend.onrender.com)  
📦 **Frontend Repo:** Coming soon

> ⚠️ Hosted on Render's free tier — the first request may take 30–50 seconds to wake up the server.

---

## Quick API Test

Verify the API is live without any setup:

```bash
curl https://gaurav-s-backend.onrender.com/api/v1/healthcheck
```

Or open in browser:
```
GET https://gaurav-s-backend.onrender.com/api/v1/healthcheck
GET https://gaurav-s-backend.onrender.com/api/v1/videos
```

---

## Features

- **JWT Authentication** — Access & refresh token rotation with HttpOnly cookies
- **Video Management** — Upload, update, delete, toggle publish status
- **Comments** — Nested comment system with like support
- **Likes** — Toggle likes on videos, comments, and tweets
- **Tweets** — Short-form posts per channel with like/edit/delete
- **Subscriptions** — Subscribe to channels, get subscriber/subscription counts
- **Playlists** — Create and manage video playlists
- **Channel Profiles** — Aggregated channel data with subscriber counts
- **Dashboard Analytics** — Total views, likes, subscribers, and video count
- **Watch History** — Track and retrieve user watch history
- **Full-text Search** — Search videos by keyword with sorting and pagination
- **File Uploads** — Video, thumbnail, avatar, and cover image via Multer + Cloudinary
- **Authorization Middleware** — Ownership checks on all mutating operations

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | ODM with schema validation |
| JWT | Access & refresh token authentication |
| Bcrypt | Password hashing |
| Multer | Multipart file handling |
| Cloudinary | Cloud media storage |
| CORS | Cross-origin request handling |
| Dotenv | Environment configuration |

---

## API Reference

**Base URL:** `https://gaurav-s-backend.onrender.com/api/v1`

### Auth — `/users`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/users/register` | ❌ | Register new user (multipart/form-data) |
| POST | `/users/login` | ❌ | Login, returns access + refresh token |
| POST | `/users/logout` | ✅ | Logout and clear cookies |
| POST | `/users/refresh-token` | ❌ | Refresh access token via cookie |
| POST | `/users/change-password` | ✅ | Change current password |
| GET | `/users/current-user` | ✅ | Get logged-in user data |
| PATCH | `/users/update-account` | ✅ | Update full name and email |
| PATCH | `/users/avatar` | ✅ | Update avatar image |
| PATCH | `/users/cover-image` | ✅ | Update cover image |
| GET | `/users/c/:username` | ✅ | Get channel profile with subscriber count |
| GET | `/users/history` | ✅ | Get watch history |

### Videos — `/videos`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/videos` | ✅ | Get all videos (query, page, limit, sortBy, sortType) |
| POST | `/videos` | ✅ | Upload a new video (multipart/form-data) |
| GET | `/videos/:videoId` | ✅ | Get video by ID |
| PATCH | `/videos/:videoId` | ✅ | Update video title, description, thumbnail |
| DELETE | `/videos/:videoId` | ✅ | Delete a video |
| PATCH | `/videos/toggle/publish/:videoId` | ✅ | Toggle publish status |

### Comments — `/comments`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/comments/:videoId` | ✅ | Get paginated comments for a video |
| POST | `/comments/:videoId` | ✅ | Add a comment |
| PATCH | `/comments/c/:commentId` | ✅ | Edit a comment |
| DELETE | `/comments/c/:commentId` | ✅ | Delete a comment |

### Likes — `/likes`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/likes/toggle/v/:videoId` | ✅ | Toggle like on a video |
| POST | `/likes/toggle/c/:commentId` | ✅ | Toggle like on a comment |
| POST | `/likes/toggle/t/:tweetId` | ✅ | Toggle like on a tweet |
| GET | `/likes/videos` | ✅ | Get all liked videos |

### Tweets — `/tweets`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/tweets` | ✅ | Create a tweet |
| GET | `/tweets/user/:userId` | ✅ | Get all tweets by a user |
| PATCH | `/tweets/:tweetId` | ✅ | Edit a tweet |
| DELETE | `/tweets/:tweetId` | ✅ | Delete a tweet |

### Subscriptions — `/subscriptions`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/subscriptions/c/:channelId` | ✅ | Toggle subscription to a channel |
| GET | `/subscriptions/c/:channelId` | ✅ | Get all subscribers of a channel |
| GET | `/subscriptions/u/:subscriberId` | ✅ | Get all channels a user subscribes to |

### Playlists — `/playlist`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/playlist` | ✅ | Create a playlist |
| GET | `/playlist/:playlistId` | ✅ | Get playlist by ID |
| PATCH | `/playlist/:playlistId` | ✅ | Update playlist name/description |
| DELETE | `/playlist/:playlistId` | ✅ | Delete a playlist |
| PATCH | `/playlist/add/:videoId/:playlistId` | ✅ | Add video to playlist |
| PATCH | `/playlist/remove/:videoId/:playlistId` | ✅ | Remove video from playlist |
| GET | `/playlist/user/:userId` | ✅ | Get all playlists by a user |

### Dashboard — `/dashboard`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/dashboard/stats` | ✅ | Get channel stats (views, likes, subscribers, videos) |
| GET | `/dashboard/videos` | ✅ | Get all videos for the logged-in channel |

---

## Database Schema

7 Mongoose models with relational referencing:

| Model | Key Fields |
|---|---|
| User | username, email, password, avatar, coverImage, watchHistory, refreshToken |
| Video | title, description, videoFile, thumbnail, owner, views, isPublished |
| Comment | content, video, owner |
| Like | video / comment / tweet, likedBy |
| Tweet | content, owner |
| Subscription | subscriber, channel |
| Playlist | name, description, videos, owner |

---

## Getting Started Locally

### Prerequisites
- Node.js 18+
- MongoDB URI (Atlas or local)
- Cloudinary account

### Installation

```bash
# Clone the repository
git clone https://github.com/Gaurav4445/Gaurav-s---Backend.git
cd Gaurav-s---Backend

# Install dependencies
npm install

# Create environment file
cp .env.sample .env
```

### Environment Variables

PORT=8000
MONGODB_URI=mongodb+srv://gaurav_user:924u5TM71GDd0gNX@cluster0.bsthzo6.mongodb.net/
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=87c29a2dd66318bc4370e78f623345433fe49180b5c0c07c8f0184698a19389a  
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=123
REFRESH_TOKEN_EXPIRY=10d  
CLOUDINARY_CLOUD_NAME=dsfgajr9c
CLOUDINARY_API_KEY=561691318575627
CLOUDINARY_API_SECRET=J50ZPxyqIDCat0jxV1GPk7zaADg
CLOUDINARY_URL=cloudinary://561691318575627:J50ZPxyqIDCat0jxV1GPk7zaADg@dsfgajr9c

### Run

```bash
npm run dev
```

Server starts at `http://localhost:8000`

---

## Deployment

Deployed on **Render** with:
- Environment variables set via Render dashboard
- Multi-origin CORS support via dynamic origin validation
- Auto-deploy on push to `main`

---

## Author

**Gaurav Hukkerikar** — [github.com/Gaurav4445](https://github.com/Gaurav4445)  
[linkedin.com/in/gaurav-hukkerikar](https://linkedin.com/in/gaurav-hukkerikar)

---

## License

This project is for educational and portfolio purposes.