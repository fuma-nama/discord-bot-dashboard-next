import { Box, Center, Flex, Text, VStack } from '@chakra-ui/layout';
import { Icon, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Accept, DropzoneOptions, useDropzone } from 'react-dropzone';
import { FaFile } from 'react-icons/fa';
import { MdUpload } from 'react-icons/md';
import { useColorsExtend } from '@/theme';
import { FormComponentProps, FormControlCard } from './Form';

export type FilePickerProps = DropzoneOptions & {
  value?: File[];
  onChange?: (v: File[]) => void;
  text?: string;
};

export function FilePicker({ value, onChange, text, ...props }: FilePickerProps) {
  const { getRootProps, getInputProps } = useDropzone({
    ...props,
    onDrop: (files) => onChange(files),
  });
  const { borderColor, bg } = useColorsExtend(
    {
      bg: 'gray.100',
      borderColor: 'secondaryGray.100',
    },
    {
      bg: 'navy.700',
      borderColor: 'whiteAlpha.100',
    }
  );

  const empty = value == null || value.length === 0;

  return (
    <Box
      bg={bg}
      border="1px dashed"
      borderColor={borderColor}
      borderRadius="16px"
      w="100%"
      p={5}
      cursor="pointer"
    >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {empty ? (
          <VStack textAlign="center">
            <Icon as={MdUpload} w="70px" h="70px" />
            <Text fontSize="lg" fontWeight="700" mb="12px">
              Upload Files
            </Text>
            <Text fontSize="sm" fontWeight="500" color="secondaryGray.500">
              {text}
            </Text>
          </VStack>
        ) : (
          <Flex direction="column" gap={2}>
            {value?.map((file, i) => (
              <FilePreview key={i} file={file} />
            ))}
          </Flex>
        )}
      </div>
    </Box>
  );
}

function FilePreview({ file }: { file: File }) {
  const url = useFileUrl(file);

  return (
    <Flex direction="row" gap={2} w="full" align="center">
      {file.type.startsWith('image/') ? (
        <Image maxW="70px" maxH="70px" src={url} rounded="md" />
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

export function FilePickerForm({
  value,
  onChange,
  accept,
  picker,
  helperText,
  ...props
}: FormComponentProps<{
  value?: File[];
  onChange?: (files: File[]) => void;
  accept?: Accept;
  helperText?: string;
  picker?: FilePickerProps;
}>) {
  return (
    <FormControlCard {...props}>
      <FilePicker value={value} onChange={onChange} accept={accept} text={helperText} {...picker} />
    </FormControlCard>
  );
}

function useFileUrl(file: Blob) {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (file != null) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
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
