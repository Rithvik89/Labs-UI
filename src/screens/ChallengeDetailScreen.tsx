import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  Badge,
  Button,
  Code,
  useToast,
  List,
  ListItem,
  ListIcon,
  Grid,
  GridItem,
  Icon,
  Progress,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import {
  CheckCircleIcon,
  TimeIcon,
  StarIcon,
  ArrowForwardIcon,
  InfoIcon,
  DownloadIcon,
  WarningIcon,
} from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';

interface ChallengeDetail {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  summary: string;
  objectives: string[];
  clusterState: {
    nodes: number;
    services: string[];
    simulation?: string[];
    dataProfile?: string[];
  };
  setupCommands: string[];
  estimatedTime: string;
  rating: number;
  tags: string[];
}

const challengeData: Record<string, ChallengeDetail> = {
  'pg_connection_001': {
    id: 'pg_connection_001',
    title: 'Too Many Idle Connections',
    level: 'Intermediate',
    category: 'Connection Management',
    summary: 'Your PostgreSQL instance has started rejecting new connections from applications. The system was running fine until a recent spike in traffic. You\'ve been brought in to diagnose and resolve the issue.',
    objectives: [
      'Identify why PostgreSQL is rejecting new connections',
      'Bring the system back to a healthy state',
      'Propose a long-term fix'
    ],
    clusterState: {
      nodes: 1,
      services: [
        'postgres: running (port 5432, max_connections = 100)'
      ],
      simulation: [
        '100 client connections opened by different applications',
        'System still running but rejecting new connections'
      ]
    },
    setupCommands: [
      'docker run -d --name postgres-challenge -e POSTGRES_PASSWORD=password -p 5432:5432 postgres:13',
      'docker exec -it postgres-challenge psql -U postgres -c "SHOW max_connections;"',
      'docker exec -it postgres-challenge psql -U postgres -c "SELECT count(*) FROM pg_stat_activity;"',
      'docker exec -it postgres-challenge psql -U postgres -c "SELECT * FROM pg_stat_activity WHERE state = \'idle\';"'
    ],
    estimatedTime: '30-45 minutes',
    rating: 4.5,
    tags: ['postgresql', 'connection-pooling', 'database', 'performance'],
  },
  'pg_perf_001': {
    id: 'pg_perf_001',
    title: 'Slow Query on Orders Table',
    level: 'Beginner',
    category: 'Performance',
    summary: 'A data-heavy table is causing a customer-facing dashboard to lag. The current query takes nearly a second, affecting the response time SLA. You\'re tasked with improving the performance without changing the business logic of the query.',
    objectives: [
      'Reduce query latency below 100ms',
      'Avoid full table scans'
    ],
    clusterState: {
      nodes: 1,
      services: [
        'postgres: running on port 5432'
      ],
      dataProfile: [
        'Table: orders (1 million rows)',
        'Problematic Query: SELECT * FROM orders WHERE user_id = 42;'
      ]
    },
    setupCommands: [
      'docker run -d --name postgres-perf -e POSTGRES_PASSWORD=password -p 5432:5432 postgres:13',
      'docker exec -it postgres-perf psql -U postgres -c "CREATE TABLE orders (id SERIAL PRIMARY KEY, user_id INTEGER, amount DECIMAL, created_at TIMESTAMP);"',
      'docker exec -it postgres-perf psql -U postgres -c "INSERT INTO orders (user_id, amount, created_at) SELECT (random() * 1000)::int, random() * 1000, NOW() - (random() * interval \'365 days\') FROM generate_series(1, 1000000);"',
      'docker exec -it postgres-perf psql -U postgres -c "EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 42;"'
    ],
    estimatedTime: '20-30 minutes',
    rating: 4.2,
    tags: ['postgresql', 'performance', 'indexing', 'query-optimization'],
  },
};

const ChallengeDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const toast = useToast();
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const challengeDetail = id ? challengeData[id] : null;

  if (!challengeDetail) {
    return (
      <Container maxW="7xl" py={8}>
        <VStack spacing={8} align="center">
          <Heading>Challenge Not Found</Heading>
          <Text>The requested challenge could not be found.</Text>
        </VStack>
      </Container>
    );
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'green';
      case 'Intermediate': return 'yellow';
      case 'Advanced': return 'red';
      default: return 'gray';
    }
  };

  const handleStartChallenge = () => {
    setIsRunning(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          toast({
            title: 'Challenge Environment Ready!',
            description: `Your ${challengeDetail.category.toLowerCase()} challenge is now running and ready.`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Command Copied!',
      description: 'Command copied to clipboard',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={2}>
              <HStack>
                <Badge colorScheme={getLevelColor(challengeDetail.level)}>
                  {challengeDetail.level}
                </Badge>
                <Badge variant="outline">{challengeDetail.category}</Badge>
              </HStack>
              <Heading size="lg">{challengeDetail.title}</Heading>
              <HStack spacing={4}>
                <HStack>
                  <Icon as={TimeIcon} color="gray.500" />
                  <Text fontSize="sm" color="gray.600">
                    {challengeDetail.estimatedTime}
                  </Text>
                </HStack>
                <HStack>
                  <Icon as={StarIcon} color="yellow.400" />
                  <Text fontSize="sm">{challengeDetail.rating}</Text>
                </HStack>
              </HStack>
            </VStack>
            <Button
              leftIcon={<ArrowForwardIcon />}
              colorScheme="brand"
              size="lg"
              onClick={handleStartChallenge}
              isLoading={isRunning}
              loadingText="Starting..."
            >
              Start Challenge
            </Button>
          </HStack>
        </Box>

        {/* Progress Bar */}
        {isRunning && (
          <Card>
            <CardBody>
              <VStack spacing={4}>
                <Text fontWeight="medium">Setting up challenge environment...</Text>
                <Progress value={progress} colorScheme="brand" size="lg" width="100%" />
                <Text fontSize="sm" color="gray.600">{progress}% Complete</Text>
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* Challenge Overview */}
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Summary */}
              <Card>
                <CardBody>
                  <VStack align="start" spacing={4}>
                    <Heading size="md">Challenge Summary</Heading>
                    <Text>{challengeDetail.summary}</Text>
                  </VStack>
                </CardBody>
              </Card>

              {/* Objectives */}
              <Card>
                <CardBody>
                  <VStack align="start" spacing={4}>
                    <Heading size="md">Learning Objectives</Heading>
                    <List spacing={3}>
                      {challengeDetail.objectives.map((objective, index) => (
                        <ListItem key={index}>
                          <HStack>
                            <ListIcon as={CheckCircleIcon} color="green.500" />
                            <Text>{objective}</Text>
                          </HStack>
                        </ListItem>
                      ))}
                    </List>
                  </VStack>
                </CardBody>
              </Card>

              {/* Setup Commands */}
              <Card>
                <CardBody>
                  <VStack align="start" spacing={4}>
                    <HStack justify="space-between" w="100%">
                      <Heading size="md">Setup Commands</Heading>
                      <Button
                        size="sm"
                        variant="outline"
                        leftIcon={<DownloadIcon />}
                        onClick={() => {
                          const commands = challengeDetail.setupCommands.join('\n');
                          copyToClipboard(commands);
                        }}
                      >
                        Copy All
                      </Button>
                    </HStack>
                    <Text fontSize="sm" color="gray.600">
                      Run these commands in your terminal to set up the challenge environment:
                    </Text>
                    <VStack align="stretch" spacing={3} w="100%">
                      {challengeDetail.setupCommands.map((command, index) => (
                        <Box key={index} position="relative">
                          <Code
                            p={4}
                            borderRadius="md"
                            bg="gray.50"
                            fontSize="sm"
                            display="block"
                            whiteSpace="pre-wrap"
                          >
                            {command}
                          </Code>
                          <Button
                            size="xs"
                            position="absolute"
                            top={2}
                            right={2}
                            onClick={() => copyToClipboard(command)}
                          >
                            Copy
                          </Button>
                        </Box>
                      ))}
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Cluster State */}
              <Card>
                <CardBody>
                  <VStack align="start" spacing={4}>
                    <Heading size="md">Cluster State</Heading>
                    <VStack align="start" spacing={3}>
                      <Box>
                        <Text fontWeight="medium">Nodes: {challengeDetail.clusterState.nodes}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="medium">Services:</Text>
                        <List spacing={1} mt={2}>
                          {challengeDetail.clusterState.services.map((service, index) => (
                            <ListItem key={index} fontSize="sm">
                              <ListIcon as={CheckCircleIcon} color="green.500" />
                              {service}
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                      {challengeDetail.clusterState.simulation && (
                        <Box>
                          <Text fontWeight="medium">Simulation:</Text>
                          <List spacing={1} mt={2}>
                            {challengeDetail.clusterState.simulation.map((sim, index) => (
                              <ListItem key={index} fontSize="sm">
                                <ListIcon as={WarningIcon} color="orange.500" />
                                {sim}
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}
                      {challengeDetail.clusterState.dataProfile && (
                        <Box>
                          <Text fontWeight="medium">Data Profile:</Text>
                          <List spacing={1} mt={2}>
                            {challengeDetail.clusterState.dataProfile.map((profile, index) => (
                              <ListItem key={index} fontSize="sm">
                                <ListIcon as={InfoIcon} color="blue.500" />
                                {profile}
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>

              {/* Tags */}
              <Card>
                <CardBody>
                  <VStack align="start" spacing={4}>
                    <Heading size="md">Tags</Heading>
                    <HStack spacing={2} flexWrap="wrap">
                      {challengeDetail.tags.map((tag) => (
                        <Badge key={tag} variant="subtle" colorScheme="gray">
                          {tag}
                        </Badge>
                      ))}
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>

              {/* Test Commands */}
              <Card>
                <CardBody>
                  <VStack align="start" spacing={4}>
                    <Heading size="md">Test Commands</Heading>
                    <Text fontSize="sm" color="gray.600">
                      Run these commands to validate your solution:
                    </Text>
                    <VStack align="stretch" spacing={3} w="100%">
                      {challengeDetail.id === 'pg_connection_001' ? (
                        <>
                          <Box position="relative">
                            <Code
                              p={3}
                              borderRadius="md"
                              bg="gray.50"
                              fontSize="sm"
                              display="block"
                              whiteSpace="pre-wrap"
                            >
                              # Test connection limit
                              docker exec -it postgres-challenge psql -U postgres -c "SELECT count(*) FROM pg_stat_activity WHERE state = 'active';"
                            </Code>
                            <Button
                              size="xs"
                              position="absolute"
                              top={1}
                              right={1}
                              onClick={() => copyToClipboard('docker exec -it postgres-challenge psql -U postgres -c "SELECT count(*) FROM pg_stat_activity WHERE state = \'active\';"')}
                            >
                              Copy
                            </Button>
                          </Box>
                          <Box position="relative">
                            <Code
                              p={3}
                              borderRadius="md"
                              bg="gray.50"
                              fontSize="sm"
                              display="block"
                              whiteSpace="pre-wrap"
                            >
                              # Test idle connections
                              docker exec -it postgres-challenge psql -U postgres -c "SELECT count(*) FROM pg_stat_activity WHERE state = 'idle';"
                            </Code>
                            <Button
                              size="xs"
                              position="absolute"
                              top={1}
                              right={1}
                              onClick={() => copyToClipboard('docker exec -it postgres-challenge psql -U postgres -c "SELECT count(*) FROM pg_stat_activity WHERE state = \'idle\';"')}
                            >
                              Copy
                            </Button>
                          </Box>
                        </>
                      ) : (
                        <>
                          <Box position="relative">
                            <Code
                              p={3}
                              borderRadius="md"
                              bg="gray.50"
                              fontSize="sm"
                              display="block"
                              whiteSpace="pre-wrap"
                            >
                              # Test query performance
                              docker exec -it postgres-perf psql -U postgres -c "EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 42;"
                            </Code>
                            <Button
                              size="xs"
                              position="absolute"
                              top={1}
                              right={1}
                              onClick={() => copyToClipboard('docker exec -it postgres-perf psql -U postgres -c "EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 42;"')}
                            >
                              Copy
                            </Button>
                          </Box>
                          <Box position="relative">
                            <Code
                              p={3}
                              borderRadius="md"
                              bg="gray.50"
                              fontSize="sm"
                              display="block"
                              whiteSpace="pre-wrap"
                            >
                              # Check indexes
                              docker exec -it postgres-perf psql -U postgres -c "\\d+ orders"
                            </Code>
                            <Button
                              size="xs"
                              position="absolute"
                              top={1}
                              right={1}
                              onClick={() => copyToClipboard('docker exec -it postgres-perf psql -U postgres -c "\\d+ orders"')}
                            >
                              Copy
                            </Button>
                          </Box>
                        </>
                      )}
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            </VStack>
          </GridItem>
        </Grid>

        {/* Alert for Challenge Status */}
        <Alert status="info">
          <AlertIcon />
          <Box>
            <AlertTitle>Challenge Ready!</AlertTitle>
            <AlertDescription>
              This challenge simulates a real-world {challengeDetail.category.toLowerCase()} issue. 
              Use the setup commands to create the environment and then diagnose the problem.
            </AlertDescription>
          </Box>
        </Alert>
      </VStack>
    </Container>
  );
};

export default ChallengeDetailScreen; 