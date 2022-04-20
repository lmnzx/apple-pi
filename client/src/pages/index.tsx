import {
  Box,
  Container,
  Stack,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  InputLeftAddon
} from '@chakra-ui/react';
import { useState, useRef, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";


const Index = () => {
  const [dutyCycle, setDutyCycle] = useState(0);
  const [frequency, setFrequency] = useState(0);

  let frequencyInput = useRef<HTMLInputElement>(null);

  const { readyState, sendJsonMessage } = useWebSocket("ws://localhost:4000");

  const handleFrequency = () => {
    const temp = frequencyInput.current
    setFrequency(parseInt(temp.value));
  };

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then(res => res.json())
      .then(data => {
        setFrequency(data.frequency);
        setDutyCycle(data.dutyCycle);
      }
      );
  }, []);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        frequency: frequency,
        dutyCycle: dutyCycle
      });
    }
  }, [dutyCycle, frequency]);


  return (
    <>
      <Container maxW={'3xl'} >
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Text fontSize="4xl">Motor Duty Cycle : {dutyCycle}% </Text>
          <InputGroup>
            <InputLeftAddon>Frequency</InputLeftAddon>
            <Input defaultValue={frequency} ref={frequencyInput} />
            <InputRightElement width={'4rem'}>
              <Button h='1.75rem' size='sm' bg="tomato" onClick={handleFrequency}>Set</Button>
            </InputRightElement>
          </InputGroup>
          <Slider value={dutyCycle} min={0} max={100} step={1} onChange={(val) => setDutyCycle(val)}>
            <SliderTrack bg='red.100'>
              <Box position='relative' right={10} />
              <SliderFilledTrack bg='tomato' />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>

        </Stack>
      </Container>
    </>
  )
}

export default Index
