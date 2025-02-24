import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Input,
  useToast,
  IconButton,
  Tooltip,
  Switch,
  FormControl,
  FormLabel,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Collapse,
  useDisclosure,
  SimpleGrid,
} from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import { 
  FaVideo, 
  FaMicrophone, 
  FaMicrophoneSlash, 
  FaVideoSlash, 
  FaDesktop, 
  FaComments,
  FaCog,
  FaExpand,
  FaCompress,
  FaUserFriends,
  FaCopy,
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

interface JitsiConfig {
  videoQuality: string;
  audioInputDevice: string;
  videoInputDevice: string;
  resolution: string;
  startWithAudioMuted: boolean;
  startWithVideoMuted: boolean;
  enableLowBandwidth: boolean;
  participantVolume: number;
}

interface MediaDeviceInfo {
  deviceId: string;
  groupId: string;
  kind: string;
  label: string;
}

interface AvailableDevices {
  audioInput: MediaDeviceInfo[];
  videoInput: MediaDeviceInfo[];
}

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

const LiveSessions = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const [roomName, setRoomName] = useState(roomId || '');
  const [joinCode, setJoinCode] = useState('');
  const [isInSession, setIsInSession] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { isOpen: isConfigOpen, onToggle: onConfigToggle } = useDisclosure();
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  const [config, setConfig] = useState<JitsiConfig>({
    videoQuality: 'high',
    audioInputDevice: '',
    videoInputDevice: '',
    resolution: '720',
    startWithAudioMuted: false,
    startWithVideoMuted: false,
    enableLowBandwidth: false,
    participantVolume: 100,
  });

  const [availableDevices, setAvailableDevices] = useState<AvailableDevices>({
    audioInput: [],
    videoInput: []
  });

  useEffect(() => {
    // Get available media devices
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        setAvailableDevices({
          audioInput: devices.filter(device => device.kind === 'audioinput'),
          videoInput: devices.filter(device => device.kind === 'videoinput'),
        });
      })
      .catch(error => {
        console.error('Error getting media devices:', error);
      });

    // If room ID is provided in URL, join that room
    if (roomId) {
      setRoomName(roomId);
      setIsInSession(true);
    } else {
      // Reset session state when no room ID is present
      setIsInSession(false);
      setRoomName('');
    }
  }, [roomId]);

  const generateRoomName = () => {
    return 'draw-' + Math.random().toString(36).substring(2, 9);
  };

  const startSession = () => {
    const finalRoomName = roomName || generateRoomName();
    setRoomName(finalRoomName);
    navigate(`/academy/live-sessions/${finalRoomName}`);
  };

  const joinSession = () => {
    if (!joinCode.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a valid room code',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    navigate(`/academy/live-sessions/${joinCode}`);
  };

  const toggleFullscreen = () => {
    if (!jitsiContainerRef.current) return;

    if (!isFullscreen) {
      if (jitsiContainerRef.current.requestFullscreen) {
        jitsiContainerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const getJitsiOptions = () => {
    return {
      roomName: roomName,
      width: '100%',
      height: '100%',
      configOverwrite: {
        startWithAudioMuted: config.startWithAudioMuted,
        startWithVideoMuted: config.startWithVideoMuted,
        resolution: parseInt(config.resolution),
        constraints: {
          video: {
            height: {
              ideal: parseInt(config.resolution),
              max: parseInt(config.resolution),
              min: 240
            }
          }
        },
        enableLowBandwidth: config.enableLowBandwidth,
        prejoinPageEnabled: true,
        disableDeepLinking: true,
      },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
          'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
          'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
          'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
          'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
          'security'
        ],
        SETTINGS_SECTIONS: ['devices', 'language', 'moderator', 'profile', 'calendar'],
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        SHOW_BRAND_WATERMARK: false,
        BRAND_WATERMARK_LINK: '',
        SHOW_POWERED_BY: false,
        SHOW_PROMOTIONAL_CLOSE_PAGE: false,
        FILM_STRIP_MAX_HEIGHT: 120,
        INITIAL_TOOLBAR_TIMEOUT: 20000,
        TOOLBAR_TIMEOUT: 4000,
        TOOLBAR_ALWAYS_VISIBLE: false,
        DEFAULT_REMOTE_DISPLAY_NAME: 'Artist',
        DEFAULT_LOCAL_DISPLAY_NAME: 'You',
        TILE_VIEW_MAX_COLUMNS: 5,
        VIDEO_QUALITY_LABEL_DISABLED: false,
      },
      userInfo: {
        displayName: 'Artist'
      },
      devices: {
        audioInput: config.audioInputDevice,
        videoInput: config.videoInputDevice,
      }
    };
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MotionHeading
            as="h1"
            size="2xl"
            mb={4}
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            Draw & Learn Together
          </MotionHeading>
          <Text fontSize="xl" color="gray.600">
            Sketch, explain, and explore blockchain concepts together 🎨
          </Text>
        </MotionBox>

        {!isInSession ? (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <MotionBox
              p={6}
              bg="white"
              borderRadius="xl"
              boxShadow="xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <VStack spacing={4} align="stretch">
                <Heading size="md" color="blue.500">Create Session</Heading>
                <Input
                  placeholder="Room name (optional)"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  size="lg"
                />
                <Button
                  onClick={onConfigToggle}
                  leftIcon={<FaCog />}
                  variant="outline"
                  size="lg"
                  width="100%"
                >
                  Session Settings
                </Button>

                <Collapse in={isConfigOpen}>
                  <VStack spacing={4} p={4} bg="gray.50" borderRadius="xl" mt={2}>
                    <FormControl>
                      <FormLabel>Video Quality</FormLabel>
                      <Select
                        value={config.videoQuality}
                        onChange={(e) => setConfig({...config, videoQuality: e.target.value})}
                        bg="white"
                      >
                        <option value="low">Low (360p)</option>
                        <option value="medium">Medium (480p)</option>
                        <option value="high">High (720p)</option>
                        <option value="ultra">Ultra HD (1080p)</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Microphone</FormLabel>
                      <Select
                        value={config.audioInputDevice}
                        onChange={(e) => setConfig({...config, audioInputDevice: e.target.value})}
                        bg="white"
                      >
                        {availableDevices.audioInput.map(device => (
                          <option key={device.deviceId} value={device.deviceId}>
                            {device.label || `Microphone ${device.deviceId.slice(0, 5)}`}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Camera</FormLabel>
                      <Select
                        value={config.videoInputDevice}
                        onChange={(e) => setConfig({...config, videoInputDevice: e.target.value})}
                        bg="white"
                      >
                        {availableDevices.videoInput.map(device => (
                          <option key={device.deviceId} value={device.deviceId}>
                            {device.label || `Camera ${device.deviceId.slice(0, 5)}`}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <SimpleGrid columns={2} spacing={4} width="100%">
                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0" fontSize="sm">Start Muted</FormLabel>
                        <Switch
                          isChecked={config.startWithAudioMuted}
                          onChange={(e) => setConfig({...config, startWithAudioMuted: e.target.checked})}
                        />
                      </FormControl>

                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0" fontSize="sm">Start No Video</FormLabel>
                        <Switch
                          isChecked={config.startWithVideoMuted}
                          onChange={(e) => setConfig({...config, startWithVideoMuted: e.target.checked})}
                        />
                      </FormControl>
                    </SimpleGrid>

                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb="0">Low Bandwidth Mode</FormLabel>
                      <Switch
                        isChecked={config.enableLowBandwidth}
                        onChange={(e) => setConfig({...config, enableLowBandwidth: e.target.checked})}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Participant Volume</FormLabel>
                      <Slider
                        value={config.participantVolume}
                        onChange={(v) => setConfig({...config, participantVolume: v})}
                        min={0}
                        max={100}
                        step={1}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                    </FormControl>
                  </VStack>
                </Collapse>

                <Button
                  colorScheme="blue"
                  size="lg"
                  onClick={startSession}
                  leftIcon={<FaVideo />}
                >
                  Start Drawing
                </Button>
              </VStack>
            </MotionBox>

            <MotionBox
              p={6}
              bg="white"
              borderRadius="xl"
              boxShadow="xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <VStack spacing={4} align="stretch">
                <Heading size="md" color="green.500">Join Session</Heading>
                <Input
                  placeholder="Enter session code"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  size="lg"
                />
                <Button
                  colorScheme="green"
                  size="lg"
                  onClick={joinSession}
                  leftIcon={<FaUserFriends />}
                  isDisabled={!joinCode.trim()}
                >
                  Join Now
                </Button>
              </VStack>
            </MotionBox>
          </SimpleGrid>
        ) : (
          <Box position="relative" h="calc(100vh - 200px)" minH="600px" ref={jitsiContainerRef}>
            <Box
              position="absolute"
              top={0}
              right={0}
              p={4}
              zIndex={2}
              bg="blackAlpha.600"
              borderRadius="md"
            >
              <VStack spacing={2} align="stretch">
                <HStack spacing={2}>
                  <Tooltip label={isMuted ? 'Unmute' : 'Mute'}>
                    <IconButton
                      aria-label="Toggle mute"
                      icon={isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                      onClick={() => setIsMuted(!isMuted)}
                      colorScheme={isMuted ? 'red' : 'gray'}
                      variant="solid"
                    />
                  </Tooltip>
                  <Tooltip label={isVideoOff ? 'Turn video on' : 'Turn video off'}>
                    <IconButton
                      aria-label="Toggle video"
                      icon={isVideoOff ? <FaVideoSlash /> : <FaVideo />}
                      onClick={() => setIsVideoOff(!isVideoOff)}
                      colorScheme={isVideoOff ? 'red' : 'gray'}
                      variant="solid"
                    />
                  </Tooltip>
                  <Tooltip label="Share screen">
                    <IconButton
                      aria-label="Share screen"
                      icon={<FaDesktop />}
                      variant="solid"
                    />
                  </Tooltip>
                  <Tooltip label="Chat">
                    <IconButton
                      aria-label="Open chat"
                      icon={<FaComments />}
                      variant="solid"
                    />
                  </Tooltip>
                  <Tooltip label="Participants">
                    <IconButton
                      aria-label="Show participants"
                      icon={<FaUserFriends />}
                      variant="solid"
                    />
                  </Tooltip>
                  <Tooltip label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
                    <IconButton
                      aria-label="Toggle fullscreen"
                      icon={isFullscreen ? <FaCompress /> : <FaExpand />}
                      onClick={toggleFullscreen}
                      variant="solid"
                    />
                  </Tooltip>
                </HStack>
                <HStack spacing={2} justify="center">
                  <Text color="white" fontSize="sm">Room Code: {roomName}</Text>
                  <IconButton
                    aria-label="Copy room code"
                    icon={<FaCopy />}
                    size="sm"
                    variant="ghost"
                    colorScheme="whiteAlpha"
                    onClick={() => {
                      navigator.clipboard.writeText(roomName);
                      toast({
                        title: 'Copied!',
                        description: 'Room code copied to clipboard',
                        status: 'success',
                        duration: 2000,
                      });
                    }}
                  />
                </HStack>
              </VStack>
            </Box>
            
            <Box h="100%" w="100%" borderRadius="lg" overflow="hidden">
              <iframe
                allow="camera; microphone; fullscreen; display-capture; autoplay"
                src={`https://meet.jit.si/${roomName}#config=${encodeURIComponent(JSON.stringify(getJitsiOptions()))}`}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </Box>
          </Box>
        )}

        {!isInSession && (
          <MotionBox
            mt={8}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Box p={6} bg="blue.50" borderRadius="xl">
                <Heading size="md" mb={4} color="blue.600">Quick Tips 💡</Heading>
                <VStack align="stretch" spacing={2}>
                  <Text>• Sketch your blockchain ideas</Text>
                  <Text>• Explain concepts visually</Text>
                  <Text>• Share your screen when needed</Text>
                  <Text>• Have fun learning together!</Text>
                </VStack>
              </Box>
              <Box p={6} bg="purple.50" borderRadius="xl">
                <Heading size="md" mb={4} color="purple.600">Features ⚡</Heading>
                <VStack align="stretch" spacing={2}>
                  <Text>• HD Video & Clear Audio</Text>
                  <Text>• Screen Sharing</Text>
                  <Text>• Built-in Chat</Text>
                  <Text>• Secure & Private</Text>
                </VStack>
              </Box>
            </SimpleGrid>
          </MotionBox>
        )}
      </VStack>
    </Container>
  );
};

export default LiveSessions; 