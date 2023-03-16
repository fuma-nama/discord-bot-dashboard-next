import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputProps,
} from '@chakra-ui/react';
import { AiOutlineSearch as SearchIcon } from 'react-icons/ai';
import { common } from '@/config/translations/common';

export function SearchBar(
  props: {
    input?: InputProps;
    onSearch?: () => void;
  } & InputGroupProps
) {
  const t = common.useTranslations();
  const { input, onSearch, ...rest } = props;

  return (
    <InputGroup {...rest}>
      <InputLeftElement>
        <IconButton
          aria-label="search"
          bg="inherit"
          borderRadius="inherit"
          _active={{}}
          variant="ghost"
          icon={<Icon as={SearchIcon} color="TextPrimary" width="15px" height="15px" />}
          onClick={onSearch}
        />
      </InputLeftElement>
      <Input
        variant="search"
        fontSize="sm"
        bg="secondaryGray.300"
        color="TextPrimary"
        fontWeight="500"
        _placeholder={{ color: 'gray.400', fontSize: '14px' }}
        borderRadius="30px"
        placeholder={`${t.search}...`}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSearch?.();
        }}
        _dark={{
          bg: 'navy.900',
        }}
        {...input}
      />
    </InputGroup>
  );
}
