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
- Adding more features, definitely.  If I had time, and better visual design abilities, I would figure out how to add checkboxes and delete buttons in a visually appealing manner.
- This is more a knowledge thing, but the code still feels inefficient/lengthy.  I would take more time to research more javascript and html, and use that to refactor the code into something more compact and understandable.
- following this logic, the category list builder seems messy, and I'm sure there's a far more efficient way of doing this, as one example.  Doing research after the project I came across Set as one solution, but I'll need to read more documentation on this to implement it and refactor my category list builder.
