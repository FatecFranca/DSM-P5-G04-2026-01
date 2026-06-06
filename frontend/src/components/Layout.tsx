import type { ReactNode } from "react";
import { APP_NAME } from "../constants/brand";

type View = "landing" | "account" | "login" | "questionnaire" | "result";

type LayoutProps = {
  children: ReactNode;
  currentView: View;
  hasAccount: boolean;
  userEmail?: string;
  onGoHome: () => void;
  onGoQuestionnaire: () => void;
  onGoAccount: () => void;
  onGoLogin: () => void;
  onLogout: () => void;
};

export function Layout({
  children,
  currentView,
  hasAccount,
  userEmail,
  onGoHome,
  onGoQuestionnaire,
  onGoAccount,
  onGoLogin,
  onLogout,
}: LayoutProps) {
  return (
    <div className="page">
      <header className="header">
        <button type="button" className="logo-btn" onClick={onGoHome}>
          <img src="/logo.png" alt={APP_NAME} className="logo-img" />
          <span className="logo-text">{APP_NAME}</span>
        </button>
        <nav className="nav">
          {currentView === "landing" ? (
            <>
              <a href="#sobre">Sobre</a>
              <a href="#como-funciona">Como funciona</a>
            </>
          ) : null}
          {!hasAccount ? (
            <>
              <button
                type="button"
                className={`nav-btn ${currentView === "login" ? "nav-btn-active" : ""}`}
                onClick={onGoLogin}
              >
                Entrar
              </button>
              <button
                type="button"
                className={`nav-btn ${currentView === "account" ? "nav-btn-active" : ""}`}
                onClick={onGoAccount}
              >
                Criar conta
              </button>
            </>
          ) : (
            <>
              {userEmail ? (
                <span className="nav-user" title={userEmail}>
                  {userEmail}
                </span>
              ) : null}
              <button type="button" className="nav-btn nav-btn-logout" onClick={onLogout}>
                Sair
              </button>
            </>
          )}
          <button
            type="button"
            className={`nav-btn ${currentView === "questionnaire" || currentView === "result" ? "nav-btn-active" : ""}`}
            onClick={onGoQuestionnaire}
          >
            Questionário
          </button>
        </nav>
      </header>

      {children}

      <footer className="footer">
        <p>{APP_NAME} · PI5 · feito com carinho para informar, não para diagnosticar</p>
      </footer>
    </div>
  );
}
