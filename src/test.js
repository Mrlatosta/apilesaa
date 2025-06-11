import pg from 'pg';

const pool = new pg.Pool({
  user: 'postgres',
  host: '192.168.100.62',
  password: 'Lesaa2025',
  database: 'dbgrupolesaa',
  port: 5432,
  ssl: false
});

pool.query('SELECT NOW()')
  .then(res => console.log('✅ Conexión exitosa:', res.rows[0]))
  .catch(err => console.error('❌ Error de conexión:', err));
