export const checkAuthHandler = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        res.status(200).json({ user: req.user });
    } catch (error) {
        console.error('Check auth error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};