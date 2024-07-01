import { Response } from "express";

type TSendResponseData = {
  statusCode: number;
  success: boolean;
  message: string;
  data: any;
};

const sendResponse = (res: Response, responseData: TSendResponseData) => {
  const { statusCode, success, message, data } = responseData;
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};

export default sendResponse;
