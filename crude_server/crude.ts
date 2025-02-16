import connection from './db_connection';
import app from './server';

const successResponse = { code: 'SUCCESS' };
const failResponse = { code: 'FAIL' };
const notFoundResponse = { code: 'NOT_FOUND' };

function query(sql, params, callback) {
  connection.connect(function(error) {
    if (error) {
      console.log(error);
      callback(error);
    }
    connection.query(sql, params, function(err, result) {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, result);
        console.log('Number of records affected: ' + result.affectedRows);
      }
    });
  });
}

app.post('/create', (request, response) => {
  let sql = 'INSERT INTO EXAMPLE (VALUE, DESCRIPTION) VALUES (?, ?)';
  let values = [request.body.value, request.body.description];
  query(sql, values, (error, result) => {
    if (error) {
      response.send(failResponse);
    } else response.send(successResponse);
  });
});

app.post('/update', (request, response) => {
  let sql = 'UPDATE EXAMPLE SET VALUE = ?, DESCRIPTION = ? WHERE ID = ?';
  let values = [request.body.value, request.body.description, request.body.id];
  query(sql, values, (error, result) => {
    if (error) {
      response.send(failResponse);
    } else response.send(successResponse);
  });
});

app.post('/delete', (request, response) => {
  let sql = 'DELETE FROM EXAMPLE WHERE ID = ?';
  let values = [request.body.id];
  query(sql, values, (error, result) => {
    if (error) {
      response.send(failResponse);
    } else response.send(successResponse);
  });
});

app.post('/get', (request, response) => {
  let sql = 'SELECT e.VALUE value, e.DESCRIPTION description FROM EXAMPLE e WHERE ID = ?';
  let values = [request.body.id];
  query(sql, values, (error, result) => {
    if (error) {
      response.send(failResponse);
    } else {
      if (result.length > 0) {
        response.send(result[0]);
      } else response.send(notFoundResponse);
    }
  });
});

app.post('/list', (request, response) => {
  let sql = 'SELECT e.ID id, e.VALUE value, e.DESCRIPTION description FROM EXAMPLE e WHERE';
  let values = [];
  if (request.body.fromValue != null) {
    sql += ' e.VALUE >= ?';
    values.push(request.body.fromValue);
  }
  if (request.body.toValue != null) {
    sql += ' AND e.VALUE <= ?';
    values.push(request.body.toValue);
  }
  if (request.body.offset != null && request.body.limit != null) {
    sql += ' order by e.ID LIMIT ? OFFSET ? ';
    values.push(request.body.limit, request.body.offset);
  }
  query(sql, values, (error, result) => {
    if (error) {
      response.send(failResponse);
    } else {
      if (result.length > 0) {
        response.send(result);
      } else response.send(notFoundResponse);
    }
  });
});