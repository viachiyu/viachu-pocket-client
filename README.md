# Project Title - Name

## Overview

This app is designed to simplify this process for groups, making it effortless to track and divide expenses. When the time comes to settle up at the end of the trip or event, the app has already done the math, so you know exactly what you owe or are owed!

### Problem

On a summer trip I once took, we didn't bother keeping track of expenses or who owed what. So, when it came time to square things up, I found myself in the role of gathering meal receipts, Uber invoices, and all the other expenses people were owed for. To complicate matters, I had to navigate Excel for the very first time to crunch the numbers, which was quite a task. Managing three months' worth of holiday expenses turned out to be quite a demanding endeavour.

I have realised that especially during big group trips or outings, splitting bills can often become a headache, with often one person shouldering the entire expense at once. It's especially complicated when there are multiple meals, activities, and various costs to consider. Keeping track of who paid what and how much each person owes or is owed can be a real challenge.

### User Profile

Either: Multi profile/collaborative sign in so everyone in the group can use it.
Or: Single user, one person does all the tracking.

### Features

Within the app, the group can establish a personalised 'pocket,' where each member will set up and create their own profile. This feature provides the flexibility to input expenses, specifying who paid what and how the total should be divided among the group, either evenly or according to individual shares. Additionally, the app offers categorisation options, allowing users to label their expenditures, making it convenient to track expenses related to food, activities, drinks, shopping, and more.
Additionally, the app will feature a section where members can securely store their preferred payment methods, such as bank details, PayPal email, VenMo numbers, and more. This ensures that when it's time for reimbursement, individuals can conveniently access the necessary information to make payments, eliminating the need for awkward requests or exchanges of payment details.

## Implementation

### Tech Stack

HTML, CSS, SASS, React.js, Node.js, Express.js, Knex.js, MySQL

### Sitemap

1. Home page: Logo (Log in/ Sign up?)
2. Pocket’s page: Create a pocket or click into an existing one?
   ^^ Depends on how auth works for this app

3. ExpenseList Page: List of all previous expenses (top most recent)
4. AddExpense Page: Create a new expense (redirects back to expense list page after)
5. EditExpense -> edit expense on the list (modal)
6. Delete Expense -> delete expense on the list (modal)
7. ProfileList Page -> Active Profile at top with all details shown, rest in list form under it
8. AddProfile Page -> Create new profile (redirects back to expense list page after)
9. EditProfile -> edit profile on the list (modal)
10. DeleteProfile -> delete profile on the list (modal)

### Mockups

<!-- Images here -->

### APIs

N/A

### Data

Creating my own database: Profiles & Expenses
Profile can have many expenses
Expenses can be correlated to many people?

### Endpoints

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

## Roadmap

## Nice-to-haves

Multiple pockets? Collaborative Feature? Sign In/Auth?
