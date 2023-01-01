import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const initMiddleware = (middleware: Function) => {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) =>
        result instanceof Error ? reject(result) : resolve(result)
      );
    });
};

export default initMiddleware;
