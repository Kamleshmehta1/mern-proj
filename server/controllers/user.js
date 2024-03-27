import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/middlewares.js';
import users from '../models/users.js';
import { uploadOnCloudinary } from '../services/cloudinary.js';
import refreshSchema from '../models/refreshToken.js';

dotenv.config();

export async function getUserInfo(req, res) {
  let response;
  try {
    response = await users.findOne({
      email: req?.user?.email,
    });
  } catch (error) {
    return res.status(400).send({ message: error?.message });
  }

  try {
    const { email, name, profileImage } = response;

    return res.status(200).send({ data: { email, name, profileImage } });
  } catch (error) {
    return res.status(403).send({ message: error?.message });
  }
}

export async function handleLogin(req, res) {
  const { email, password } = req.body;

  let response;
  try {
    response = await users.findOne({
      email,
    });
  } catch (error) {
    return res.status(400).send({
      message: error?.message,
    });
  }

  if (!response?.email) {
    return res.status(400).send({
      message: 'Email id  not found!',
    });
  }

  const isMatch = await bcrypt.compare(password, response?.password);

  if (!isMatch) {
    return res.status(401).send({
      message: 'Invalid password',
    });
  }

  const user = { email };

  try {
    await refreshSchema.deleteOne({
      email,
    });
  } catch (error) {
    return res.status(400).send({
      message: error?.message,
    });
  }

  try {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    try {
      await refreshSchema.create({
        email,
        token: refreshToken,
      });
    } catch (error) {
      return res.status(400).send({
        message: error?.message,
      });
    }

    res.cookie('accessToken', accessToken, {
      httpOnly: false,
      maxAge: +process.env.ACCESS_TOKEN_EXPIRE_TIME,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      maxAge: +process.env.REFRESH_TOKEN_EXPIRE_TIME,
    });
    return res
      .status(200)
      .send({ status: 200, message: 'Login successfully!' });
  } catch (error) {
    return res.status(400).send({
      message: error?.message,
    });
  }
}
export async function handleSignUp(req, res) {
  const { email, password, confirmPassword, name, profileImage } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send({
      message: "Password doesn't match",
    });
  }

  let response;
  try {
    response = await users.findOne({
      email,
      name,
    });
  } catch (error) {
    return res.status(400).send({
      message: error?.message,
    });
  }

  let imageResponse;

  if (response?.name && name && response?.name === name) {
    return res.status(400).send({
      message: 'User name already exists!',
    });
  }

  if (response?.email && email && response?.email === email) {
    return res.status(400).send({
      message: 'Email already exists!',
    });
  }
  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 13);
  } else {
    return res.status(400).send({
      status: 200,
      message: 'Kindly enter password!',
    });
  }

  if (req.file.path) {
    try {
      imageResponse = await uploadOnCloudinary(req.file.path);
    } catch (error) {
      return res.status(200).send({ message: error?.message });
    }
  }

  try {
    await users.create({
      name,
      email,
      password: hashedPassword,
      profileImage: imageResponse?.url,
    });
    return res.status(200).send({
      status: 200,
      message: 'Sign up successfully!',
    });
  } catch (error) {
    return res.status(400).send({
      message: error?.message,
    });
  }
}

export async function handleRefreshToken(req, res) {
  const refreshToken = req?.cookies?.refreshToken;

  if (!refreshToken)
    return res.status(400).send({ message: 'Refresh token expired!' });

  let refreshResponse;
  try {
    refreshResponse = await refreshSchema.findOne({
      email: req?.user?.email,
    });
  } catch (error) {
    return res.status(400).send({
      message: error?.message,
    });
  }

  if (refreshResponse?.email !== req?.user?.email)
    return res.status(403).send({ message: 'Refresh token not found !' });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    if (err) return res.sendStatus(403);
    const user = { email: data?.email };
    const accessToken = generateAccessToken(user);
    res.cookie('accessToken', accessToken, {
      httpOnly: false,
      maxAge: +process.env.ACCESS_TOKEN_EXPIRE_TIME,
    });
    return res.json({ status: 200, message: 'Authenticated!' });
  });
}

export async function handleUserSearch(req, res) {
  let response;

  try {
    if (!req?.params?.email || !req?.params?.name) {
      response = await users.aggregate([{ $limit: 10 }]);
    } else {
      const { email, name } = req?.params;

      response = await users.aggregate([
        {
          $match: {
            $or: {
              email: { $regex: email, $options: 'i' },
              name: { $regex: name, $options: 'i' },
            },
          },
        },
        {
          $limit: 10,
        },
      ]);
    }

    return res.status(200).send({ data: response });
  } catch (error) {
    return res.status(400).send({
      message: error?.message,
    });
  }
}
