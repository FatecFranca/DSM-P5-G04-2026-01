import { FormEvent, useState } from "react";

import { createUser } from "../services/users";
import type { User } from "../types/user";
import { maskPhone } from "../utils/phoneMask";
import "./AccountRegister.css";

const MIN_PASSWORD_LENGTH = 6;

type AccountRegisterProps = {
  onBack: () => void;
  onGoLogin: () => void;
  onSuccess?: (user: User) => void;
};

export function AccountRegister({ onBack, onGoLogin, onSuccess }: AccountRegisterProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdUser, setCreatedUser] = useState<User | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`);
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const user = await createUser({ email, phone, password });
      setCreatedUser(user);
      onSuccess?.(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  };

  if (createdUser) {
    return (
      <section className="account-section">
        <div className="account-card account-card-success">
          <span className="account-badge">Conta criada</span>
          <h1>Tudo certo!</h1>
          <p>
            Sua conta foi registrada com o e-mail <strong>{createdUser.email}</strong>.
            Agora você pode seguir para o questionário quando quiser.
          </p>
          <div className="account-actions">
            <button type="button" className="btn btn-primary" onClick={onBack}>
              Voltar ao início
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="account-section">
      <div className="account-card">
        <span className="account-badge">Cadastro</span>
        <h1>Criar conta</h1>
        <p>
          Informe seu e-mail, telefone e uma senha. Usamos esses dados apenas para
          identificar sua participação no projeto.
        </p>

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
            <span>Número para contato</span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="numeric"
              placeholder="(11) 99999-9999"
              maxLength={15}
              value={phone}
              onChange={(event) => setPhone(maskPhone(event.target.value))}
              required
            />
          </label>

          <label className="account-field">
            <span>Senha</span>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={MIN_PASSWORD_LENGTH}
              required
            />
          </label>

          <label className="account-field">
            <span>Confirmar senha</span>
            <input
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              placeholder="Repita a senha"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              minLength={MIN_PASSWORD_LENGTH}
              required
            />
          </label>

          {error ? <p className="account-error">{error}</p> : null}

          <div className="account-actions">
            <button type="button" className="btn btn-outline" onClick={onBack} disabled={loading}>
              Voltar
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Salvando…" : "Criar conta"}
            </button>
          </div>
        </form>

        <p className="account-switch">
          Já tem conta?{" "}
          <button type="button" className="account-switch-btn" onClick={onGoLogin}>
            Entrar
          </button>
        </p>
      </div>
    </section>
  );
}
