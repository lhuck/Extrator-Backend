import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import Video from './models/Video.js';

dotenv.config();

const app = express();
app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB conectado!'))
  .catch(err => console.error('❌ Erro ao conectar MongoDB:', err));

app.get('/', async (req, res) => {
  try {
    const count = await Video.countDocuments();
    res.send(`
      <h1>API funcionando!</h1>
      <p>Total de vídeos salvos no banco: <strong>${count}</strong></p>
    `);
  } catch (error) {
    res.status(500).send('Erro ao acessar banco de dados');
  }
});

app.post('/api/add-video', async (req, res) => {
  console.log('POST /api/add-video recebido:', req.body);
  const { title, url, thumb, tags } = req.body;

  try {
    const video = new Video({ title, url, thumb, tags });
    await video.save();
    console.log('✅ Vídeo salvo:', video.title);
    res.json({ status: 'ok', video });
  } catch (error) {
    console.error('❌ Erro ao salvar vídeo:', error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em HTTP na porta ${PORT}`);
});
