export const isStudent = (req, res, next) => {
    if (req.user.role === 'student') return next();
    return res.status(403).json({ message: 'Access denied. Students only.' });
};

export const isInstructor = (req, res, next) => {
    if (req.user.role === 'instructor') return next();
    return res.status(403).json({ message: 'Access denied. Instructors only.' });
};

export const isAdmin = (req, res, next) => {
    if (req.user.role === 'admin') return next();
    return res.status(403).json({ message: 'Access denied. Admins only.' });
};

export const isInstructorOrAdmin = (req, res, next) => {
    if (req.user.role === 'instructor' || req.user.role === 'admin') return next();
    return res.status(403).json({ message: 'Access denied. Instructor or Admin only.' });
};
