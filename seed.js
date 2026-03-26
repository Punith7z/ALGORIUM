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
}

];

async function seedDB() {
  await Quiz.deleteMany({});
  await Quiz.insertMany(data);
  console.log("Database seeded");
}

seedDB();