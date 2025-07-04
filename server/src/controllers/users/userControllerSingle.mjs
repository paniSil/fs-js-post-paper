import User from '../../models/User.mjs';

const postUserHandler = async (req, res) => {
    try {
        const { name, email, password, age, avatar } = req.body;

        const newUser = new User({
            name,
            email,
            password,
            createdAt: new Date(),
            updatedAt: new Date(),
            age,
            role: 'admin',
            resetToken: null,
            resetTokenExpiry: null,
            avatar,
            articles: [],
            paperclips: []
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            message: 'User created!',
            userId: savedUser._id,
            user: {
                _id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                age: savedUser.age,
                role: savedUser.role,
                avatar: savedUser.avatar
            }
        });
    } catch (error) {
        console.error('Error: post user error', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getUserByIdHandler = async (req, res) => {
    try {
        const userId = req.params.id;
        const userProfile = await User.findById(userId);
        const theme = req.cookies.theme || 'light';

        if (userProfile) {
            res.status(200).json({ user: userProfile });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error: get user by ID error', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const putUserByIdHandler = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, age, avatar, articleId, paperclips, password } = req.body;
        const updates = {};
        if (name) updates.name = name;
        if (email) updates.email = email;
        if (typeof age !== "undefined") updates.age = age;
        if (avatar) updates.avatar = avatar;
        updates.updatedAt = new Date();
        if (typeof paperclips !== "undefined") updates.paperclips = paperclips;
        updates.updatedAt = new Date();
        if (password) {
            const bcrypt = await import('bcrypt');
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(password, salt);
        }

        let updateQuery = { $set: updates };
        if (articleId) {
            updateQuery.$push = { articles: articleId };
        }

        if (
            Object.keys(updates).length === 1 &&
            !articleId
        ) {
            return res.status(400).json({ message: 'No update data' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateQuery,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: `User ${userId} is updated`, user: updatedUser });
    } catch (error) {
        console.error('Error: put user by ID error', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteUserByIdHandler = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await User.findByIdAndDelete(userId);

        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error: delete user by ID error', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export { postUserHandler, getUserByIdHandler, putUserByIdHandler, deleteUserByIdHandler }