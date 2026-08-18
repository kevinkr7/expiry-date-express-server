# prompts
Start with Context Building whenever you are starting to work from scratch.

## 1. Context Building
Analyse the .agents/skills/skills.yaml and instructions.md file and remember all the instructions.
Once you have done it, please acknowledge so that we can start coding.

## 2. Re-training
Please re-analyse the .agents/skills folder as I have updated the instructions and acknowldge you have updated the instructions and context before we start building.

## 3. Closing Task
I have tested the changes, I'm happy with the results. Please add walkthrough in the .agents history folder.

## 4. Working on Tasks
Start picking tasks from ./ai/tasks.md file. Work on one task at a time, prepare implementaion plan, implement it, wait for my closure confirmation, mark the task done, and then move on to the next task. Do this until all the tasks are done in the tasks.md file.

## 5. Database Desgin 
I'm not sure of Database design using MongoDB for this project. So let's brainstorm together. I'm sharing the use-cases I have for the application below.

### Use-Cases
1. Dashboard: After login, user lands on Dashboard where the application shows the products that are nearing expiry. The products that are displayed should be paginated with no more than 20 products displayed at a time.
2. Add Product: On the dashboard, user will have link to add Product. On clicking the link, Add Product page must be visible where user must be able to scan the product using UPC barcode or manually enter the code, along with other information like title, amount, expiry date.
3. Edit/Delete Product: On the dashboard, when user sees the list of the products, there should be option to edit or delete the product next to each product in the list.
4. Search & Filters: When showing list of products on the Dashboard, user must have option to search the product by title, UPC code. And also must have option to filter by expiry dates (example within 3 months, 1 month, etc.).

## 6. API Creation
Generate the task list for implementing the APIs for the below use-cases.

Give me REST signatures for each API in the task list.

### Use-Cases
1. Dashboard: After login, user lands on Dashboard where the application shows the products that are nearing expiry. The products that are displayed should be paginated with no more than 20 products displayed at a time.
2. Add Product: On the dashboard, user will have link to add Product. On clicking the link, Add Product page must be visible where user must be able to scan the product using UPC barcode or manually enter the code, along with other information like title, amount, expiry date.
3. Edit/Delete Product: On the dashboard, when user sees the list of the products, there should be option to edit or delete the product next to each product in the list.
4. Search & Filters: When showing list of products on the Dashboard, user must have option to search the product by title, UPC code. And also must have option to filter by expiry dates (example within 3 months, 1 month, etc.).

