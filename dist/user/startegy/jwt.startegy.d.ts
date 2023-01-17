import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
declare const JWTStrategy_base: new (...args: any[]) => Strategy;
export declare class JWTStrategy extends JWTStrategy_base {
    constructor(config: ConfigService);
    validate(payload: any): Promise<{
        userId: any;
        email: any;
    }>;
}
export {};
