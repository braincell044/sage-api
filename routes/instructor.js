// POST /api/instructor/upload
router.post('/instructor/upload', instructorMiddleware, upload.single('file'), async (req, res) => {
  // Upload file logic (e.g., Cloudinary or local)
  res.json({ url: req.file.path });
});
