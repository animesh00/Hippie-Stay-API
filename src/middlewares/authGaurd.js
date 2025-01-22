import jwt from 'jsonwebtoken';

export const authGuard = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ success: false, message: "Authorization header not found!" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "Token not found!" });
    }

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedUser;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token expired!" });
        }
        res.status(401).json({ success: false, message: "Invalid token!" });
    }
};

export const adminGuard = (req, res, next) => {
    console.log("Req user: ", req.user)
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ success: false, message: "Access denied. Admins only!" });
    }
    next();
};


