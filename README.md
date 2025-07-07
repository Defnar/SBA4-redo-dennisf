# Read me Instructions
- Reflection: Write a short reflection (100-200 words) included within the repository discussing:

- Challenges faced during the project.
- How you approached solving those challenges.
- What you would improve if given more time.

# Read Me Answers
## 1. Challenges faced
- The only thing I really found challenging was the implementation of dropdown boxes into the table element I created, given how I handled creation of each <td> element via a helper function outside of the function used to create each row.  On the first iteration I was met with something like HTML Object in the dropdown area of the table.

## 2. How I approached these challenges:
- 2 things, researching Javascript and testing out different things in javascript.  This was solved through placing an if statement in the helper function for creating <td> elements, where ```if(typeof input == "object")``` returns true, it is appended to the node instead of added to text content.

## 3. What would I improve
- Adding more features, definitely.  If I had time, and better visual design abilities, I would figure out how to add checkboxes and delete buttons in a visually appealing manner.  Allow for editting multiple statuses and objects simultaneously
- This is more a knowledge thing, but the code still feels inefficient/lengthy.  I would take more time to research more javascript and html, and use that to refactor the code into something more compact and understandable.
- following this logic, the category list builder seems messy, and I'm sure there's a far more efficient way of doing this, as one example.
  - Originally this was the case, however I did some research and came across javascript sets.  I implemented set functionality into this instead of using it as a list.
  - Another option, and I think would probably be best if I wanted to refactor, is to run building the list using logic to check if category is in the category list, and creating an option out of each unique one simultaneously rather than running 2 foreach loops back to back.  This would probably cut down runtime and be more efficient on larger applications
    - This was refactored in my latest version.  I realized I didn't need to rebuild the set on every update, as there is no reason to recreate the set every run.  This would be the case if tasks were deleteable, but I decided not to add that feature this time.
- Better categorization of code.  I placed all of my event listeners in one location in the javascript code, however everything else is still a bit messy.  I'm just not sure how to categorize at this time, maybe something like: //Objects// | //Helper Functions// | //Startup calls//?  What are general industry practices for organization of code?
- figure out a way to remove the seconds from tolocalestring on date() function
