const mongoose = require("mongoose");
const Quiz = require("./models/quiz");

mongoose.connect("mongodb://127.0.0.1:27017/algorium");

const data = [

{
topic: "ai",
question: "Which search algorithm guarantees optimality when the heuristic is admissible?",
options: ["DFS", "Greedy Best First Search", "A*", "Hill Climbing"],
correct: 2,
explanation: "A* guarantees optimality if the heuristic is admissible and consistent."
},
{
topic: "ai",
question: "What is the main limitation of a heuristic that is not admissible?",
options: ["Slow execution", "Consumes more memory", "May overestimate cost and lose optimality", "Cannot be computed"],
correct: 2,
explanation: "Non-admissible heuristics may overestimate and lead to non-optimal solutions."
},
{
topic: "ai",
question: "Which concept ensures that reinforcement learning balances exploration and exploitation?",
options: ["Bellman Equation", "Epsilon-Greedy Strategy", "Gradient Descent", "Markov Chain"],
correct: 1,
explanation: "Epsilon-greedy introduces randomness to balance exploration and exploitation."
},
{
topic: "ai",
question: "In neural networks, what does vanishing gradient primarily affect?",
options: ["Input layer", "Output layer", "Hidden layers", "Loss function"],
correct: 2,
explanation: "Vanishing gradients affect hidden layers, making deep networks hard to train."
},
{
topic: "ai",
question: "Which architecture is specifically designed for sequence-to-sequence learning?",
options: ["CNN", "RNN Encoder-Decoder", "GAN", "Autoencoder"],
correct: 1,
explanation: "Encoder-decoder RNNs handle sequence-to-sequence tasks like translation."
},
{
topic: "ai",
question: "What does Q-learning aim to learn?",
options: ["Optimal policy directly", "Value of states only", "Action-value function", "Reward function"],
correct: 2,
explanation: "Q-learning learns the action-value function Q(s,a)."
},
{
topic: "ai",
question: "Which algorithm is most suitable for partially observable environments?",
options: ["Dijkstra", "POMDP", "KNN", "Linear Regression"],
correct: 1,
explanation: "POMDP handles uncertainty in state observation."
},
{
topic: "ai",
question: "What is the key advantage of Transformers over RNNs?",
options: ["Less memory usage", "Better sequential processing", "Parallelization via attention", "Simpler architecture"],
correct: 2,
explanation: "Transformers use attention allowing parallel computation."
},
{
topic: "ai",
question: "Which loss function is commonly used for classification tasks?",
options: ["MSE", "Cross-Entropy", "MAE", "Hinge Loss"],
correct: 1,
explanation: "Cross-entropy is standard for classification."
},
{
topic: "ai",
question: "What does overfitting indicate?",
options: ["Model too simple", "Model memorizes training data", "Model underperforms always", "Model unstable"],
correct: 1,
explanation: "Overfitting occurs when model learns noise instead of general patterns."
},
{
topic: "ai",
question: "Which technique reduces overfitting in neural networks?",
options: ["Batch normalization", "Dropout", "ReLU", "Pooling"],
correct: 1,
explanation: "Dropout randomly disables neurons to prevent overfitting."
},
{
topic: "ai",
question: "Which method is used for dimensionality reduction?",
options: ["KNN", "PCA", "SVM", "Naive Bayes"],
correct: 1,
explanation: "PCA reduces dimensions while preserving variance."
},
{
topic: "ai",
question: "What is the role of activation functions?",
options: ["Increase dataset size", "Introduce non-linearity", "Reduce training time", "Normalize data"],
correct: 1,
explanation: "Activation functions enable networks to learn complex patterns."
},
{
topic: "ai",
question: "Which model is used for generative tasks?",
options: ["CNN", "GAN", "KNN", "Decision Tree"],
correct: 1,
explanation: "GANs generate new data samples."
},
{
topic: "ai",
question: "What does the Bellman equation represent?",
options: ["Gradient update", "Recursive value relation", "Loss minimization", "Probability distribution"],
correct: 1,
explanation: "Bellman equation defines recursive value updates in RL."
},



{
topic: "datascience",
question: "What does the Central Limit Theorem state?",
options: ["Data becomes uniform", "Sample mean approaches normal distribution", "Variance decreases", "Data becomes skewed"],
correct: 1,
explanation: "CLT states sample means approach normal distribution as sample size increases."
},
{
topic: "datascience",
question: "Which metric is best for imbalanced classification?",
options: ["Accuracy", "Precision-Recall", "MSE", "R²"],
correct: 1,
explanation: "Precision-recall handles imbalance better than accuracy."
},
{
topic: "datascience",
question: "What is multicollinearity?",
options: ["High variance", "Correlated independent variables", "Data imbalance", "Overfitting"],
correct: 1,
explanation: "Multicollinearity occurs when predictors are highly correlated."
},
{
topic: "datascience",
question: "Which method detects outliers?",
options: ["Z-score", "Mean", "Median", "Mode"],
correct: 0,
explanation: "Z-score identifies values far from mean."
},
{
topic: "datascience",
question: "Which algorithm is unsupervised?",
options: ["Logistic Regression", "K-Means", "SVM", "Decision Tree"],
correct: 1,
explanation: "K-Means is an unsupervised clustering algorithm."
},
{
topic: "datascience",
question: "What is bias-variance tradeoff?",
options: ["Accuracy vs speed", "Underfitting vs overfitting", "Loss vs gain", "None"],
correct: 1,
explanation: "It balances model simplicity and flexibility."
},
{
topic: "datascience",
question: "Which distribution is used for binary outcomes?",
options: ["Normal", "Poisson", "Bernoulli", "Uniform"],
correct: 2,
explanation: "Bernoulli models binary outcomes."
},
{
topic: "datascience",
question: "What does PCA maximize?",
options: ["Mean", "Variance", "Error", "Loss"],
correct: 1,
explanation: "PCA maximizes variance in reduced dimensions."
},
{
topic: "datascience",
question: "Which metric measures error magnitude?",
options: ["Accuracy", "MAE", "Precision", "Recall"],
correct: 1,
explanation: "MAE measures absolute error."
},
{
topic: "datascience",
question: "What is overfitting?",
options: ["Low variance", "Model memorizes training data", "Model underfits", "High bias"],
correct: 1,
explanation: "Overfitting occurs when model learns noise."
},
{
topic: "datascience",
question: "Which technique reduces variance?",
options: ["Bagging", "Boosting", "PCA", "Regression"],
correct: 0,
explanation: "Bagging reduces variance by averaging models."
},
{
topic: "datascience",
question: "What is a confusion matrix?",
options: ["Data storage", "Model evaluation tool", "Clustering method", "Regression model"],
correct: 1,
explanation: "It evaluates classification performance."
},
{
topic: "datascience",
question: "Which is a regression algorithm?",
options: ["KNN", "Linear Regression", "K-Means", "Naive Bayes"],
correct: 1,
explanation: "Linear regression predicts continuous values."
},
{
topic: "datascience",
question: "What is feature scaling?",
options: ["Data cleaning", "Normalization of values", "Feature removal", "Clustering"],
correct: 1,
explanation: "Scaling ensures uniform feature ranges."
},
{
topic: "datascience",
question: "Which method selects features?",
options: ["RFE", "K-Means", "CNN", "GAN"],
correct: 0,
explanation: "Recursive Feature Elimination selects important features."
},
{
topic: "webdev",
question: "What is the purpose of the event loop in Node.js?",
options: ["Memory management", "Handling async operations", "Database queries", "Thread creation"],
correct: 1,
explanation: "Event loop enables non-blocking asynchronous operations."
},
{
topic: "webdev",
question: "Which HTTP method is idempotent?",
options: ["POST", "PUT", "PATCH", "CONNECT"],
correct: 1,
explanation: "PUT is idempotent; multiple calls give same result."
},
{
topic: "webdev",
question: "What is middleware in Express?",
options: ["Database", "Function processing request-response", "UI component", "Server"],
correct: 1,
explanation: "Middleware functions process requests."
},
{
topic: "webdev",
question: "Which status code indicates unauthorized access?",
options: ["200", "401", "404", "500"],
correct: 1,
explanation: "401 indicates authentication required."
},
{
topic: "webdev",
question: "What does CORS stand for?",
options: ["Cross Origin Resource Sharing", "Central Resource System", "Client Request Service", "None"],
correct: 0,
explanation: "CORS allows controlled cross-origin requests."
},
{
topic: "webdev",
question: "Which database is NoSQL?",
options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
correct: 2,
explanation: "MongoDB is a document-based NoSQL DB."
},
{
topic: "webdev",
question: "What is REST?",
options: ["Protocol", "Architecture style", "Language", "Framework"],
correct: 1,
explanation: "REST is an architectural style for APIs."
},
{
topic: "webdev",
question: "What does JWT stand for?",
options: ["Java Web Token", "JSON Web Token", "JavaScript Web Token", "None"],
correct: 1,
explanation: "JWT is used for authentication."
},
{
topic: "webdev",
question: "Which is frontend framework?",
options: ["Node.js", "Express", "React", "MongoDB"],
correct: 2,
explanation: "React is used for UI development."
},
{
topic: "webdev",
question: "What is the use of dotenv?",
options: ["Database", "Environment variables", "Routing", "Styling"],
correct: 1,
explanation: "dotenv manages environment variables."
},
{
topic: "webdev",
question: "Which is backend runtime?",
options: ["React", "Node.js", "HTML", "CSS"],
correct: 1,
explanation: "Node.js runs backend JavaScript."
},
{
topic: "webdev",
question: "What is MVC?",
options: ["Design pattern", "Database", "Protocol", "Library"],
correct: 0,
explanation: "MVC separates concerns into Model, View, Controller."
},
{
topic: "webdev",
question: "Which method updates partial data?",
options: ["PUT", "PATCH", "GET", "DELETE"],
correct: 1,
explanation: "PATCH updates partial resources."
},
{
topic: "webdev",
question: "What is hashing used for?",
options: ["Encryption", "Password security", "Routing", "Styling"],
correct: 1,
explanation: "Hashing secures passwords."
},
{
topic: "webdev",
question: "Which protocol is stateless?",
options: ["HTTP", "FTP", "SMTP", "TCP"],
correct: 0,
explanation: "HTTP is stateless by design."
},



{
topic: "fundamentals",
question: "What is the output of type(3.14) in Python?",
options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", "<class 'str'>"],
correct: 1,
explanation: "3.14 is a floating point number, so type() returns <class 'float'>."
},
{
topic: "fundamentals",
question: "Which keyword is used to define a function in Python?",
options: ["func", "function", "def", "define"],
correct: 2,
explanation: "The 'def' keyword is used to declare a function in Python."
},
{
topic: "fundamentals",
question: "What will print(10 // 3) output?",
options: ["3.33", "3", "4", "1"],
correct: 1,
explanation: "// is floor division and returns the integer quotient."
},
{
topic: "fundamentals",
question: "Which of the following is a mutable data type in Python?",
options: ["tuple", "str", "int", "list"],
correct: 3,
explanation: "Lists are mutable — their contents can be changed after creation."
},
{
topic: "fundamentals",
question: "What does the len() function return for the string 'hello'?",
options: ["4", "5", "6", "Error"],
correct: 1,
explanation: "len('hello') returns 5, the number of characters in the string."
},
{
topic: "fundamentals",
question: "What is the correct way to create an empty dictionary?",
options: ["dict = []", "dict = ()", "dict = {}", "dict = set()"],
correct: 2,
explanation: "{} creates an empty dictionary in Python."
},
{
topic: "fundamentals",
question: "Which loop is best when the number of iterations is known?",
options: ["while loop", "for loop", "do-while loop", "recursion"],
correct: 1,
explanation: "A for loop is ideal when the number of iterations is predetermined."
},
{
topic: "fundamentals",
question: "What does the 'break' statement do inside a loop?",
options: ["Skips the current iteration", "Restarts the loop", "Exits the loop entirely", "Pauses execution"],
correct: 2,
explanation: "break immediately terminates the loop and transfers control outside it."
},
{
topic: "fundamentals",
question: "What is the output of bool(0)?",
options: ["True", "False", "0", "Error"],
correct: 1,
explanation: "0 is falsy in Python, so bool(0) evaluates to False."
},
{
topic: "fundamentals",
question: "Which operator is used for exponentiation in Python?",
options: ["^", "**", "exp()", "//"],
correct: 1,
explanation: "** is the exponentiation operator. 2**3 gives 8."
},
{
topic: "fundamentals",
question: "What is the index of the last element in a list of 5 items?",
options: ["5", "4", "-1 only", "0"],
correct: 1,
explanation: "Indexing starts at 0, so the last element of 5 items is at index 4."
},
{
topic: "fundamentals",
question: "What does 'continue' do inside a loop?",
options: ["Breaks the loop", "Skips the rest of the current iteration", "Restarts the program", "Returns a value"],
correct: 1,
explanation: "continue skips the remaining code in the current iteration and moves to the next."
},
{
topic: "fundamentals",
question: "Which of these is the correct way to write a single-line comment in Python?",
options: ["// comment", "/* comment */", "# comment", "-- comment"],
correct: 2,
explanation: "Python uses # for single-line comments."
},
{
topic: "fundamentals",
question: "What does the 'return' statement do in a function?",
options: ["Prints a value", "Exits the program", "Sends a value back to the caller", "Loops back"],
correct: 2,
explanation: "return sends the specified value back to wherever the function was called."
},
{
topic: "fundamentals",
question: "What is a tuple in Python?",
options: ["Mutable ordered collection", "Immutable ordered collection", "Key-value store", "Unordered unique set"],
correct: 1,
explanation: "Tuples are immutable, meaning their values cannot be changed after creation."
},
{
topic: "fundamentals",
question: "How do you open a file for reading in Python?",
options: ["open('file.txt', 'w')", "open('file.txt', 'r')", "open('file.txt', 'a')", "read('file.txt')"],
correct: 1,
explanation: "'r' mode opens a file for reading. It is also the default mode."
},
{
topic: "fundamentals",
question: "Which built-in function converts a string to an integer?",
options: ["str()", "float()", "int()", "num()"],
correct: 2,
explanation: "int() converts a valid string or float to an integer."
},
{
topic: "fundamentals",
question: "What is the output of list(range(3))?",
options: ["[1, 2, 3]", "[0, 1, 2]", "[0, 1, 2, 3]", "[1, 2]"],
correct: 1,
explanation: "range(3) generates 0, 1, 2 — it stops before the given number."
},
{
topic: "fundamentals",
question: "Which keyword is used to handle exceptions in Python?",
options: ["catch", "handle", "except", "error"],
correct: 2,
explanation: "Python uses try-except blocks to handle exceptions."
},
{
topic: "fundamentals",
question: "What does OOP stand for?",
options: ["Object Oriented Programming", "Open Origin Protocol", "Optional Output Process", "None"],
correct: 0,
explanation: "OOP stands for Object Oriented Programming — a paradigm based on objects and classes."
},
{
topic: "fundamentals",
question: "Which keyword creates a class in Python?",
options: ["object", "define", "class", "new"],
correct: 2,
explanation: "The 'class' keyword is used to define a class in Python."
},
{
topic: "fundamentals",
question: "What is the purpose of __init__ in a class?",
options: ["Destroy the object", "Initialize object attributes", "Define class methods", "Import modules"],
correct: 1,
explanation: "__init__ is the constructor method called when an object is created."
},
{
topic: "fundamentals",
question: "Which concept allows a child class to inherit properties from a parent class?",
options: ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"],
correct: 2,
explanation: "Inheritance lets a subclass reuse and extend the behavior of a parent class."
},
{
topic: "fundamentals",
question: "What is a dictionary key-value pair accessed with?",
options: ["Index", "Key", "Pointer", "Offset"],
correct: 1,
explanation: "Dictionary values are accessed using their associated keys."
},
{
topic: "fundamentals",
question: "Which of the following will raise a ZeroDivisionError?",
options: ["10 / 2", "10 % 3", "10 // 0", "10 ** 0"],
correct: 2,
explanation: "Dividing by zero with // raises a ZeroDivisionError in Python."
},
{
topic: "fundamentals",
question: "What does the 'pass' statement do?",
options: ["Skips the function", "Acts as a placeholder and does nothing", "Exits the loop", "Returns None"],
correct: 1,
explanation: "pass is a null operation used as a placeholder where code is syntactically required."
},
{
topic: "fundamentals",
question: "Which method adds an element to the end of a list?",
options: ["add()", "insert()", "append()", "push()"],
correct: 2,
explanation: "append() adds a single element to the end of a list."
},
{
topic: "fundamentals",
question: "What is the result of 'Hello' + ' ' + 'World'?",
options: ["HelloWorld", "Hello World", "Error", "'Hello' 'World'"],
correct: 1,
explanation: "The + operator concatenates strings in Python."
},
{
topic: "fundamentals",
question: "Which of the following checks if a key exists in a dictionary?",
options: ["key in dict", "dict.has(key)", "dict.exists(key)", "find(key, dict)"],
correct: 0,
explanation: "The 'in' operator checks for key membership in a dictionary."
},
{
topic: "fundamentals",
question: "What is recursion?",
options: ["A loop", "A function calling itself", "An import statement", "A class method"],
correct: 1,
explanation: "Recursion is when a function calls itself to solve a smaller subproblem."
}



];

async function seedDB() {
  await Quiz.deleteMany({});
  await Quiz.insertMany(data);
  console.log("Database seeded");
}

seedDB();