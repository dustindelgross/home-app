import { NextApiHandler, NextApiResponse } from 'next';
import { usersRepo } from 'helpers/users-repo';
const bcrypt = require('bcrypt');

export default function handler(req, res) {
    // split out password from user details 
    const { password, ...user } = req.body;

    // validate
    if (usersRepo.find(x => x.username === user.username))
        throw `User with the username "${user.username}" already exists`;

    // hash password
    user.hash = bcrypt.hashSync(password, 10);    

    usersRepo.create(user);
    return res.status(200).json({});
}