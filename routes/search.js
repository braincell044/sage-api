// GET /api/search?query=...

router.get('/search', async (req, res) => {
    const courses = await Course.find({ title: new RegExp(req.query.query, 'i') });
    res.json(courses);
  });
  