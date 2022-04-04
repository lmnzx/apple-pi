import {
  Box,
  Container,
  Stack,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

import { useState, useEffect } from "react";

export default function Index() {
  const [led1, setLed1] = useState(0);
  const [led2, setLed2] = useState(0);

  useEffect(() => {
    fetch(`https://iotp.azurewebsites.net/`)
      .then(res => res.json())
      .then(data => {
        setLed1(data.led1)
        setLed2(data.led2)
      })
  }, [])

  console.log(led1);
  console.log(led2);

  useEffect(() => {
    fetch(`https://iotp.azurewebsites.net/?led1=${led1}&led2=${led2}`, {
      method: "POST"
    })
  }, [led1, led2])


  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Stack >
            <Text fontSize="4xl">Led 1 - Duty Cycle: 2 ^ {led1} </Text>
            <Slider value={led1} min={0} max={8} step={1} onChange={(val) => setLed1(val)}>
              <SliderTrack bg='red.100'>
                <Box position='relative' right={10} />
                <SliderFilledTrack bg='tomato' />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>
          </Stack>

          <Stack paddingTop={20}>
            <Text fontSize="4xl">Led 1 - Duty Cycle: 2 ^ {led2} </Text>

            <Slider value={led2} min={0} max={8} step={1} onChange={(val) => setLed2(val)}>
              <SliderTrack bg='red.100'>
                <Box position='relative' right={10} />
                <SliderFilledTrack bg='tomato' />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
