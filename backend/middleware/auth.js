import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized user" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        req.body.role = decoded.role;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized user" });
    }
};

const authenticateRole = (req, res, next) => {
    const { token} = req.headers;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized user" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "admin") {
            return res.status(401).json({ message: "Unauthorized user" });
        }
        req.body.userId = decoded.id;
        req.body.role = decoded.role;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized user" });
    }
}

export { authenticateUser, authenticateRole };