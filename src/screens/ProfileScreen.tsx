import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  Card,
  CardBody,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  List,
  ListItem,
  ListIcon,
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon,
  Badge,
} from '@chakra-ui/react';
import {
  CheckCircleIcon,
  TimeIcon,
  StarIcon,
  SettingsIcon,
  EditIcon,
  DownloadIcon,
  CalendarIcon,
  EmailIcon,
} from '@chakra-ui/icons';
import { useAuth } from '../contexts/AuthContext';

interface UserStats {
  totalChallenges: number;
  completedChallenges: number;
  inProgressChallenges: number;
  averageRating: number;
  totalTimeSpent: string;
  streakDays: number;
  achievements: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
}

const mockStats: UserStats = {
  totalChallenges: 2,
  completedChallenges: 0,
  inProgressChallenges: 0,
  averageRating: 0,
  totalTimeSpent: '0h 0m',
  streakDays: 0,
  achievements: 0,
};

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Database Detective',
    description: 'Complete your first PostgreSQL operational challenge',
    icon: '🔍',
    unlocked: false,
  },
  {
    id: '2',
    title: 'Connection Master',
    description: 'Successfully resolve a connection management issue',
    icon: '🔗',
    unlocked: false,
  },
  {
    id: '3',
    title: 'Performance Optimizer',
    description: 'Improve query performance by 90% or more',
    icon: '⚡',
    unlocked: false,
  },
  {
    id: '4',
    title: 'PostgreSQL Pro',
    description: 'Complete both operational challenges',
    icon: '🐘',
    unlocked: false,
  },
  {
    id: '5',
    title: 'Quick Fixer',
    description: 'Resolve a challenge in under 15 minutes',
    icon: '🚀',
    unlocked: false,
  },
  {
    id: '6',
    title: 'Operational Expert',
    description: 'Achieve perfect scores on all challenges',
    icon: '🏆',
    unlocked: false,
  },
];

const ProfileScreen: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.name || '');
  const toast = useToast();

  const handleSaveProfile = () => {
    // In a real app, you would save to backend here
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been successfully updated.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setIsEditing(false);
  };

  const progressPercentage = (mockStats.completedChallenges / mockStats.totalChallenges) * 100;

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Profile Header */}
        <Card>
          <CardBody>
            <HStack spacing={6} align="start">
              <Avatar
                size="xl"
                src={user?.avatar}
                name={user?.name}
                border="4px solid"
                borderColor="brand.100"
              />
              <VStack align="start" spacing={2} flex={1}>
                <HStack justify="space-between" w="100%">
                  <VStack align="start" spacing={1}>
                    <Heading size="lg">{user?.name}</Heading>
                    <Text color="gray.600">{user?.email}</Text>
                  </VStack>
                  <Button
                    leftIcon={<EditIcon />}
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </HStack>
                
                {isEditing ? (
                  <VStack align="stretch" spacing={4} w="100%">
                    <FormControl>
                      <FormLabel>Display Name</FormLabel>
                      <Input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter your display name"
                      />
                    </FormControl>
                    <HStack>
                      <Button colorScheme="brand" onClick={handleSaveProfile}>
                        Save Changes
                      </Button>
                      <Button variant="ghost" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </HStack>
                  </VStack>
                ) : (
                  <HStack>
                    <HStack>
                      <Icon as={CalendarIcon} color="gray.500" />
                      <Text fontSize="sm" color="gray.600">
                        Member since January 2024
                      </Text>
                    </HStack>
                    <HStack>
                      <Icon as={StarIcon} color="yellow.400" />
                      <Text fontSize="sm" color="gray.600">
                        {mockStats.averageRating} average rating
                      </Text>
                    </HStack>
                  </HStack>
                )}
              </VStack>
            </HStack>
          </CardBody>
        </Card>

        {/* Stats Overview */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
          <Stat>
            <StatLabel>Total Challenges</StatLabel>
            <StatNumber>{mockStats.totalChallenges}</StatNumber>
            <StatHelpText>PostgreSQL labs</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Completed</StatLabel>
            <StatNumber color="green.500">{mockStats.completedChallenges}</StatNumber>
            <StatHelpText>Resolved issues</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>In Progress</StatLabel>
            <StatNumber color="blue.500">{mockStats.inProgressChallenges}</StatNumber>
            <StatHelpText>Active debugging</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Learning Streak</StatLabel>
            <StatNumber color="orange.500">{mockStats.streakDays}</StatNumber>
            <StatHelpText>Days in a row</StatHelpText>
          </Stat>
        </SimpleGrid>

        {/* Progress and Achievements */}
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
          <GridItem>
            <Card>
              <CardBody>
                <VStack align="stretch" spacing={6}>
                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <Heading size="md">Learning Progress</Heading>
                      <Text fontSize="sm" color="gray.600">
                        {progressPercentage.toFixed(1)}% Complete
                      </Text>
                    </HStack>
                    <Progress
                      value={progressPercentage}
                      colorScheme="brand"
                      size="lg"
                      borderRadius="full"
                    />
                  </Box>

                  <Box>
                    <Heading size="md" mb={4}>Recent Activity</Heading>
                    <List spacing={3}>
                      <ListItem>
                        <HStack>
                          <ListIcon as={CheckCircleIcon} color="green.500" />
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="medium">Started "Too Many Idle Connections"</Text>
                            <Text fontSize="sm" color="gray.600">2 days ago</Text>
                          </VStack>
                        </HStack>
                      </ListItem>
                      <ListItem>
                        <HStack>
                          <ListIcon as={TimeIcon} color="blue.500" />
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="medium">Viewed "Slow Query on Orders Table"</Text>
                            <Text fontSize="sm" color="gray.600">1 week ago</Text>
                          </VStack>
                        </HStack>
                      </ListItem>
                      <ListItem>
                        <HStack>
                          <ListIcon as={StarIcon} color="yellow.400" />
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="medium">Updated PostgreSQL skills</Text>
                            <Text fontSize="sm" color="gray.600">2 weeks ago</Text>
                          </VStack>
                        </HStack>
                      </ListItem>
                    </List>
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem>
            <Card>
              <CardBody>
                <VStack align="stretch" spacing={4}>
                  <Heading size="md">Achievements</Heading>
                  <Text fontSize="sm" color="gray.600">
                    {mockStats.achievements} of {mockAchievements.length} unlocked
                  </Text>
                  
                  <VStack align="stretch" spacing={3}>
                    {mockAchievements.map((achievement) => (
                      <HStack
                        key={achievement.id}
                        p={3}
                        bg={achievement.unlocked ? 'green.50' : 'gray.50'}
                        borderRadius="md"
                        border="1px solid"
                        borderColor={achievement.unlocked ? 'green.200' : 'gray.200'}
                      >
                        <Text fontSize="lg">{achievement.icon}</Text>
                        <VStack align="start" spacing={0} flex={1}>
                          <Text fontWeight="medium" fontSize="sm">
                            {achievement.title}
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            {achievement.description}
                          </Text>
                          {achievement.unlocked && achievement.unlockedDate && (
                            <Text fontSize="xs" color="green.600">
                              Unlocked {achievement.unlockedDate}
                            </Text>
                          )}
                        </VStack>
                        {achievement.unlocked && (
                          <Icon as={CheckCircleIcon} color="green.500" />
                        )}
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>

        {/* Settings */}
        <Card>
          <CardBody>
            <Tabs>
              <TabList>
                <Tab>Account Settings</Tab>
                <Tab>Preferences</Tab>
                <Tab>Data & Privacy</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <VStack align="stretch" spacing={4}>
                    <Heading size="md">Account Settings</Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                      <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input value={user?.email} isReadOnly />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Display Name</FormLabel>
                        <Input value={user?.name} />
                      </FormControl>
                    </SimpleGrid>
                    <Button colorScheme="brand" leftIcon={<SettingsIcon />}>
                      Update Account
                    </Button>
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <VStack align="stretch" spacing={4}>
                    <Heading size="md">Learning Preferences</Heading>
                    <Text color="gray.600">
                      Customize your learning experience and challenge recommendations.
                    </Text>
                    <Button variant="outline" leftIcon={<DownloadIcon />}>
                      Export Learning Data
                    </Button>
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <VStack align="stretch" spacing={4}>
                    <Heading size="md">Data & Privacy</Heading>
                    <Text color="gray.600">
                      Manage your data and privacy settings.
                    </Text>
                    <Button variant="outline" colorScheme="red">
                      Delete Account
                    </Button>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};

export default ProfileScreen; 