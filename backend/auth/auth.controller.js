const User = require('./auth.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SIGNUP
exports.signup = async (req, res) => {
  const { name, email, dob, password, confirmPassword } = req.body;

  if (!name || !email || !dob || !password || !confirmPassword)
    return res.status(400).json({ msg: 'Please fill all fields' });

  if (password !== confirmPassword)
    return res.status(400).json({ msg: 'Passwords do not match' });

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      dob,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        dob: newUser.dob,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: 'Please provide email and password' });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: 'Invalid password' });

    // Check if admin
    const isAdmin = user.email === 'anshpvt04@gmail.com';

    const token = jwt.sign(
      { id: user._id, isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        dob: user.dob,
        isAdmin,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

