import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import AddQuiz from "./components/AddQuiz";
import AddQuestion from "./components/AddQuestion";
import QuizList from "./components/QuizList";
import Entry from "./components/Entry";
import StudentLogin from "./components/StudentLogin";
import StudentSignup from "./components/StudentSignup";
import Dashboard from "./components/Dashboard";
import QuizQuestion from './components/QuizQuestions'
import QuizQuestions from "./components/QuizQuestions";

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Entry />} />
                    <Route path="/login" element={<Login />} />

                     {/* Admin panel  */}e
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/studentlogin" element={<StudentLogin/>}/>
                    <Route path="/studentsignup" element={<StudentSignup/>}/>
                    <Route path="/quiz/questions" element={<QuizQuestions />} />
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    
                    {/* Route for adding a quiz */}
                    <Route path="/add-quiz" element={<AddQuiz />} />

                    <Route path="/quiz-list" element={<QuizList />} />
                    <Route path="/add-question/:quizId" element={<AddQuestion />} />

                    {/* Route for adding questions */}
                    <Route path="/add-question" element={<AddQuestion />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
