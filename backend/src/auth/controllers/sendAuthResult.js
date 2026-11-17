export const sendAuthResult = (res, result) => res.status(result.statusCode).json({
  success: result.success,
  message: result.message,
  ...(result.data ? { data: result.data } : {}),
  ...(result.errors ? { errors: result.errors } : {}),
  ...(result.code ? { code: result.code } : {}),
});
