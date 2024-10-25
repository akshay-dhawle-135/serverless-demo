API Types: GET, POST , PUT, PATCH , DELETE
What is REST.
middleware, event loop.
,
monolithic vs microservices.

# environment variables store in ssm,

prod, dev, qa
dev/DB_HOST https:asasd:3000/address
dev/DB_USER dev
dev/DB_PASSWORD test
dev/STRIPE_KEY 123
dev/JWT_PRIVATE_KEY test

prod/DB_HOST https:asasd:3000/address
prod/DB_USER dev
prod/DB_PASSWORD test
prod/STRIPE_KEY 123
prod/JWT_PRIVATE_KEY test

# cors

https:test:3000/
protocol: https
domain: test
port: 3000

server should be reposible to decide to whom to allow if request came other than this server.

# s3

for storing images , files store

- standard storage - for frequence reads
- versioning - image 1, image 1,
- locking - file can't be modified , can be achieved only in versioning mode
- ecryption
- Event notifications - create, delete -> integration -> lambda, sqs , eventbridge
- static website hosting - swagger docs, gym website where we're showing gym details.
- lifecycle -> using lifecycle of s3 we can create lifecycle for eg:
  we've 10k songs uploaded per month after 2 year this songs,
  considered as 2 year old and access infrequently by peoples likely 100 times per month then such case we can add rule for infrequent storage for cost saving .
  after 8 year it is considered very old then we can move to glacier ,
  after 15 year it is considered very very old then to deep glacier for cost saving.
- Access points : access related , instead of managing one large bucket policy for every use case, you can create multiple access points, each with specific policies tailored for individual applications or user groups.

API:

1. Single-Part Upload:

   - Maximum file size is 5 GB.
   - Best for small files

2. Multipart Upload

- This method is designed for uploading large files (larger than 5 GB)
- S3 breaks the file into parts and uploads each part individually. After all parts are uploaded, S3 assembles them into a single object
- Handles large files (up to 5 TB).
- Faster uploads for large files because the parts can be uploaded in parallel.
- More reliable as it allows you to retry only failed parts instead of the entire file
  Use Case: For large files (greater than 5 GB), such as videos, backups, large datasets, etc.

3. Pre-Signed URLs
   How it works: Pre-signed URLs allow you to generate a temporary URL that lets users upload files directly to your S3 bucket. You generate the URL programmatically

- Secure: You can set expiration times for the URL.
- No need to expose your AWS credentials to the user.
- Great for allowing users to upload files without granting them full S3 permissions.
- Use Case: Useful for giving users temporary access to upload files without giving them direct permissions to S3 (e.g., in web applications, mobile apps).

# NodeJS

nodejs frameworks : ExpressJS, NestJS, AdonisJS, LoopBack, Koa, sailJS.
databases: sql : postgres, mysql, nosql: mongodb, dynamodb.
database difference very imp. ACID guarantees.
database frameworks in nodejs : sql postgres: Typeorm , nosql mongodb: mongoose
libraries used: JWT, bcrypt, bluebird, lodash, swagger, cors, winston logger, aws-sdk, typeorm, mongoose, faker

# JWT (JSON web token) :

- stateless : because it is passsed in header of http request, not store in anywhere
- main use case: digitally signed token immutable.
- 2 types of algo support : symmetric , asymetric for encryption.
- 30 chars long.
- 3 parts, header, payload, verify signature, separated by dot.
- user can decode the information easily on website, so should not store secret or sensitive information.

checkout - diff between session vs jwt for more info.

# Bcrypt :

- can be use for encrpting password information .
- it allow only encrypt and verify password , cannot be decoded.
- need salt saying how long password you need.

# Bluebird:

- use in promises, provider more methods for handle promises
- eg: handle promise concurrency, eg you want to hit 100 API requests but database cannot handle this much requests at time
  Bluebirdpromise.map method if you give concurrency as 30 then this method will wait until some of the calls to be succeed as soon
  as some of the calls succeed for eg 5 tasks succeed out of 30 , 25 running state, and 5 completed , then it takes another 5 requests calls from queue and start running.

lodash: it's purely utility methods which makes work simple while writing code:
eg: omit method will remove provided properties from the object. eg { name: 'a', age: 1, score: 12 } omit(['age','score']) => { name: 'a'}

# cors:

cross origin requests.
server needs to allows origins , headers and other parameters so this library help to reduce this
behind the scene it does below things in each response:
access-control-allow-origins: \* or ['origin']
access-control-allow-headers: x-api-key
...
there are various properties that server can control for security eg : access-control-allow-credentials

# aws-sdk: it helps to calls aws api easily

for eg : s3 file upload , sqs message consume
so it provides convenient way to handle this apis.

# typeorm:

nodejs database framework to handle query abstraction ,
without typeorm we need to create table with create table raw syntax,
also we need to write raw queries like insert and select , update,
and writing this query manually prune to more errors later.

so typeorm support js wrapper to convenient call.
eg :

queryBuilder.
.from('Customers', 'c')
leftJoin('Addresses', "AD", 'AD.customer_id', 'c.id')
leftJoin('Orders', "OD", 'OD.customer_id', 'c.id')
.select([c.name, AD.address, OD.price, OD.date])
.execute()

this way it is easier for developer to query on database.

# mongoose: lib for query mongodb

it provides convenient methods for querying mongodb database:
db.find(), findOne(),....
db.collection.aggregate([])

# diff between mongodb vs postgres, or sql vs nosql

SQL : Fixed schema with structured data
NOSQL: Flexible schema (schema-less or dynamic)

eg : SQL : id ,name , we cannot insert data with address property we need to create another column for that
NOSQL : we can add address property directly or details property or object directly.

Best Use Case
SQL: Structured data, complex queries, high consistency
NOSQL: Unstructured data, large scale, high availability

# Database:

# migrations:

Migrations are designed to be run repeatedly without adverse effects. Ideally, they include both "up" (forward) migrations to apply the changes and "down" (rollback) migrations to undo them.

Version Control: Each migration script is typically versioned and ordered sequentially, allowing the database to evolve step by step without skipping changes.

Schema Evolution: Migration scripts define transformations like creating, altering, or deleting tables, columns, indexes, or constraints to accommodate evolving business requirements.

Example Uses of Migration Scripts:

- Adding a new column to a table.
- Renaming a table or column.
- Changing data types.
- Creating or removing indexes.
- Populating new columns with default or migrated data.

# Seeding:

- when we need some sample data for testing for QA or for developer we write scripts to populate random data in database tables.
  eg: lib : faker

# tests : 2 types

- tests are useful for big projects even one line of exiting code changes tests failed and this will give confidence for big project that whatever peoples has changed they did not changed imp functionality.

- unit tests: simple tests which tests logic eg : add sum method, unit tests only tests logic
  add(first,second) { return first + second }
  possible assertions:
  test1 : add(null, 2)
  test2 : add(1, null)
  test3 : add(null, null)
  test3 : add(1, 2)

so tests are measured by paths : if else , return statement , switch, ...

- unit + interaction tests:
  add(first,second) {
  t = multiply()
  return first + second + t;
  }
  in interaction test we mock multiply method to return some mock value instead of actual value
  for eg 3 value
  then add(2,3) should return output : 3 + 2+ 3 => 8

- integration tests: when tests involved third party libraries or calls included it is called integration tests

eg :

const callCreateHandler= ()=>{
call google api
save result in database
}

test('user should be created', ()=>{
connectToDB();
await callCreateHandler();
})

here we've to calls that is outside of project call google api , and database server running outside of application.

# database connection limits:

- AWS T3.micro : 2 vCPUs, 1 GB of RAM, instance limit for database connection is 20-25 connections parrallal.

- this max connections limit based on machine we use but it is not enough.
- for eg we AWS T3.large instance, 2 vCPUs and 8 GB of RAM, 100–150 connections

- so in such cases if db is not accepting much connections scaling is harder,
  so connection pooling comes into picture.

- 100–150 if max connections of db then using connection pooling it will be 300 to 500.

# Database: connection pooling

- in short effitiently utilises databases connection.

Connection pooling refers to the technique of maintaining a pool of database connections that can be reused, rather than opening and closing a new connection each time a database operation is performed

Performance: Establishing a database connection can be a slow process. By using a pool of pre-established connections, TypeORM avoids the overhead of creating and destroying connections repeatedly, leading to faster database operations.

Reuse: Once a connection is returned to the pool, it can be reused for a subsequent request, reducing the total number of active connections

Blocking Queue : A blocking queue in connection pooling is a mechanism where, if all available connections are being used and a new request for a connection comes in, the request will wait (block) until a connection is released back to the pool.

typeormorm use multiplexing technique for this.

eg: Imagine you have a TypeORM pool with a max of 10 connections. If your application receives 12 requests concurrently, the first 10 requests will get a connection immediately. The next 2 requests will be placed in a queue, waiting for a connection to become available. Once one of the initial 10 requests finishes, its connection will be returned to the pool, and one of the queued requests will use it.

```js
const connection = await createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "user",
  password: "password",
  database: "test",
  entities: [User, Product],
  extra: {
    // Connection pool options
    max: 10, // Maximum number of connections in the pool
    min: 2, // Minimum number of connections in the pool
    idleTimeoutMillis: 30000, // Timeout to close idle connections
  },
});
```

connection pooling types:

- application code : typeorm
- RDS proxy or pg bouncer : setup on another EC2.

Concurrency VS parralism

Concurrency in Node.js:
Node.js handles multiple tasks (I/O-bound operations like reading files, querying databases, etc.) concurrently by utilizing its event loop and non-blocking I/O model. Tasks don’t run simultaneously but are interleaved over time.

```js
console.log("Start");

setTimeout(() => {
  console.log("Task 1: File read completed");
}, 2000);

setTimeout(() => {
  console.log("Task 2: Database query completed");
}, 1000);

console.log("End");
```

# Detail, Concurrency VS Parallelism

Concurrency: Both tasks (file read and database query) are initiated without blocking the main thread. The event loop handles them concurrently, switching between tasks as I/O operations complete.

Parallelism in Node.js (Using Worker Threads or Cluster):
Parallelism refers to executing multiple tasks simultaneously, typically using multi-core processors. In Node.js, this can be achieved with Worker Threads or Cluster, which run separate threads or processes in parallel.

```js
const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  // Main thread
  console.log("Start");

  // Parallel task 1
  const worker1 = new Worker(__filename);
  worker1.on("message", (message) => console.log(message));

  // Parallel task 2
  const worker2 = new Worker(__filename);
  worker2.on("message", (message) => console.log(message));

  console.log("End");
} else {
  // Worker thread
  parentPort.postMessage("Task completed in parallel");
}
```

Parallelism: Each worker thread runs simultaneously on different CPU cores, performing tasks in parallel.

# in short , Concurrency VS Parallelism

Concurrency: Multiple tasks are in progress at the same time but not necessarily executing simultaneously (handled by the event loop in Node.js).
Parallelism: Multiple tasks are executing at the same time, usually on different cores or threads.
