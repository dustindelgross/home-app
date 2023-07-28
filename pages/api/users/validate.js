import { NextApiHandler, NextApiResponse } from 'next';
import { usersRepo } from 'helpers/users-repo';
const bcrypt = require('bcrypt');

export default function handler(req, res) {
    // split out password from user details 
    const { username, password } = req.body;
    const user = usersRepo.find(x => x.username === username);

    if (!user) {
        // User with the provided username doesn't exist
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatches = bcrypt.compareSync(password, user.hash);
    if (!passwordMatches) {
        // Invalid password
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const {hash, ...userObj } = user;
    // Password matches, user is authenticated
  return res.status(200).json(userObj);

}