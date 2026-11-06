import express from "express";
import bcrypt from "bcryptjs";
import {randomUUID} from "crypto";
import { findByEmail, readUsers, writeUsers } from '../utils/db.js';
import {signToken} from '../utils/jwt.js';
import authenticate from '../middleware/authenticate.js';
import {blacklistToken} from '../utils/token-blacklist.js';
const router = express.Router();
export default router

router.post('/register', async (req,res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(400).json({ error:'Email and password are required'});
  }
  const existingUser = await findByEmail(email);
  if(existingUser) {
    return res.status(409).json({error: 'Email already in use'});
  }

const passwordHash = await bcrypt.hash(password, 10);

const newUser = {
  id:randomUUID(),
  email,
  passwordHash,
  role:'user'
}

const users = await readUsers();
users.push(newUser);
await writeUsers(users);

const token = signToken({
  id: newUser.id,
  email:newUser.email,
  role: newUser.role
})

return res.status(201).json({message: 'User registered successfully', token })

return res.status(201).json({message: 'User created successfully', user:{id:newUser.id,
  email:newUser.email, role: newUser.role
}});

});

router.post('/login', async (req,res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({error:'Email and password are required'});
  }
  const user = await findByEmail(email);
  if (!user) {
    return res.status(401).json({error: 'Invalid credentials'});
  }
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(401).json({error:'Invalid credentials'});
  }
  const token = signToken({
    id:user.id,
    email: user.email,
    role:user.role
  });
  return res.status(200).json({
    message:'Login successful', token
  });
});

router.post('/logout', authenticate, (req,res) => {
  const token = req.headers.authorization.split(' ')[1]
  blacklistToken(token);
  return res.status(200).json({message: 'Logged out successfully'});
});

router.get('/profile', authenticate, (req,res) => {
  return res.status(200).json({user:req.user})
});


