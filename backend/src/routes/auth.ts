import { Router } from "express";

import { passwordValidationMessage, validatePassword, verifyPassword } from "../lib/password.js";
import { formatUser, validateEmail } from "../lib/userFormat.js";
import { prisma } from "../lib/prisma.js";

export const authRouter = Router();

type LoginBody = {
  email?: string;
  password?: string;
};

authRouter.post("/login", async (req, res) => {
  const body = req.body as LoginBody;
  const email = validateEmail(body.email);
  const password = validatePassword(body.password);

  if (!email) {
    return res.status(400).json({ detail: "Informe um e-mail válido." });
  }
  if (!password) {
    return res.status(400).json({ detail: passwordValidationMessage() });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return res.status(401).json({ detail: "E-mail ou senha incorretos." });
    }

    res.json(formatUser(user));
  } catch (error) {
    console.error(error);
    res.status(500).json({ detail: "Erro interno ao processar a solicitação." });
  }
});
