sparkly/
├── mobile-web/               # React Native + Web (Expo)
│   ├── screens/
│   ├── components/
│   ├── i18n/                 # i18next config
│   ├── store/                # Redux
│   └── App.tsx
│
├── backend/                  # NestJS
│   ├── src/
│   │   ├── user/
│   │   ├── match/
│   │   ├── chat/
│   │   ├── ai/
│   │   └── main.ts
│   └── prisma/
│
├── ai-service/               # Python FastAPI
│   ├── main.py
│   ├── models/
│   └── requirements.txt
│
├── infra/
│   ├── docker-compose.yml
│   ├── k8s/
│   └── nginx.conf
│
├── translations/             # JSON files
│   ├── en.json
│   ├── es.json
│   └── ar.json
│
├── .github/workflows/ci.yml  # CI/CD
└── README.md