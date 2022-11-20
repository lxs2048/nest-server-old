import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

const getMessage = (exception: HttpException) => {
  const responseExc = exception.getResponse();
  if (typeof responseExc === 'string') {
    return responseExc;
  } else if (responseExc === null) {
    return '';
  } else {
    return (responseExc as Error).message;
  }
};

@Catch(HttpException)
export class FilterInterceptor implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const status = exception.getStatus();
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    response.status(status).json({
      error: exception.message,
      message: getMessage(exception),
      time: new Date().getTime(),
      path: request.url,
      success: false,
      statusCode: status,
    });
  }
}
