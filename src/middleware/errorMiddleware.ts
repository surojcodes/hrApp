import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import IErrorDetails from '../interfaces/error.interface';
import { HRAPIError } from '../errors/HRAPIError';

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction //without this everything falls apart
) => {
  if (error instanceof ZodError) {
    const zodIssues = error.issues;
    let issues: IErrorDetails[] = [];
    for (let zIssue of zodIssues) {
      // issues.push(`Location:${zIssue.path[1]}, Issue:${zIssue.message}`);
      issues.push({
        location: zIssue.path[1].toString(),
        issue: zIssue.message,
      });
    }
    return res.status(400).json({
      success: false,
      issue: issues,
    });
  }
  //Duplicate stuff
  if (error.code && error.code === 11000) {
    console.log(error);
    const location = Object.keys(error.keyPattern)[0];
    const issue = `Duplicate value for ${location}`;
    return res.status(400).json({
      success: false,
      issue: [
        {
          location,
          issue,
        },
      ],
    });
  }
  //Custom Error
  if (error instanceof HRAPIError) {
    return res.status(error.statusCode).json({
      success: false,
      issue: [{ location: error.location, issue: error.message }],
    });
  }

  console.log('In custom error handler', error);
  res.status(500).json({
    success: false,
    issue: 'Internal Server Error',
  });
};
