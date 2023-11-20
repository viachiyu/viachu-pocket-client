# Project Title - Pock/eT

## Overview

This app is designed to simplify this process for groups, making it effortless to track and divide expenses. When the time comes to settle up at the end of the trip, the app has already done the math, so you know exactly what you owe or are owed!

### Problem

On a summer trip I once took, we didn't bother keeping track of expenses or who owed what. So, when it came time to square things up, I found myself in the role of gathering meal receipts, Uber invoices, and all the other expenses people were owed for. To complicate matters, I had to navigate Excel for the very first time to crunch the numbers, which was quite a task. Managing three months' worth of holiday expenses turned out to be quite a demanding endeavour.

I have realised that especially during big group trips or outings, splitting bills can often become a headache, with often one person shouldering the entire expense at once. It's especially complicated when there are multiple meals, activities, and various costs to consider. Keeping track of who paid what and how much each person owes or is owed can be a real challenge.

### User Profile

Single user, one profile.

### Features

Within the app, the group can establish a personalised 'pocket,' where each member will set up and create their own profile. This feature provides the flexibility to input expenses, specifying who paid what and how the total should be divided among the group, either evenly or according to individual shares. Additionally, the app offers categorisation options, allowing users to label their expenditures, making it convenient to track expenses related to food, activities, drinks, shopping, and more.
Additionally, the app will feature a section where members can securely store their preferred payment methods, such as bank details, PayPal email, VenMo numbers, and more. This ensures that when it's time for reimbursement, individuals can conveniently access the necessary information to make payments, eliminating the need for awkward requests or exchanges of payment details.

## Implementation

### Tech Stack

HTML, CSS, SASS, React.js, Node.js, Express.js, Knex.js, MySQL

### Sitemap

1. Home Page: Logo + Log In
2. Signup Page: Sign up an account/profile.
3. Pockets page: Create a pocket or click into an existing one
4. Expenses Page: List of all previous expenses of the pocket(top most recent)
5. AddExpense Page: Create a new expense (redirects back to expense list page after)
6. EditExpense Page: Edit expense on the list
7. Profiles Page: Active profile at top, rest of profiles under it
8. EditProfile: Edit active profile on the list
9. Delete Pocket -> delete pocket on the list (modal on Pockets Page)
10. Delete Expense -> delete expense on the list (modal on Expenses Page)
11. Delete Profile -> delete profile on the list (modal on Profiles Page)

### Mockups

<!-- Images here -->

### APIs

N/A

### Data

Creating my own database: Profiles & Expenses

### Endpoints

/GET all pockets
/GET pocket by id

/ADD pocket
/EDIT pocket
/DELETE pocket

/GET all profiles
/GET profile by id

/ADD profile
/EDIT profile
/DELETE profile

/GET all expenses
/GET expense by id

/ADD expense
/EDIT expense
/DELETE expense

### Auth

OAuth -> LogIn/SignUp functionality

## Roadmap

Day One:
Setup client & server repos
Sketch design mockups of each page
Server -> Build backend migration tables, seeds and seed data
Client -> Create page structures & routes, find inital assets (fonts, icons)

Day Two:
Server -> Create all /get requests, create backend authentication functionality
Client -> Create LogIn & Signup page with authentication functionality

Day Three:
Server -> create /add pocket & /edit pocket
Client -> Create Pockets Page & Expense List page

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
- Different Currency option
