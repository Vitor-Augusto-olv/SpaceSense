# 🛰 Space Sense

> Solução de monitoramento e prevenção de colisões de detritos espaciais — FIAP Global Solution 2025

---

## 👥 Equipe

| Nome | RM | Turma |
|---|---|---|
| Vitor Augusto Oliveira de Abreu | RM564227 | 2TDSPJ |
| André Bellandi Vital Rodrigues | RM564662 | 2TDSPJ |
| Gabriel Garcia Mayo Delatore | RM563298 | 2TDSPJ |

---

## 🎥 Vídeo de Apresentação

📺 [Assista no YouTube](https://www.youtube.com/link-do-video)

---

## 💡 Sobre a Solução

O **Space Sense** é uma solução integrada de monitoramento de detritos espaciais que combina IoT com ESP32 e um aplicativo mobile para prevenção de colisões em órbita terrestre.

Atualmente existem mais de **27.000 detritos rastreados** em órbita, representando um risco crescente para satélites ativos e missões espaciais. O Space Sense endereça esse problema oferecendo:

- **Monitoramento em tempo real** de detritos próximos a satélites
- **Sistema de alertas inteligente** com níveis de risco (DANGER, WARNING, SAFE)
- **Integração com Space-Track.org** — base de dados oficial do governo americano
- **Protótipo IoT com ESP32** simulando sensores embarcados em satélites
- **Aplicativo mobile** para visualização e gestão dos dados

---

## 📱 Aplicativo Mobile

### Tecnologias
- React Native + Expo Router
- Axios (integração com API REST Java)
- AsyncStorage (autenticação persistente)
- WebView (Space-Track.org)

### Telas
1. **Dashboard** — visão geral com métricas e gráfico de distribuição de risco
2. **Alertas** — listagem, criação e remoção de alertas com filtros por nível
3. **Detritos** — CRUD completo de detritos rastreados com modal de edição
4. **Space-Track** — acesso à base de dados real via WebView
5. **Perfil** — informações do operador e logout
6. **Configurações** — ajustes de notificações, limiar de risco e URL da API
7. **Sobre** — informações da equipe e do projeto
8. **Login** — autenticação com persistência via AsyncStorage

### Credenciais de demonstração
```
Email: admin@spacesense.com
Senha: 123456
```

---

## 🚀 Como Executar o App

### Pré-requisitos
- Node.js 18+
- Expo CLI
- Expo Go no celular (iOS ou Android)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/Vitor-Augusto-olv/SpaceSense.git
cd SpaceSense

# 2. Instale as dependências
npm install --legacy-peer-deps

# 3. Inicie o projeto
npx expo start

# 4. Escaneie o QR Code com o Expo Go
```

---

## 🔌 IoT — Protótipo ESP32

### Tecnologias
- ESP32 (simulado no Wokwi)
- Sensor ultrassônico HC-SR04
- LCD 16x2
- LEDs indicadores
- Wi-Fi + API REST (WebServer)
- MQTT

### Endpoints documentados

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/status` | Retorna distância e nível de risco atual |
| GET | `/alerts` | Lista histórico de alertas gerados |
| POST | `/config` | Define limiar de distância de risco |


---

## 🔗 Links

- 📦 [Repositório GitHub](https://github.com/Vitor-Augusto-olv/SpaceSense)
- 🎥 [Vídeo no YouTube](https://www.youtube.com/link-do-video)
- 🌐 [Space-Track.org](https://www.space-track.org)

---

<p align="center">Desenvolvido para FIAP Global Solution 2025</p>
