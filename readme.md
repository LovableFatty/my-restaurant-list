# hands-on project https://docs.google.com/document/d/1Xn-fqAsnarJk8sZG6C9Tml9wk2Xxf9HSPrtf8mTXcls/edit?hl=en&tab=t.0
Single page application?
apis endpoints:
- add
    - object, formfield
    - backend must update the db (postgres/mongo)
    - 
- get
    - getting the whole list
    - FE, filter by rating, location, type, ...

- update
    - updating only the object.rating
    - can update the rest as well
- delete

Welcome to the Pallas Full Stack Hands On!

Your task is to build a simple prototype web app called “My Restaurant List.” Ideally use React on FE and JS/TS/Python for BE.

You are encouraged to use any tools you deem necessary. All pragmatic options that a software engineer would use are on the table e.g. component libraries, utility libraries, frameworks, search & documentation, even AI if you want (responsibly). There is no need to do everything from scratch. The data can be handled in any way you see fit, whether that means using a minimalist ‘mock DB’, SQL vs. NoSQL, etc – it’s your call.

Don’t worry about deployment or environments. This is 100% local.

Take creative liberty with your design choices to build something sensible and aesthetic with a clear UX — there are no Figma mockups or wireframes.

If you are familiar and comfortable with the technologies Pallas uses, it would be great to see you use some of them. If not, that’s ok, but please use something similar or comparable.
Frontend suggestions
React (must)
Vite
TS
Shadcn UI (component library based on Radix primitives)
Tailwind CSS
React Query
React Router
Backend suggestions
Python or JS/TS
FastAPI or Node/Express
Feature Requirements
Add a restaurant
Add a restaurant to your list, where each restaurant has:
Name
Type (of cuisine)
Image (URL — no need for file picker or uploading)
Use these: https://unsplash.com/s/photos/restaurant-food?license=free
Location (city — no need to use a location API, just text)
Rating (out of 5 stars)
[optional] Description (short summary, around 2-3 lines) 
Price range (from $ to $$$)
View restaurants 
Restaurants are represented as cards in a grid. Take creative liberty but follow familiar, aesthetic card grid design patterns seen in popular UI’s.
Actions for restaurant 
Each restaurant card has an action menu with two options: edit, and delete.
For simplicity, limit ‘edit’ to only editing the rating. If you have more time, you can implement ‘edit’ for the rest of the fields.
Delete should have a warning mechanism, such as a confirm dialog
