import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import { db } from "@/db";

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const hashedPassword = await hash(password, 10);

  try {
    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
}
