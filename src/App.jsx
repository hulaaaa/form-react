import './App.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { 
  Card, 
  Alert,
  AlertIcon,
  AlertTitle,
  RadioGroup,
  AlertDescription,
  CardBody,
  FormControl,
  HStack,
  Radio,
  Text,
  FormLabel,
  Input, 
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper, 
  Select,
  InputRightElement,
  InputGroup,
  Container
} from '@chakra-ui/react'



function App() {
  const [show, setShow] = useState(false);
  const passwordClick = () => setShow(!show);

  const [userdata, setUserdata] = useState()
  
  const { register, formState: { errors }, handleSubmit } = useForm() 
  const sendForm = (data,event) => {
    event.preventDefault();
    setUserdata(data);
  }
  const errorsDn = (error,event) => event.preventDefault()
  return (
    <Container maxW='700px' style={{ padding: '50px 0' }}>
      <Card>
        <CardBody>
            <div className='mainContent' style={{ padding: '50px' }}>
              <form onSubmit={handleSubmit(sendForm,errorsDn)}>
                <Text fontSize='4xl' as='b'>Реєстрація</Text>
                <div className="form" style={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    margin: '60px 0'
                }
                }>

                  {/* Input Name */}
                  <FormControl isRequired>
                    <FormLabel>Імʼя</FormLabel>
                      <Input 
                        {...register('name',
                        {
                          required:true,
                          minLength: 2,
                          maxLength: 19,
                          pattern: /^[a-zA-Zа-яА-Я]+$/
                        }
                        )
                      } 
                        placeholder='Введіть імʼя' 
                      />
                  </FormControl>
                  {
                    errors.name && (
                      <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle mr={2}>Введіть імʼя</AlertTitle>
                        <AlertDescription>Введіть імʼя латиницею з великої букви</AlertDescription>
                      </Alert>
                    )
                  }

                  {/* Input Age */}
                  <FormControl isRequired>
                    <FormLabel>Вік</FormLabel>
                    <NumberInput 
                      
                       >
                      <NumberInputField 
                      min='1' 
                      {...register('age', 
                      {
                        required:true,
                        min: 1,
                        max: 120
                      })}
                      placeholder='Введіть вік'/>
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  {
                    errors.age && (
                      <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle mr={2}>Невірний вік </AlertTitle>
                        <AlertDescription>Вік поминен бути від 1 до 120</AlertDescription>
                      </Alert>
                    )
                  }

                  {/* Input Select country */}
                  <FormControl isRequired>
                    <FormLabel>Країна</FormLabel>
                    <Select placeholder='Виберіть країну'{...register('country',{required:true})} >
                      <option value='CША'>США</option>
                      <option value='Польща'>Польща</option>
                      <option value='Італія'>Італія</option>
                      <option value='Україна'>Україна</option>
                      <option value='Німеччина'>Німеччина</option>
                      <option value='Франція'>Франція</option>
                    </Select>
                  </FormControl>


                  {/* Input Password */}
                  
                  <FormControl isRequired>
                    <FormLabel>Пароль</FormLabel>
                    <InputGroup size='md'>
                      <Input
                        {...register('password',
                        {
                          required:true,
                          minLength: 8,
                          maxLength: 27,
                          pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[+_-])[a-zA-Z0-9+_-]+$/
                        })}
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Введіть пароль'
                      />
                      <InputRightElement width='fit-content' mr='5px'>
                        <Button h='1.75rem' size='sm' onClick={passwordClick}>
                          {show ? 'Приховати' : 'Показати'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  {
                    errors.password && (
                      <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle mr={2}>Пароль недостатньо надійний</AlertTitle>
                        <AlertDescription>Він повинен містити принаймні одну велику літеру, цифру та спеціальний символ (+_-).</AlertDescription>
                      </Alert>
                    )
                  }
                  
                  {/* Input Checkbox */}
                  <FormControl as='fieldset' isRequired>
                    <FormLabel as='legend'>
                    Звідки дізнались про нас
                    </FormLabel>
                    <RadioGroup >
                    <HStack spacing='24px'>
                      <Radio {...register('checkBox')} value='Google'>Google</Radio>
                      <Radio {...register('checkBox')} value='Facebook'>Facebook</Radio>
                      <Radio {...register('checkBox')} value='Instagram'>Instagram</Radio>
                      <Radio {...register('checkBox')} value='Розповіли друзі'>Розповіли друзі</Radio>
                    </HStack>
                    </RadioGroup>
                  </FormControl>
                </div>
                {
                  userdata ? (
                    <Alert
                      status='success'
                      variant='subtle'
                      flexDirection='column'
                      alignItems='center'
                      justifyContent='center'
                      textAlign='center'
                      height='fit-content'
                      mb={10}
                    >
                      <AlertIcon  boxSize='40px' mr={0} />
                      <AlertTitle mt={4} mb={1} fontSize='lg'>
                        Користувач успішно зареєстрований!
                      </AlertTitle>
                      <AlertDescription maxWidth='sm'>
                        Імʼя: {userdata.name}
                        <br />
                        Вік: {userdata.age}
                        <br />
                        Країна: {userdata.country}
                        <br />
                        Пароль: {userdata.password}
                        <br/>
                        Звідки дізнались про нас: {userdata.checkBox} 
                      </AlertDescription>
                    </Alert>
                  )
                  : ""
                }
                

                <Button colorScheme='teal' variant='outline'type='submit' >
                  Надіслати
                </Button>
              </form>
            </div>
        </CardBody>
      </Card>
    </Container>
    
  )
}

export default App
