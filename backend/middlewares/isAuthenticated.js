import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers?.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false
            })
        };

        const decode =  jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        };

        req.id = decode.userId;
        next();

    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;

const isAdmin = (req, res, next) => {
    if (req.user?.role !== "admin" || !req.user?.isAdmin) {
        return res.status(403).json({
            message: "Access denied",
            success: false
        });
    }
    next();
};
