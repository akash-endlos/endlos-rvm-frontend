import { Button, FormControl, FormLabel, Icon, Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react"
import { AiOutlineCloudUpload } from 'react-icons/ai'

/* for type :- text ,password,datetime-local */
export const CustomInput = (props) => {
    const { type = 'text', placeholder, label, handleChange, value, name } = props

    return (
        <>
            <FormControl className="mb-2" spacing={3}>
                <FormLabel>{label}</FormLabel>
                <Input name={name} onChange={handleChange} type={type} value={value} variant='outline' placeholder={placeholder} />
            </FormControl>
        </>
    )
}

export const CustomSelectDropDown = (props) => {
    const { placeholder, label, options } = props

    return (
        <>
            <FormControl className="mb-2">
                <FormLabel>{label}</FormLabel>
                {options && options.map((item, index) => (
                    <Select key={index} placeholder={placeholder}>
                        <option>{item.name}</option>
                    </Select>
                ))}
            </FormControl>
        </>
    )
}

export const CustomInpuFile = (props) => {
    const { placeholder, label } = props

    return (
        <>
            <FormControl className="mb-2">
                <FormLabel>{'File input'}</FormLabel>

                <InputGroup >
                    <Input
                        type='file'
                        hidden
                    />
                    <>
                        <Button leftIcon={<Icon as={AiOutlineCloudUpload} />}>
                            Upload
                        </Button>
                    </>
                </InputGroup>

            </FormControl>
        </>
    )
}
