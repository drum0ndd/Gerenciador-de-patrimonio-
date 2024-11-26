import dotenv from 'dotenv';
import userService from '../services/user.service.js';
import jwt from 'jsonwebtoken';

dotenv.config();

export const authMiddleware = (req, res, next) => {
    try{ 
            const {authorization} = req.headers;
    
        if (!authorization) {
            return res.send(401);
        }

        const parts = authorization.split(" ");
        

        const [scheme, TOKEN] = parts;

        if (parts.length !== 2) {
            return res.status(401).send({ message: "não autorizado" });
        }

        if (scheme !== "Bearer") {
            return res.status(401).send({ message: "não autorizado" }); 
        }

        jwt.verify(TOKEN, process.env.SECRET_JWT, async (error, decoded) => {
            if (error) {
                return res.status(401).send({ message: "Token inválido" });
            }
            const user = await userService.findByIdService(decoded.id);

            if (!user || !user.id) {
                return res.status(404).send({ message: "invalid token!" });
            }    
            


            req.userId = decoded.id;
            req.user = user; // Anexa o usuário para facilitar nos controladores
            next();
        });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

export default authMiddleware;