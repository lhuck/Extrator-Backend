import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Post from './models/Post.js'; // Renomeado para Post (ao invés de Video)

dotenv.config();

const app = express();

// Configurações de Segurança
app.use(cors({ 
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*', 
  methods: ['GET', 'POST'] 
}));
app.use(express.json({ limit: '10mb' })); // Para payloads grandes

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB conectado!'))
  .catch(err => console.error('❌ Erro ao conectar MongoDB:', err));

// Rota de saúde
app.get('/', async (req, res) => {
  try {
    const count = await Post.countDocuments();
    res.json({ 
      status: 'ok',
      message: 'API funcionando',
      videoCount: count 
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro ao acessar banco de dados' });
  }
});

// Rota para adicionar posts (compatível com a extensão)
app.post('/api/add-post', async (req, res) => {
  console.log('Recebendo payload:', JSON.stringify(req.body, null, 2));
  
  const { postUrl, title, thumb, tags, videos } = req.body;

  if (!postUrl || !title || !videos?.length) {
    return res.status(400).json({ 
      status: 'error', 
      message: 'Dados incompletos' 
    });
  }

  try {
    // Verifica se post já existe
    const existingPost = await Post.findOne({ postUrl });
    if (existingPost) {
      return res.json({ 
        status: 'exists', 
        message: 'Post já existe no banco' 
      });
    }

    // Cria novo post
    const post = new Post({ 
      postUrl,
      title,
      thumb,
      tags,
      videos,
      createdAt: new Date()
    });

    await post.save();
    console.log(`✅ Post salvo: ${title} (${videos.length} vídeos)`);
    
    res.json({ 
      status: 'ok',
      postId: post._id,
      videosSaved: videos.length 
    });

  } catch (error) {
    console.error('❌ Erro ao salvar post:', error.message);
    res.status(500).json({ 
      status: 'error', 
      message: 'Erro interno do servidor' 
    });
  }
});

// Modelo recomendado (Post.js)
/*
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  postUrl: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  thumb: String,
  tags: [String],
  videos: [{
    url: { type: String, required: true },
    title: String,
    order: Number
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Post', PostSchema);
*/

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
