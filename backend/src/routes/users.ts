import { Router } from "express";
import { Prisma } from "@prisma/client";

import {
  hashPassword,
  passwordValidationMessage,
  validatePassword,
} from "../lib/password.js";
import { prisma } from "../lib/prisma.js";
import { formatUser, validateEmail, validatePhone } from "../lib/userFormat.js";

export const usersRouter = Router();

type UserBody = {
  email?: string;
  phone?: string;
  password?: string;
};

function parseUserId(raw: string): number | null {
  const id = Number.parseInt(raw, 10);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function handlePrismaError(error: unknown, res: import("express").Response) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return res.status(409).json({ detail: "Este e-mail já está cadastrado." });
    }
    if (error.code === "P2025") {
      return res.status(404).json({ detail: "Usuário não encontrado." });
    }
  }

  console.error(error);
  return res.status(500).json({ detail: "Erro interno ao processar a solicitação." });
}

usersRouter.get("/", async (_req, res) => {
  try {
    const users = await prisma.user.findMany({ orderBy: { id: "asc" } });
    res.json(users.map(formatUser));
  } catch (error) {
    handlePrismaError(error, res);
  }
});

usersRouter.get("/:id", async (req, res) => {
  const id = parseUserId(req.params.id);
  if (!id) {
    return res.status(400).json({ detail: "ID inválido." });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ detail: "Usuário não encontrado." });
    }
    res.json(formatUser(user));
  } catch (error) {
    handlePrismaError(error, res);
  }
});

usersRouter.post("/", async (req, res) => {
  const body = req.body as UserBody;
  const email = validateEmail(body.email);
  const phone = validatePhone(body.phone);
  const password = validatePassword(body.password);

  if (!email) {
    return res.status(400).json({ detail: "Informe um e-mail válido." });
  }
  if (!phone) {
    return res
      .status(400)
      .json({ detail: "Informe um número de contato válido (10 a 15 dígitos)." });
  }
  if (!password) {
    return res.status(400).json({ detail: passwordValidationMessage() });
  }

  try {
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, phone, passwordHash },
    });
    res.status(201).json(formatUser(user));
  } catch (error) {
    handlePrismaError(error, res);
  }
});

usersRouter.put("/:id", async (req, res) => {
  const id = parseUserId(req.params.id);
  if (!id) {
    return res.status(400).json({ detail: "ID inválido." });
  }

  const body = req.body as UserBody;
  const data: Prisma.UserUpdateInput = {};

  if (body.email !== undefined) {
    const email = validateEmail(body.email);
    if (!email) {
      return res.status(400).json({ detail: "Informe um e-mail válido." });
    }
    data.email = email;
  }

  if (body.phone !== undefined) {
    const phone = validatePhone(body.phone);
    if (!phone) {
      return res
        .status(400)
        .json({ detail: "Informe um número de contato válido (10 a 15 dígitos)." });
    }
    data.phone = phone;
  }

  if (body.password !== undefined) {
    const password = validatePassword(body.password);
    if (!password) {
      return res.status(400).json({ detail: passwordValidationMessage() });
    }
    data.passwordHash = await hashPassword(password);
  }

  if (Object.keys(data).length === 0) {
    return res.status(400).json({ detail: "Nenhum campo para atualizar." });
  }

  try {
    const user = await prisma.user.update({ where: { id }, data });
    res.json(formatUser(user));
  } catch (error) {
    handlePrismaError(error, res);
  }
});

usersRouter.delete("/:id", async (req, res) => {
  const id = parseUserId(req.params.id);
  if (!id) {
    return res.status(400).json({ detail: "ID inválido." });
  }

  try {
    await prisma.user.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    handlePrismaError(error, res);
  }
});
