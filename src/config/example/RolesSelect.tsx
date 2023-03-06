import { Icon, Image } from '@chakra-ui/react';
import { useGuildRolesQuery } from '@/api/hooks';
import { SelectField } from '@/components/forms/SelectField';
import { BsPeopleFill } from 'react-icons/bs';
import { toRGB } from '@/utils/common';
import { Role } from '@/api/bot';
import { useRouter } from 'next/router';
import { Params } from '@/pages/guilds/[guild]/features/[feature]';
import { forwardRef } from 'react';
import { SelectInstance, Props as SelectProps } from 'chakra-react-select';
import { Override } from '@/utils/types';

type Option = {
  label: string;
  value: string;
  icon: JSX.Element;
};

type Props = Override<
  SelectProps<Option, false>,
  {
    value?: string;
    onChange: (role: string) => void;
  }
>;

export const RolesSelect = forwardRef<SelectInstance<Option, false>, Props>((props, ref) => {
  const { value, onChange, ...rest } = props;
  const { guild } = useRouter().query as Params;
  const rolesQuery = useGuildRolesQuery(guild);
  const isLoading = rolesQuery.isLoading;

  const selected = value != null ? rolesQuery.data?.find((role) => role.id === value) : null;
  const render = (role: Role) => {
    return {
      value: role.id,
      label: role.name,
      icon:
        role.icon?.iconUrl != null ? (
          <Image alt="icon" src={role.icon.iconUrl} bg={toRGB(role.color)} w="25px" h="25px" />
        ) : (
          <Icon as={BsPeopleFill} color={toRGB(role.color)} w="20px" h="20px" />
        ),
    };
  };

  return (
    <SelectField<Option>
      isDisabled={isLoading}
      isLoading={isLoading}
      placeholder="Select a role"
      value={selected != null ? render(selected) : null}
      onChange={(e) => e && onChange(e.value)}
      options={rolesQuery.data?.map(render)}
      ref={ref}
      {...rest}
    />
  );
});

RolesSelect.displayName = 'RolesSelect';
