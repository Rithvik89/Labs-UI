import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Button,
  VStack,
  HStack,
  Progress,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import { 
  CheckCircleIcon, 
  TimeIcon, 
  StarIcon, 
  ArrowForwardIcon,
  SettingsIcon,
  InfoIcon,
} from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  estimatedTime: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number;
  rating: number;
  tags: string[];
}

const mockChallenges: Challenge[] = [
  {
    id: 'pg_connection_001',
    title: 'Too Many Idle Connections',
    description: 'Your PostgreSQL instance has started rejecting new connections from applications. The system was running fine until a recent spike in traffic.',
    difficulty: 'Intermediate',
    category: 'Connection Management',
    estimatedTime: '30-45 minutes',
    status: 'not-started',
    progress: 0,
    rating: 4.5,
    tags: ['postgresql', 'connection-pooling', 'database', 'performance'],
  },
  {
    id: 'pg_perf_001',
    title: 'Slow Query on Orders Table',
    description: 'A data-heavy table is causing a customer-facing dashboard to lag. The current query takes nearly a second, affecting the response time SLA.',
    difficulty: 'Beginner',
    category: 'Performance',
    estimatedTime: '20-30 minutes',
    status: 'not-started',
    progress: 0,
    rating: 4.2,
    tags: ['postgresql', 'performance', 'indexing', 'query-optimization'],
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'green';
    case 'Intermediate': return 'yellow';
    case 'Advanced': return 'red';
    default: return 'gray';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'green';
    case 'in-progress': return 'blue';
    case 'not-started': return 'gray';
    default: return 'gray';
  }
};

const ChallengesScreen: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const handleStartChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    onOpen();
  };

  const confirmStartChallenge = () => {
    if (selectedChallenge) {
      const updatedChallenges = challenges.map(challenge =>
        challenge.id === selectedChallenge.id
          ? { ...challenge, status: 'in-progress' as const }
          : challenge
      );
      setChallenges(updatedChallenges);
      
      toast({
        title: 'Challenge Started!',
        description: `You've started "${selectedChallenge.title}". Good luck!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      onClose();
    }
  };

  const getStats = () => {
    const total = challenges.length;
    const completed = challenges.filter(c => c.status === 'completed').length;
    const inProgress = challenges.filter(c => c.status === 'in-progress').length;
    const notStarted = challenges.filter(c => c.status === 'not-started').length;
    
    return { total, completed, inProgress, notStarted };
  };

  const stats = getStats();

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <Heading size="lg" mb={2}>
            Systems Challenges
          </Heading>
          <Text color="gray.600">
            Hands-on labs to master distributed systems concepts
          </Text>
        </Box>

        {/* Stats */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
          <Stat>
            <StatLabel>Total Challenges</StatLabel>
            <StatNumber>{stats.total}</StatNumber>
            <StatHelpText>Available labs</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Completed</StatLabel>
            <StatNumber color="green.500">{stats.completed}</StatNumber>
            <StatHelpText>Finished labs</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>In Progress</StatLabel>
            <StatNumber color="blue.500">{stats.inProgress}</StatNumber>
            <StatHelpText>Active labs</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Not Started</StatLabel>
            <StatNumber color="gray.500">{stats.notStarted}</StatNumber>
            <StatHelpText>Available labs</StatHelpText>
          </Stat>
        </SimpleGrid>

        {/* Challenges Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {challenges.map((challenge) => (
            <Card key={challenge.id} variant="outline">
              <CardHeader pb={2}>
                <VStack align="start" spacing={2}>
                  <HStack justify="space-between" w="100%">
                    <Badge colorScheme={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                    <HStack spacing={1}>
                      <Icon as={StarIcon} color="yellow.400" />
                      <Text fontSize="sm">{challenge.rating}</Text>
                    </HStack>
                  </HStack>
                  <Heading size="md">{challenge.title}</Heading>
                  <Text fontSize="sm" color="gray.600">
                    {challenge.category} • {challenge.estimatedTime}
                  </Text>
                </VStack>
              </CardHeader>
              
              <CardBody pt={0}>
                <VStack align="stretch" spacing={4}>
                  <Text fontSize="sm" noOfLines={3}>
                    {challenge.description}
                  </Text>
                  
                  <HStack spacing={2} flexWrap="wrap">
                    {challenge.tags.map((tag) => (
                      <Badge key={tag} variant="subtle" colorScheme="gray" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </HStack>

                  {challenge.status === 'in-progress' && (
                    <Box>
                      <HStack justify="space-between" mb={1}>
                        <Text fontSize="sm">Progress</Text>
                        <Text fontSize="sm">{challenge.progress}%</Text>
                      </HStack>
                      <Progress value={challenge.progress} colorScheme="blue" size="sm" />
                    </Box>
                  )}

                  <HStack justify="space-between">
                    <Badge colorScheme={getStatusColor(challenge.status)}>
                      {challenge.status.replace('-', ' ')}
                    </Badge>
                    
                    <HStack spacing={2}>
                      <Button
                        size="sm"
                        variant="ghost"
                        leftIcon={<InfoIcon />}
                        onClick={() => navigate(`/challenge/${challenge.id}`)}
                      >
                        Details
                      </Button>
                      
                      {challenge.status === 'not-started' && (
                        <Button
                          size="sm"
                          colorScheme="brand"
                          leftIcon={<ArrowForwardIcon />}
                          onClick={() => handleStartChallenge(challenge)}
                        >
                          Start
                        </Button>
                      )}
                      
                      {challenge.status === 'in-progress' && (
                        <Button
                          size="sm"
                          colorScheme="blue"
                          leftIcon={<SettingsIcon />}
                        >
                          Continue
                        </Button>
                      )}
                      
                      {challenge.status === 'completed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          leftIcon={<CheckCircleIcon />}
                          colorScheme="green"
                        >
                          Review
                        </Button>
                      )}
                    </HStack>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>

      {/* Challenge Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedChallenge?.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedChallenge && (
              <VStack align="stretch" spacing={4}>
                <HStack justify="space-between">
                  <Badge colorScheme={getDifficultyColor(selectedChallenge.difficulty)}>
                    {selectedChallenge.difficulty}
                  </Badge>
                  <HStack spacing={1}>
                    <Icon as={StarIcon} color="yellow.400" />
                    <Text>{selectedChallenge.rating}</Text>
                  </HStack>
                </HStack>
                
                <Text>{selectedChallenge.description}</Text>
                
                <HStack>
                  <Icon as={TimeIcon} />
                  <Text fontSize="sm">Estimated time: {selectedChallenge.estimatedTime}</Text>
                </HStack>
                
                <Box>
                  <Text fontWeight="medium" mb={2}>Tags:</Text>
                  <HStack spacing={2} flexWrap="wrap">
                    {selectedChallenge.tags.map((tag) => (
                      <Badge key={tag} variant="subtle" colorScheme="gray">
                        {tag}
                      </Badge>
                    ))}
                  </HStack>
                </Box>
              </VStack>
            )}
          </ModalBody>
          
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            {selectedChallenge?.status === 'not-started' && (
              <Button colorScheme="brand" onClick={confirmStartChallenge}>
                Start Challenge
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ChallengesScreen; 