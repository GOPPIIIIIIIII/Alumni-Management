# Alumni Nexus - Alumni Management System

An end-to-end full-stack web application designed to connect students and alumni for networking, mentorship, career guidance, job opportunities, and event management.

---

## 🌟 Key Features

- **Authentication & Authorization**: Secure JWT-based authentication with role-based access control (Student, Alumni, Admin).
- **Alumni Directory**: Search, filter, and connect with alumni based on company, graduation year, industry, and skills.
- **Mentorship Hub**: Request mentorship, schedule 1-on-1 sessions, and track mentorship status.
- **Job & Internship Board**: Explore and post career opportunities, referrals, and job openings.
- **Events & Webinars**: Discover upcoming alumni meetups, webinars, and networking events.
- **Discussion Forums**: Engage in community discussions, Q&A, and knowledge sharing.
- **Admin Dashboard**: Comprehensive administration dashboard to oversee user approvals, mentorship requests, and platform analytics.

---

## 🛠️ Tech Stack

### Frontend (`alumni-nexus-ui`)
- **React 18** + **Vite**
- **Tailwind CSS** for responsive modern styling
- **React Router DOM** for client-side routing
- **Lucide React** for icons
- **Axios** for HTTP API client

### Backend (`Alumni-management`)
- **Java 17+** / **Spring Boot 3**
- **Spring Security** with **JWT** token-based authentication
- **Spring Data JPA / Hibernate**
- **MySQL Database**
- **Maven** build tool

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18+)
- **Java Development Kit (JDK 17+)**
- **Maven** (or Maven wrapper)
- **MySQL Server**

---

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Alumni-management
   ```
2. Configure database credentials in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/alumni_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```
3. Build and run the Spring Boot server:
   ```bash
   mvn clean spring-boot:run
   ```
   The backend will start at `http://localhost:8080`.

---

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd alumni-nexus-ui
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:5173`.

---

## 📁 Project Structure

```text
Alumni management/
├── Alumni-management/       # Spring Boot backend application
│   ├── src/main/java/       # Controllers, Services, Models, Repositories, Security
│   ├── src/main/resources/  # application.properties & static assets
│   └── pom.xml              # Maven dependencies
├── alumni-nexus-ui/         # React + Vite frontend application
│   ├── src/
│   │   ├── api/             # API services (axios)
│   │   ├── components/      # UI components
│   │   ├── pages/           # Application views/routes
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 📄 License
This project is open-source and available for educational and academic purposes.
