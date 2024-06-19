// pages/api/auth/register.ts

import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { hash } from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password, name } = req.body;

  const hashedPassword = await hash(password, 10);

  try {
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "User already exists" });
  }
}
