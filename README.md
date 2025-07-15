# Systems Lab

A portable, hands-on lab for systems enthusiasts to spin up clusters locally, simulate real-world challenges, and learn from them interactively.

## 🚀 Features

### Authentication System
- **Login/Register**: Secure authentication with email and password
- **User Profiles**: Personalized user experience with avatars and progress tracking
- **Session Management**: Persistent login sessions with localStorage

### Interactive Challenges
- **Multiple Difficulty Levels**: Beginner, Intermediate, and Advanced challenges
- **Progress Tracking**: Real-time progress monitoring for each challenge
- **Challenge Categories**: 
  - Consensus Algorithms (Raft, Paxos)
  - Distributed Storage (Key-Value stores, Databases)
  - Networking (Load Balancers, Service Discovery)
  - Caching (Redis, Memcached)
  - Microservices Architecture
  - Observability (Logging, Monitoring)

### User Profile & Analytics
- **Learning Statistics**: Track completed challenges, time spent, and learning streaks
- **Achievement System**: Gamified learning with unlockable achievements
- **Progress Visualization**: Visual progress bars and statistics
- **Activity Timeline**: Recent learning activities and milestones

### Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Chakra UI**: Beautiful, accessible, and customizable components
- **Dark/Light Mode**: Theme support (ready for implementation)
- **Interactive Elements**: Hover effects, animations, and smooth transitions

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **UI Framework**: Chakra UI
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Icons**: Chakra UI Icons
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd systems-lab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navigation.tsx   # Main navigation component
├── contexts/           # React contexts for state management
│   └── AuthContext.tsx # Authentication context
├── screens/            # Main application screens
│   ├── AuthScreen.tsx      # Login/Register screen
│   ├── ChallengesScreen.tsx # Challenges listing and management
│   └── ProfileScreen.tsx    # User profile and settings
├── theme.ts            # Chakra UI theme configuration
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

## 🎯 Available Challenges

### Beginner Level
- **Load Balancer with Health Checks**: Learn about traffic distribution and health monitoring
- **Basic Service Discovery**: Implement service registration and discovery

### Intermediate Level
- **Distributed Key-Value Store**: Build a replicated storage system
- **Distributed Cache with Redis**: Implement caching with cluster management
- **Distributed Logging System**: Create centralized logging with real-time processing

### Advanced Level
- **Consensus Algorithm Implementation**: Implement Raft consensus algorithm
- **Microservices Communication**: Build a complete microservices architecture

## 🔧 Customization

### Adding New Challenges
1. Update the `mockChallenges` array in `ChallengesScreen.tsx`
2. Add challenge details including title, description, difficulty, and tags
3. Implement challenge-specific logic as needed

### Modifying the Theme
1. Edit `theme.ts` to customize colors, fonts, and component styles
2. Use Chakra UI's theme extension capabilities for advanced customization

### Adding New Features
1. Create new components in the `components/` directory
2. Add new screens in the `screens/` directory
3. Update routing in `App.tsx` as needed

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

## 🔮 Future Enhancements

- **Real Backend Integration**: Connect to a real authentication and data storage backend
- **Interactive Terminal**: Built-in terminal for running distributed systems commands
- **Docker Integration**: Containerized environments for each challenge
- **Collaborative Features**: Multi-user challenges and team learning
- **Advanced Analytics**: Detailed learning analytics and recommendations
- **Challenge Templates**: User-generated challenge templates
- **Real-time Collaboration**: Live collaboration on challenges
- **Mobile App**: React Native version for mobile learning

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Happy Learning! 🎓**

Build, experiment, and master systems with hands-on experience.
