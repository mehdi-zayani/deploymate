import NextAuth from "next-auth";
import { authOptions } from "../options"; // ✅ on importe depuis le fichier séparé

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
