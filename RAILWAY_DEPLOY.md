# Guia de Deploy no Railway

Este projeto está configurado para ser facilmente implantado no Railway. Siga os passos abaixo para fazer o deploy.

## Pré-requisitos

1. Conta no [Railway](https://railway.app/)
2. Repositório no GitHub com o código do projeto
3. Railway CLI instalado (opcional, mas recomendado)

## Configuração do Projeto no Railway

### 1. Conectar o Repositório

1. Acesse o [Railway Dashboard](https://railway.app/dashboard)
2. Clique em "New Project"
3. Selecione "Deploy from GitHub repo"
4. Escolha seu repositório

### 2. Configuração Automática

Railway irá detectar automaticamente que este é um projeto Node.js e usar as seguintes configurações:

- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Port**: Automaticamente detectado via `process.env.PORT`

## Variáveis de Ambiente Necessárias

Configure as seguintes variáveis de ambiente no Railway Dashboard:

### Variáveis Obrigatórias:

```bash
NODE_ENV=production
```

**Nota**: Não configure PORT manualmente - Railway define automaticamente a porta.

### Variáveis Opcionais (se usar banco de dados):

```bash
DATABASE_URL=<sua_connection_string_postgresql>
SESSION_SECRET=<string_aleatoria_secreta>
```

### Para configurar via Railway Dashboard:

1. Acesse seu projeto no Railway
2. Vá para a aba "Variables"
3. Adicione cada variável com seu respectivo valor

## Estrutura do Projeto Otimizada

O projeto já está configurado com:

✅ **Scripts otimizados para Railway**:
- `railway:build`: Instala dependências e builda o projeto  
- `railway:start`: Inicia o servidor em produção

✅ **Servidor configurado corretamente**:
- Usa `process.env.PORT` (Railway define automaticamente)
- Host configurado para `0.0.0.0`
- Serve arquivos estáticos em produção
- Modo desenvolvimento/produção adequado

✅ **Build otimizado**:
- Frontend (React + Vite) compilado
- Backend (Express + TypeScript) bundled
- Arquivos servidos corretamente em produção

## Deploy Manual via Railway CLI

Se preferir usar a CLI:

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy do diretório atual  
railway up

# Gerar domínio público
railway domain

# Ver logs
railway logs
```

## Monorepo - Como o Railway Irá Processar

Railway detecta automaticamente a estrutura monorepo e:

1. **Build**: Executa `npm run build` que:
   - Compila o frontend React com Vite → `dist/public/`
   - Compila o backend Express com esbuild → `dist/index.js`

2. **Start**: Executa `npm start` que:
   - Inicia `dist/index.js` em modo produção
   - Serve arquivos estáticos do `dist/public/`
   - APIs disponíveis em `/api/*`

## Banco de Dados (Opcional)

Se seu projeto usar banco PostgreSQL:

1. **No Railway Dashboard**:
   - Clique "New" → "Database" → "PostgreSQL"
   - Copie a `DATABASE_URL` das variáveis

2. **Configure a variável**:
   - Cole a `DATABASE_URL` nas variáveis do seu serviço

## Domínio e URLs

Após o deploy:

- Railway gera automaticamente um domínio: `https://seu-projeto.railway.app`
- API estará disponível em: `https://seu-projeto.railway.app/api/*`
- Frontend estará disponível em: `https://seu-projeto.railway.app/`

## Debugging

Se houver problemas no deploy:

1. **Verifique os logs**: No Dashboard → "Deployments" → Clique no deploy → "View Logs"
2. **Variáveis de ambiente**: Confirme que estão configuradas corretamente
3. **Build**: Verifique se `npm run build` funciona localmente
4. **Start**: Verifique se `npm start` funciona localmente após o build

## Scripts Disponíveis

```json
{
  "dev": "NODE_ENV=development tsx server/index.ts",      // Desenvolvimento local
  "build": "vite build && esbuild server/index.ts...",   // Build completo
  "start": "NODE_ENV=production node dist/index.js",     // Produção
  "railway:build": "npm install && npm run build",       // Build Railway
  "railway:start": "npm run start"                       // Start Railway
}
```

## Arquivos Importantes

- `server/index.ts`: Servidor Express principal
- `client/src/`: Código fonte React
- `vite.config.ts`: Configuração do build frontend
- `package.json`: Scripts e dependências
- `dist/`: Arquivos compilados (gerados no build)

---

**✅ Projeto pronto para deploy no Railway!**

Todos os arquivos e configurações necessárias já estão configurados corretamente para funcionar na plataforma Railway.