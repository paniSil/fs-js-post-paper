import Article from '../../models/Article.mjs';
import User from '../../models/User.mjs';

const getArticlesHandler = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let query = Article.find({});

    if (req.query.sort) {
      try {
        const sortObj = JSON.parse(req.query.sort);
        query = query.sort(sortObj);
      } catch (e) {
        console.error('Sort parse error:', e);
        return res.status(400).json({ message: 'Invalid sort parameter' });
      }
    }

    query = query.skip(skip).limit(limit);

    const articles = await query.exec();
    const totalCount = await Article.countDocuments({});
    const hasMore = skip + articles.length < totalCount;

    const isApiRequest =
      req.path.includes('/api/') ||
      req.headers.accept?.includes('application/json');

    if (isApiRequest) {
      return res.status(200).json({
        articles,
        pagination: {
          page,
          limit,
          totalCount,
          hasMore
        }
      });
    } else {
      const title = 'Articles List';
      const theme = req.cookies?.theme || 'light';
      return res.render('articles.ejs', {
        title,
        articles,
        pagination: {
          page,
          limit,
          totalCount,
          hasMore
        },
        theme,
        user: req.user
      });
    }
  } catch (error) {
    console.error('Error getting articles:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

const getArticleStatsHandler = async (req, res) => {
  try {

    const pipeline = [
      {
        $group: { _id: { $year: "$createdAt" }, totalArticles: { $sum: 1 } }
      },
      {
        $sort: { _id: 1 }
      }
    ]
    const stats = await Article.aggregate(pipeline).exec();

    res.status(200).json({
      message: 'Article stats by year',
      data: stats
    });
  } catch (error) {
    console.error('Error while retrieving article stats', error);
    res.status(500).json({ message: 'Server error' });
  }
}

const getUserArticlesHandler = async (req, res) => {
  console.log('getUserArticlesHandler called', req.params);
  const userId = req.params.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const articles = await Article.find({
      _id: { $in: user.articles }
    })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalUserArticles = user.articles.length;
    const hasMore = (page * limit) < totalUserArticles;

    res.status(200).json({
      articles,
      pagination: {
        page,
        limit,
        totalCount: totalUserArticles,
        hasMore
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { getArticlesHandler, getArticleStatsHandler, getUserArticlesHandler }