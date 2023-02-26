import {
  IconButton,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { AiOutlineSearch as SearchIcon } from 'react-icons/ai';
import { common } from 'config/translations/common';
export function SearchBar(
  props: {
    input?: InputProps;
    onSearch?: () => void;
  } & InputGroupProps
) {
  const t = common.useTranslations();
  // Pass the computed styles into the `__css` prop
  const { input, onSearch, ...rest } = props;
  // Chakra Color Mode
  const searchIconColor = useColorModeValue('gray.700', 'white');
  const inputBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const inputText = useColorModeValue('gray.700', 'gray.100');
  return (
    <InputGroup {...rest}>
      <InputLeftElement>
        <IconButton
          aria-label="search"
          bg="inherit"
          borderRadius="inherit"
          _active={{}}
          variant="ghost"
          icon={<SearchIcon color={searchIconColor} width="15px" height="15px" />}
          onClick={onSearch}
        />
      </InputLeftElement>
      <Input
        variant="search"
        fontSize="sm"
        bg={inputBg}
        color={inputText}
        fontWeight="500"
        _placeholder={{ color: 'gray.400', fontSize: '14px' }}
        borderRadius="30px"
        placeholder={`${t.search}...`}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSearch();
        }}
        {...input}
      />
    </InputGroup>
  );
}
