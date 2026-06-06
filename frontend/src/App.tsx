import { useEffect, useState } from "react";
import { AccountLogin } from "./components/AccountLogin";
import { AccountRegister } from "./components/AccountRegister";
import { AnalysisLoading } from "./components/AnalysisLoading";
import { Layout } from "./components/Layout";
import { LandingPage } from "./components/LandingPage";
import { Questionnaire } from "./components/Questionnaire";
import { ResultView } from "./components/ResultView";
import { fetchHealth } from "./services/api";
import type { PredictPayload, PredictResponse } from "./types/predict";
import type { User } from "./types/user";
import {
  clearStoredUser,
  loadStoredUser,
  saveStoredUser,
} from "./utils/accountSession";
import "./App.css";

type View = "landing" | "account" | "login" | "questionnaire" | "analyzing" | "result";

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [pendingPayload, setPendingPayload] = useState<PredictPayload | null>(null);
  const [questionnaireError, setQuestionnaireError] = useState<string | null>(null);
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(() => loadStoredUser());
  const hasAccount = currentUser !== null;

  useEffect(() => {
    fetchHealth()
      .then((data) => {
        setApiOnline(true);
        setModelLoaded(data.model_loaded);
      })
      .catch(() => setApiOnline(false));
  }, []);

  useEffect(() => {
    if ((view === "account" || view === "login") && hasAccount) {
      setView("landing");
    }
  }, [view, hasAccount]);

  const goHome = () => {
    setView("landing");
    setResult(null);
    setPendingPayload(null);
  };

  const goQuestionnaire = () => {
    setView("questionnaire");
    setResult(null);
    setPendingPayload(null);
    setQuestionnaireError(null);
  };

  const goAccount = () => {
    if (hasAccount) return;
    setView("account");
    setResult(null);
    setPendingPayload(null);
    setQuestionnaireError(null);
  };

  const goLogin = () => {
    if (hasAccount) return;
    setView("login");
    setResult(null);
    setPendingPayload(null);
    setQuestionnaireError(null);
  };

  const handleAuthSuccess = (user: User) => {
    saveStoredUser(user);
    setCurrentUser(user);
    setView("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    clearStoredUser();
    setCurrentUser(null);
    setView("landing");
    setResult(null);
    setPendingPayload(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAnalyze = (payload: PredictPayload) => {
    setQuestionnaireError(null);
    setPendingPayload(payload);
    setView("analyzing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResult = (data: PredictResponse) => {
    setResult(data);
    setPendingPayload(null);
    setView("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAnalyzeError = (message: string) => {
    setPendingPayload(null);
    setQuestionnaireError(message);
    setView("questionnaire");
  };

  return (
    <Layout
      currentView={view === "analyzing" ? "questionnaire" : view}
      hasAccount={hasAccount}
      userEmail={currentUser?.email}
      onGoHome={goHome}
      onGoQuestionnaire={goQuestionnaire}
      onGoAccount={goAccount}
      onGoLogin={goLogin}
      onLogout={handleLogout}
    >
      {view === "landing" && (
        <LandingPage
          apiOnline={apiOnline}
          modelLoaded={modelLoaded}
          hasAccount={hasAccount}
          onStartQuestionnaire={goQuestionnaire}
          onCreateAccount={goAccount}
          onLogin={goLogin}
        />
      )}

      {view === "account" && !hasAccount && (
        <AccountRegister
          onBack={goHome}
          onGoLogin={goLogin}
          onSuccess={handleAuthSuccess}
        />
      )}

      {view === "login" && !hasAccount && (
        <AccountLogin
          onBack={goHome}
          onGoRegister={goAccount}
          onSuccess={handleAuthSuccess}
        />
      )}

      {view === "questionnaire" && (
        <Questionnaire
          apiOnline={apiOnline}
          modelLoaded={modelLoaded}
          onAnalyze={handleAnalyze}
          onBack={goHome}
          externalError={questionnaireError}
        />
      )}

      {view === "analyzing" && pendingPayload && (
        <AnalysisLoading
          payload={pendingPayload}
          onComplete={handleResult}
          onError={handleAnalyzeError}
        />
      )}

      {view === "result" && result && (
        <ResultView
          result={result}
          onRetry={goQuestionnaire}
          onHome={goHome}
        />
      )}
    </Layout>
  );
}
