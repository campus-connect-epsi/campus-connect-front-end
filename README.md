# Campus Connect 🎓

Campus Connect est une plateforme collaborative moderne conçue pour dynamiser la vie universitaire. Elle permet aux étudiants de partager du matériel, de collaborer sur des projets, d'organiser des événements et de construire un réseau solide au sein de leur établissement.

## ✨ Fonctionnalités Principales

- **📦 Gestion de Matériel** : Parcourez, consultez les détails et réservez du matériel pédagogique (imprimantes 3D, kits Arduino, caméras, etc.).
- **📅 Événements & Calendrier** : Créez et participez à des événements universitaires. Consultez votre emploi du temps et les réservations à venir.
- **💬 Forum & Discussions** : Échangez avec d'autres étudiants, posez des questions et partagez vos connaissances.
- **🚀 Collaboration sur Projets** : Trouvez des partenaires pour vos projets académiques ou personnels.
- **📂 Gestion de Documents** : Centralisez et partagez vos ressources pédagogiques.
- **👤 Profil & Paramètres** : Personnalisez votre expérience et gérez vos préférences de compte.
- **🛡️ Panel Administration** : Outils de modération et de gestion pour les administrateurs de la plateforme.

## 🛠️ Stack Technique

- **Frontend** : [React](https://reactjs.org/) (TypeScript)
- **Build Tool** : [Vite](https://vitejs.dev/)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **UI Components** : [shadcn/ui](https://ui.shadcn.com/)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Routing** : [React Router](https://reactrouter.com/)
- **Gestion d'états & Fetching** : [TanStack Query](https://tanstack.com/query/latest)

## 🚀 Installation et Lancement

### Prérequis

Assurez-vous d'avoir installé [Node.js](https://nodejs.org/) (version 18.x ou supérieure conseillée) et `npm`.

### Installation

1. Clonez le dépôt :
   ```bash
   git clone git@github.com:campus-connect-epsi/campus-connect-front-end.git
   cd campus-connect-front-end
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

### Développement

Lancez le serveur de développement avec rechargement à chaud :
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:8080`.

### Build pour la Production

Générez les fichiers optimisés pour la production dans le dossier `dist` :
```bash
npm run build
```

## 📂 Structure du Projet

```text
src/
├── components/   # Composants UI réutilisables (shadcn, etc.)
├── hooks/        # Hooks React personnalisés
├── lib/          # Utilitaires et configurations (utils.ts)
├── pages/        # Composants de pages (Vues principales)
├── App.tsx       # Configuration du routing
└── main.tsx      # Point d'entrée de l'application
```

---
Développé avec ❤️ pour la communauté étudiante.
