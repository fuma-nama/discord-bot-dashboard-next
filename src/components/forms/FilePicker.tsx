import { Box, Center, Flex, Text, VStack } from '@chakra-ui/layout';
import { Icon, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { FaFile } from 'react-icons/fa';
import { MdUpload } from 'react-icons/md';
import { FormCard } from './Form';
import { useController } from 'react-hook-form';
import { ControlledInput } from './types';

export type FilePickerFormProps = {
  id?: string;
  text?: string;
  options?: DropzoneOptions;
  placeholder?: string;
};

export const FilePickerForm: ControlledInput<FilePickerFormProps, File[]> = (props) => {
  const { control, controller, options, placeholder, ...rest } = props;
  const { field, fieldState } = useController(controller);
  const { value, onChange } = field;

  const { getRootProps, getInputProps } = useDropzone({
    ...options,
    onDrop: (files) => onChange(files),
  });

  const empty = value == null || value.length === 0;

  return (
    <FormCard {...control} error={fieldState.error?.message}>
      <Box
        bg="inputBackground"
        border="1px dashed"
        borderColor="inputBorder"
        borderRadius="16px"
        w="100%"
        p={5}
        cursor="pointer"
      >
        <div {...getRootProps()}>
          <input {...getInputProps({ ...field, ...rest, value: undefined })} />
          {empty ? (
            <VStack textAlign="center">
              <Icon as={MdUpload} w="70px" h="70px" />
              <Text fontSize="lg" fontWeight="700" mb="12px">
                Upload Files
              </Text>
              <Text fontSize="sm" fontWeight="500" color="secondaryGray.500">
                {placeholder}
              </Text>
            </VStack>
          ) : (
            <Flex direction="column" gap={2}>
              {(value as File[])?.map((file, i) => (
                <FilePreview key={i} file={file} />
              ))}
            </Flex>
          )}
        </div>
      </Box>
    </FormCard>
  );
};

function FilePreview({ file }: { file: File }) {
  const url = useFileUrl(file);

  return (
    <Flex direction="row" gap={2} w="full" align="center">
      {file.type.startsWith('image/') ? (
        <Image alt={file.name} maxW="70px" maxH="70px" src={url} rounded="md" />
      ) : (
        <Center rounded="2xl" bg="brand.300" w="50px" h="50px">
          <Icon as={FaFile} color="white" />
        </Center>
      )}
      <VStack align="start" flex={1} spacing="3px">
        <Text fontSize="xl" fontWeight="600">
          {file.name}
        </Text>
        <Text color="secondaryGray.500">{file.size} bytes</Text>
      </VStack>
    </Flex>
  );
}

function useFileUrl(file: Blob) {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (file != null) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const result = e.target?.result;

        if (result != null && typeof result === 'string') {
          setUrl(result);
        }
      };

      fileReader.readAsDataURL(file);
      return () => {
        fileReader.abort();
      };
    }
  }, [file]);

  return url;
}
