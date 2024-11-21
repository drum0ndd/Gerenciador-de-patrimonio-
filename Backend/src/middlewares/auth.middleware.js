import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const authMiddleware = (req, res, next) => {
    try{ 
            const {authorization} = req.headers;
    
        if (!authorization) {
            return res.send(401);
        }

        const parts = authorization.split(" ");
        

        const [scheme, token] = parts;

        if (parts.length !== 2) {
            return res.status(401).send({ message: "não autorizado" });
        }

        if (scheme !== "Bearer") {
            return res.status(401).send({ message: "não autorizado" }); 
        }

        jwt.verify(token, process.env.SECRET_JWT, (error, decoded) => {
            if (error) {
                return res.status(401).send({ message: "Token inválido" });
            }

        });
    } catch (error) {
        res.status (500).send(err.message);
    }
        next();
}
