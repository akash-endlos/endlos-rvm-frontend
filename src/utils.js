import { extendBaseTheme } from "@chakra-ui/react"
import chakraTheme from '@chakra-ui/theme'
const { Button, Box, Flex, FormControl, FormLabel, Input, Card, InputGroup, InputRightElement, Grid, Heading, Stack, GridItem, Center, Spacer, VStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr,Divider } = chakraTheme.components

export const theme = extendBaseTheme({
  components: {
    Button,
    FormControl,
    FormLabel,
    Input,
    Flex,
    Box,
    Card,
    InputGroup,
    InputRightElement,
    Grid,
    Heading,
    Stack,
    GridItem,
    Center,
    Spacer,
    VStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    Divider
  },
})