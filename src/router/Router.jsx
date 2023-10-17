import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import QuizResults from "../pages/mainQuiz/QuizResults";

// Import React components
import NotFound from "../pages/NotFound";
import InfantQuizHome from "../pages/infantQuiz/HomePage";
import MainQuizHome from "../pages/mainQuiz/MainQuizHome";
import CreateFact from "../pages/infantQuiz/InfantFact";
import InfantQuiz from "../pages/infantQuiz/InfantQuiz";
import Home from "../pages/Home";
import QuizPage from "../pages/mainQuiz/QuizPage";
import SightedText from "../pages/vision Tests/sighted-test/SightedText";
import FarSightedTestView from "../pages/vision Tests/sighted-test/FarSightedTestView";
import NearSightedTestView from "../pages/vision Tests/sighted-test/NearSightedTestView";
import AyurvedicHome from "../pages/ayurvedicHome/AyurvedicHome";
import AyurvedicTreatments from "../pages/ayurvedicHome/AyurvedicTreatments";
import Treatment from "../pages/ayurvedicHome/Treatment";
import VideoTutorials from "../pages/ayurvedicHome/VideoTutorials";
import AyurvedicVideo from "../pages/ayurvedicHome/AyurvedicVideo";
import DoctorContactHome from "../pages/doctorContactHome/DoctorContactHome";
import DoctorList from "../pages/doctorContactHome/DoctorList";
import DoctorDetails from "../pages/doctorContactHome/DoctorDetails";
import Map from "../pages/doctorContactHome/Map";
import AllTestHome from "../pages/vision Tests/AllTestHome";
import ColorBlind from "../pages/vision Tests/ColorBlind";
import ContrastSensitivity from "../pages/vision Tests/ContrastSensitivity";
import DepthPrecision from "../pages/vision Tests/DepthPrecision";
import MacularDegeneration from "../pages/vision Tests/MacularDegeneration";
import SightPass from "../pages/vision Tests/sighted-test/EyeSightedPass";
import SightFail from "../pages/vision Tests/sighted-test/EyeSightedFail";
import AddTextForm from "../pages/vision Tests/sighted-test/AddTextForm";
import NearSightedTextResult from "../pages/vision Tests/sighted-test/NearSightedResult";
import Questionnaire from "../pages/infantQuiz/Questionnaire";
import CreateQuizQuestion from "../pages/infantQuiz/CreateQuiz";
import ViewQuiz from "../pages/infantQuiz/ViewQuiz";
import CreateQuiz from "../pages/mainQuiz/CreateQuiz";
import DoctorForm from "../pages/adminForms/DoctorForm";
import TreatmentForm from "../pages/adminForms/TreatmentForm";
import VideoTutorialForm from "../pages/adminForms/VideoTutorialForm";
import ViewQuestions from "../pages/mainQuiz/GetAllQuestions";
import UpdateQuiz from "../pages/mainQuiz/UpdateQuiz";
import ColorBlindTest from "../pages/vision Tests/inside tests/ColorBlindTest";
import MacularDegenerationTest from "../pages/vision Tests/inside tests/MacularDegenerationTest";
import AdminDoctorList from "../pages/adminForms/AdminDoctorList";
import UpdateDoctor from "../pages/adminForms/UpdateDoctor";
import AdminTreatmentList from "../pages/adminForms/AdminTreatmentList";
import UpdateTreatment from "../pages/adminForms/UpdateTreatment";
import AdminVideoTutorialList from "../pages/adminForms/AdminVideoTutorialList";
import UpdateVideoTutorial from "../pages/adminForms/UpdateVideoTutorial";
import AdminHome from "../pages/adminForms/AdminHome";

//import NearSighted from "../pages/sighted-test/SightedText";
import NearSightedTestInstructions from "../pages/vision Tests/sighted-test/NearSightedTestInstructions";
import NearSighted from "../pages/vision Tests/sighted-test/SightedText";
import GameHome from "../pages/games/GameHome";
import ColorVisonGame from "../pages/games/ColorVisonGame";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AuthContext } from "../context/authContext";

const Router = () => {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const admin = user?.isAdmin === true;

    if (!admin) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <Routes>
      {/* App routes*/}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Handle a 404 Not Found route */}
      <Route path="*" element={<NotFound />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminHome />
          </ProtectedRoute>
        }
      />
      {/* main Quiz */}
      <Route path="/main-quiz" element={<MainQuizHome />} />
      <Route path="/main-questions" element={<QuizPage />} />
      <Route
        path="/main-quiz-results/:finalPercentage"
        element={<QuizResults />}
      />
      <Route path="create-main-quiz" element={<CreateQuiz />} />
      <Route path="view-all-questions" element={<ViewQuestions />} />
      <Route path="update-main-quiz/:id" element={<UpdateQuiz />} />

      {/* eye tests home pages*/}

      <Route path="/test-home" element={<AllTestHome />} />
      <Route path="/color-blind" element={<ColorBlind />} />
      <Route path="/contrast-sensitvity" element={<ContrastSensitivity />} />
      <Route path="/depth-precision" element={<DepthPrecision />} />
      <Route path="/macular-degeneration" element={<MacularDegeneration />} />

      {/* eye tests */}
      <Route path="/color-blind-test" element={<ColorBlindTest />} />
      <Route
        path="/macular-degeneration-test"
        element={<MacularDegenerationTest />}
      />
      {/* games */}
      <Route path="/games" element={<GameHome />} />
      <Route path="/color-vision-game" element={<ColorVisonGame />} />

      {/* -----------sighted test Routes--------------------- */}
      <Route path="/far-sighted" element={<SightedText />} />
      <Route path="/test-view" element={<FarSightedTestView />} />

      {/* Infant Eye Care Home Page */}
      <Route path="/infant_eye_care" element={<InfantQuizHome />} />

      {/* Infant Eye Care Home Page */}
      <Route path="/infant_quiz" element={<InfantQuiz />} />

      {/* Infant Eye Care Home Page */}
      <Route path="/infant_questionnaire" element={<Questionnaire />} />

      {/* Infant Eye Care Home Page */}
      <Route path="/infant_facts" element={<CreateFact />} />

      {/* Infant Quiz Create Page */}
      <Route path="/infant_create_quiz" element={<CreateQuizQuestion />} />

      {/* Infant Quiz Manage Page */}
      <Route path="/infant_view_quiz" element={<ViewQuiz />} />

      {/* -----------sighted test Routes--------------------- */}
      <Route path="/near-sighted" element={<NearSighted />} />
      <Route path="/test-view" element={<NearSightedTestView />} />
      <Route path="/test-inst" element={<NearSightedTestInstructions />} />

      {/* Ayurvedic Home Page */}
      <Route path="/ayurvedic" element={<AyurvedicHome />} />

      {/* Ayurvedic Treatments Page */}
      <Route path="/ayurvedic/treatments" element={<AyurvedicTreatments />} />

      {/* Ayurvedic singale treatment Page */}
      <Route path="/treatment/:id" element={<Treatment />} />

      {/* Ayurvedic Video Tutorials Page */}
      <Route path="/ayurvedic/videoTutorials" element={<VideoTutorials />} />

      {/* Ayurvedic Video view Page */}
      <Route path="/view/:videoId" element={<AyurvedicVideo />} />

      {/* Doctor contact home Page */}
      <Route path="/doctorContact" element={<DoctorContactHome />} />

      {/* Doctor List Page */}
      <Route path="/doctorContact/doctorList" element={<DoctorList />} />

      {/* Doctor Page */}
      <Route path="/doctor/:email" element={<DoctorDetails />} />

      {/* Doctor map Page */}
      <Route path="/doctorContact/doctorMap" element={<Map />} />

      {/* Admin Treatment Update */}

      {/* Doctor Form */}
      <Route path="/doctorForm" element={<DoctorForm />} />

      {/* Treatment Form */}
      <Route path="/treatmentForm" element={<TreatmentForm />} />

      {/* Treatment Form */}
      <Route path="/videoTutorialForm" element={<VideoTutorialForm />} />

      {/* Admin Doctor List */}
      <Route path="/adminDoctorList" element={<AdminDoctorList />} />

      {/* Admin Doctor Update */}
      <Route path="/update-doctor/:email" element={<UpdateDoctor />} />

      {/* Admin Treatment List */}
      <Route path="/adminTreatmentList" element={<AdminTreatmentList />} />

      {/* Admin Treatment Update */}
      <Route path="/update-treatment/:id" element={<UpdateTreatment />} />

      {/* Admin VideoTutorial List */}
      <Route
        path="/adminTVideoTutorialList"
        element={<AdminVideoTutorialList />}
      />

      {/* Admin VideoTutorial Update */}
      <Route
        path="/update-video-tutorial/:id"
        element={<UpdateVideoTutorial />}
      />

      {/* -----------sighted test Routes--------------------- */}
      <Route path="/far-sighted" element={<SightedText />} />
      <Route path="/test-view" element={<FarSightedTestView />} />
      <Route path="/near-test-view" element={<NearSightedTestView />} />
      <Route path="/eye-sight-pass" element={<SightPass />} />
      <Route path="/eye-sight-fail" element={<SightFail />} />
      <Route path="/addText-form" element={<AddTextForm />} />
      <Route path="/near-sighted" element={<SightedText />} />
      <Route path="/near-sighted-result" element={<NearSightedTextResult />} />
    </Routes>
  );
};

export default Router;
