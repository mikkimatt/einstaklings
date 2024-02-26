import pg from 'pg';
import _ from 'lodash';
import {readFile} from 'fs/promises';
import exp from 'constants';
import e from 'express';

const { DATABASE_URL: connectionString } = process.env;

const db = new pg.Pool({connectionString});

const SCHEMA_FILE = './sql/schema.sql';
const DROP_SCHEMA_FILE = './sql/drop.sql';

db.on('error', (err) => {
  console.error('Idle database error', err);
  process.exit(-1);
});

export async function query(q, values = []) {
  const client = await db.connect();
  try {
    return await client.query(q, values);
  } catch (e) {
    console.error('Error when querying', e);
    return null;
  } finally {
    client.release();
  }
}

export async function getQuestions(request, response){
    const sql = `SELECT * FROM questions`;
    const result = await query(sql);
    return result.rows;
    
}

export async function getCategory(request, response){
    const sql = `SELECT * FROM categories`;
    const result = await query(sql);
    return result.rows;
}


export async function getUsers(request, response){
    const result = await query('SELECT * FROM users');
    response.json(result.rows);
}

export async function getUserById(request, response){
    const id = parseInt(request.params.id);
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    response.json(result.rows);
}

export async function createUser(request, response){
    const { name, email, password } = request.body;
    const result = await query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);
    response.status(201).send(`User added with ID: ${result.insertId}`);
}

export async function updateUser(request, response){
    const id = parseInt(request.params.id);
    const { name, email, password } = request.body;
    const result = await query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4', [name, email, password, id]);
    response.json(result.rows);
}

export async function deleteUser(request, response){
    const id = parseInt(request.params.id);
    const result = await query('DELETE FROM users WHERE id = $1', [id]);
    response.status(200).send(`User deleted with ID: ${id}`);
}

export async function createSchema(schemaFile = SCHEMA_FILE) {
  const data = await readFile(schemaFile);

  return query(data.toString('utf-8'));
}

export async function dropSchema(dropFile = DROP_SCHEMA_FILE) {
  const data = await readFile(dropFile);

  return query(data.toString('utf-8'));
}

export async function end() {
  await db.end();
}