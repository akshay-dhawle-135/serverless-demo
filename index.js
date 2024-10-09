module.exports.handler = async (event) => {
  const DB_HOST = process.env.DB_HOST; 
  const DB_USER_NAME = process.env.DB_USER_NAME; 
  const DB_PASSWORD = process.env.DB_PASSWORD; 

  console.log('DB_HOST', DB_HOST);
  console.log('DB_USER_NAME', DB_USER_NAME);
  console.log('DB_PASSWORD', DB_PASSWORD);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello World!',
      },
      null,
      2
    ),
  };
};
