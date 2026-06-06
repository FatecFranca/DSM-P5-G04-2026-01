import { FormEvent, useState } from "react";

import { loginUser } from "../services/users";
import type { User } from "../types/user";
import "./AccountRegister.css";

type AccountLoginProps = {
  onBack: () => void;
  onGoRegister: () => void;
  onSuccess?: (user: User) => void;
};

export function AccountLogin({ onBack, onGoRegister, onSuccess }: AccountLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const user = await loginUser({ email, password });
      onSuccess?.(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao entrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="account-section">
      <div className="account-card">
        <span className="account-badge">Acesso</span>
        <h1>Entrar</h1>
        <p>Use o e-mail e a senha cadastrados para acessar sua conta.</p>

        <form className="account-form" onSubmit={handleSubmit}>
          <label className="account-field">
            <span>E-mail</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="voce@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label className="account-field">
            <span>Senha</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Sua senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={6}
              required
            />
          </label>

          {error ? <p className="account-error">{error}</p> : null}

          <div className="account-actions">
            <button type="button" className="btn btn-outline" onClick={onBack} disabled={loading}>
              Voltar
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Entrando…" : "Entrar"}
            </button>
          </div>
        </form>

        <p className="account-switch">
          Ainda não tem conta?{" "}
          <button type="button" className="account-switch-btn" onClick={onGoRegister}>
            Criar conta
          </button>
        </p>
      </div>
    </section>
  );
}
