# Technical Assignment: Internship Developer Position at IDT Team

This repository contains the solution for a technical assignment for an internship developer position at the IDT team. The task involves creating a web application that allows users to solve quiz entries and view high scores from previous results.

## Task Description

### Objective
Build a web application with the following functionalities:
- Solve a quiz consisting of 10 questions of varying types.
- Display high scores from previous quiz attempts.

### Functional Requirements

#### General
**Two Pages:**
1. **Quiz Page**: For solving the quiz.
2. **High Scores Page**: For displaying top scores.

#### Quiz Details
- The quiz should consist of 10 questions with the following types:
  - **Radio buttons**: Single answer questions (4 questions).
  - **Checkboxes**: Multiple answer questions (4 questions).
  - **Textbox**: Manual text input questions (2 questions).
- Users must enter their email to save their score.

#### High Scores Page
- Displays only the top 10 scores.
- Each entry shows:
  - Position
  - Email
  - Score
  - Date and time of submission
- Top 3 places are styled as:
  - 🥇 Gold
  - 🥈 Silver
  - 🥉 Bronze

### Scoring Rules
- **Radio buttons**: +100 points for each correct answer.
- **Checkboxes**:
  - Formula: `(100 / good answers) * correctly checked`
  - Rounded up, no decimal points.
- **Textbox**: +100 points for an identical match (case-insensitive).

---

### Technical Requirements

#### Back-End
- **Framework**: ASP.NET Core
- **Database**: EF Core with an in-memory database for storing:
  - Quiz entries
  - Answers
  - High scores
- **Logic**: All calculation logic is handled in the back end.

#### Front-End
- **Framework**: React
- **UI Library**: Any modern library such as:
  - Bootstrap
  - Material UI
  - Tailwind CSS

### Code Sharing
- The project is hosted on GitHub for version control.

### Authentication
- No authentication is required.

---

### Optional Features (Nice to Have)
- Unit Tests in the back end.
- Implementation of Dependency Injection.
- Use of a mapper package or a custom mapping solution.
- React Stepper Component for the quiz-solving page.
- Use of TypeScript for the front end.

---

## Evaluation Criteria
- **Functionality**: Completeness of the web application.
- **Code Quality**: Clean, maintainable, and well-documented code.
- **Architecture Decisions**: Thoughtful architecture for back-end and front-end implementations.
- **Tools Used**: Appropriateness of tools and libraries.
- **Design Patterns**: Effective use of design patterns.

---

## Installation and Setup

### Prerequisites
- Node.js and npm installed for the front end.
- .NET SDK installed for the back end.

### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/DanieliusRyl/QuizApp.git
   ```
2. Navigate to the server directory and set up the back end:
   ```bash
   cd QuizApp/server
   dotnet restore
   dotnet build
   dotnet run
   ```
3. Navigate to the client directory and set up the front end:
   ```bash
   cd ../client
   npm install
   npm run dev
   ```
4. Access the application at:
   ```bash
   http://localhost:5173/
   ```
## Running Tests
1. Navigate to the tests directory:
   ```bash
   cd QuizApp/tests/QuizApp.tests
   ```
2. Run the tests:
   ```bash
   dotnet restore
   dotnet test
   ```
