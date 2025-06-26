import User from '../../models/User.mjs';

const getUsersHandler = async (req, res) => {
  try {
    const users = await User.find({}).lean();

    const theme = req.cookies.theme || 'light';
    if (req.path === '/api' || (req.headers.accept && req.headers.accept.includes('application/json'))) {
      res.status(200).json({ users });
    } else {
      res.render('users.pug', { users: users, theme: theme, user: req.user });
    }
  } catch (error) {
    console.error('Error: get user list', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export { getUsersHandler }
