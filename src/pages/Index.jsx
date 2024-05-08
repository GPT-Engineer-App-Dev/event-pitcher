import React, { useState, useEffect } from "react";
import { Container, VStack, Heading, Input, Textarea, Button, List, ListItem, ListIcon, Box } from "@chakra-ui/react";
import { FaCalendarPlus, FaRegCalendarCheck } from "react-icons/fa";

const Index = () => {
  const [events, setEvents] = useState(() => {
    const localData = localStorage.getItem("events");
    return localData ? JSON.parse(localData) : [];
  });
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const handleAddEvent = () => {
    if (eventName && eventDescription) {
      const newEvent = {
        name: eventName,
        description: eventDescription,
        id: events.length + 1,
      };
      setEvents([...events, newEvent]);
      localStorage.setItem("events", JSON.stringify([...events, newEvent]));
      setEventName("");
      setEventDescription("");
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Heading as="h1" size="xl">
          Event Pitching App
        </Heading>
        <Box w="100%">
          <VStack spacing={4} align="stretch">
            <Input placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
            <Textarea placeholder="Event Description" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
            <Button leftIcon={<FaCalendarPlus />} colorScheme="blue" onClick={handleAddEvent}>
              Add Event
            </Button>
          </VStack>
        </Box>
        <Box w="100%">
          <Heading as="h2" size="lg">
            Upcoming Events
          </Heading>
          <List spacing={3}>
            {events.map((event) => (
              <ListItem key={event.id}>
                <ListIcon as={FaRegCalendarCheck} color="green.500" />
                <strong>{event.name}</strong> - {event.description}
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
