# Questionnaire Management System

A web-based admin platform for managing questionnaire metadata, question banks, and related master data. Built with Node.js, Express, MySQL, and vanilla HTML/CSS/JavaScript.

## Features

- **Attribute Master** — Create and manage attributes (dimensions used to classify questions)
- **Attribute Value Master** — Manage allowed values for each attribute
- **Attribute Position** — Configure attribute ordering by database type
- **Question Master** — Full CRUD for questions linked to attributes
- **Question Criteria** — Select which attributes apply to question filtering
- **Security module** — Roles, privileges, and users (UI scaffolding in place)

## Tech Stack

| Layer    | Technology        |
| -------- | ----------------- |
| Backend  | Node.js, Express  |
| Database | MySQL             |
| Frontend | HTML, CSS, JS     |

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MySQL](https://www.mysql.com/) running locally
- A MySQL database named `questionnaire_db`

## Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/trishaxcodex/Questionnaire.git
   cd Questionnaire
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure the database**

   Update the connection settings in `server.js` to match your local MySQL setup:

   ```js
   host: "localhost",
   user: "root",
   password: "your_password",
   database: "questionnaire_db"
   ```

4. **Create the required tables**

   Ensure your MySQL database includes tables for `attributes`, `attribute_values`, `questions`, and `question_criteria`.

5. **Start the server**

   ```bash
   node server.js
   ```

6. **Open the app**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Questionnaire/
├── server.js          # Express API and MySQL connection
├── package.json       # Dependencies
├── public/            # Frontend pages
│   ├── index.html     # Home page
│   ├── attributes.html
│   ├── attribute-values.html
│   ├── question-master.html
│   └── ...
└── README.md
```

## API Endpoints

| Method | Route                    | Description              |
| ------ | ------------------------ | ------------------------ |
| GET    | `/attributes`            | List all attributes      |
| POST   | `/addAttribute`          | Create an attribute      |
| PUT    | `/updateAttribute/:id`   | Update an attribute      |
| DELETE | `/deleteAttribute/:id`   | Delete an attribute      |
| GET    | `/attributeValues`       | List attribute values    |
| GET    | `/questions`             | List questions           |
| POST   | `/addQuestion`           | Create a question        |
| POST   | `/saveCriteria`          | Save question criteria   |

## License

ISC
