# Project Title - Pock/eT

## Overview

This mobile-view app is designed to simplify this process for groups, making it effortless to track and divide expenses. When the time comes to settle up at the end of the trip, the app has already done the math, so you know exactly what you owe or are owed!

### Problem

On a summer trip I once took, we didn't bother keeping track of expenses or who owed what. So, when it came time to square things up, I found myself in the role of gathering meal receipts, Uber invoices, and all the other expenses people were owed for. To complicate matters, I had to navigate Excel for the very first time to crunch the numbers, which was quite a task. Managing three months' worth of holiday expenses turned out to be quite a demanding endeavour.

I have realised that especially during big group trips or outings, splitting bills can often become a headache, with often one person shouldering the entire expense at once. It's especially complicated when there are multiple meals, activities, and various costs to consider. Keeping track of who paid what and how much each person owes or is owed can be a real challenge.

### User Profile

Single user at a time, must log in/sign up.

### Features

Within the app, the group can establish a personalised 'pocket,' to store all their shared expenses. This feature provides the flexibility to input expenses, specifying who paid what and how the total should be divided among the group in regards to who was involved with the expense. Additionally, the app offers categorisation options, allowing users to label their expenditures, making it convenient to track expenses related to food, activities, drinks, shopping, and more.

The app will feature a section where members can securely store their preferred payment methods, such as bank details, PayPal email, VenMo numbers, and more. This ensures that when it's time for reimbursement, individuals can conveniently access the necessary information to make payments, eliminating the need for awkward requests or exchanges of payment details. In the profiles section, users can easily check how much they are owed by who, and how much they owe and specifically to who.

## Implementation

### Tech Stack

HTML, CSS, SASS, React.js, Node.js, Express.js, Knex.js, MySQL

### Sitemap

1. Home Page: Logo + Log In
2. Signup Page: Sign up an account/profile.
3. Pockets page: Create a pocket, click into an existing one or delete pocket.
4. Expenses Page: List of all previous expenses of the pocket.
5. AddExpense Page: Create a new expense (redirects back to expense list page after)
6. EditExpense Page: Edit expense on the list (redirects back to expense list page after)
7. Profiles Page: Active profile at top, rest of profiles under it

### Mockups

<!-- Images here -->

### APIs

From own created Database

### Data

Creating my own database:

1. Pockets Table
2. Profile Table
3. Pocket_profile Table (many to many relationship)
4. Category Table
5. Expenses Table
6. Expense_Profile Table (many to many relationship)

### Endpoints

/GET all pockets
/GET pocket by id
/ADD pocket
/DELETE pocket

/GET all profiles
/GET profile by id
/ADD profile (signup)

/GET all expenses
/GET expense by id
/ADD expense
/EDIT expense
/DELETE expense

/GET expenses_profiles

### Auth

OAuth -> LogIn/SignUp functionality, token & email to be stored in sessionStorage.
SessionStorage cleared when user signs out by clicking logo icons in header.

## Roadmap

Day One:
Setup client & server repos
Sketch design mockups of each page
Server -> Build backend migration tables, seeds and seed data
Client -> Create page structures & routes, find inital assets (fonts, icons)

Day Two:
Server -> Create all /get requests, create backend authentication functionality
Client -> Create LogIn & Signup page with authentication functionality, create header

Day Three:
Server -> create /add pocket & /edit pocket
Client -> Create Pockets Page & Expense List page, create nav footer

Day Four:
Server -> create /add expenses & /edit expenses
Client -> Create Add Expense & Edit Expense Page

Day Five:
Server -> create /edit profile & /delete profile
Client -> Create Profile Page & Delete Profile Modal

Day Six:
Server -> create /delete pocket & /delete expenses
Client -> Create Delete Pocket Modal & Delete Expense Modal

Day Seven:
Server -> Test backend functionality
Client -> Link all pages together, test front end functionality, + Additional Assets

## Nice-to-haves

- Split amounts individually
- Category PieChart

### Installation

Ensure you have access to front end and back end code:
Front End: https://github.com/viachiyu/olivia-chu-capstone
Back End: https://github.com/viachiyu/olivia-chu-capstone-server

## Setting up Front End:

git clone <ssh front end key>
npm i [download node_modules]
create .env file -> REACT_APP_BASE_URL=http://localhost:8080 (replace with your own localhost)
Mobile Screen Size: 375px

## Setting up Back End:

git clone <ssh back end key>
npm init [download node_modules]
npm install knex mysql2 dotenv

Run in command line:
mysqld
mysql -u root -p
CREATE DATABASE capstone

create .env file ->
SERVER_PORT=8080
DB_HOST=127.0.0.1
DB_NAME=capstone
DB_USER=""
DB_PASSWORD=""
JWT_KEY=oadcvkjnwkejfoxcwjkn

npx knex migrate:latest (run database migrations)
npx knex seed:run (seed data into tables)
