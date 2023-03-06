import { Icon, Image } from '@chakra-ui/react';
import { useGuildRolesQuery } from '@/api/hooks';
import { Option, SelectField } from '@/components/forms/SelectField';
import { toRGB } from '@/utils/common';
import { Role } from '@/api/bot';
import { useRouter } from 'next/router';
import { Params } from '@/pages/guilds/[guild]/features/[feature]';
import { forwardRef } from 'react';
import { SelectInstance, Props as SelectProps } from 'chakra-react-select';
import { Override } from '@/utils/types';
import { ControlledInput } from './types';
import { FormCard } from './Form';
import { useController } from 'react-hook-form';
import { common } from '@/config/translations/common';

import { BsPeopleFill } from 'react-icons/bs';

type Props = Override<
  SelectProps<Option, false>,
  {
    value?: string;
    onChange: (role: string) => void;
  }
>;

function render(role: Role): Option {
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
}

export const RoleSelect = forwardRef<SelectInstance<Option, false>, Props>((props, ref) => {
  const { value, onChange, ...rest } = props;
  const { guild } = useRouter().query as Params;
  const rolesQuery = useGuildRolesQuery(guild);
  const isLoading = rolesQuery.isLoading;

  const selected = value != null ? rolesQuery.data?.find((role) => role.id === value) : null;

  return (
    <SelectField<Option>
      isDisabled={isLoading}
      isLoading={isLoading}
      placeholder={<common.T text="select role" />}
      value={selected != null ? render(selected) : null}
      onChange={(e) => e != null && onChange(e.value)}
      options={rolesQuery.data?.map(render)}
      ref={ref}
      {...rest}
    />
  );
});

RoleSelect.displayName = 'RolesSelect';

export const RoleSelectForm: ControlledInput<Omit<Props, 'value' | 'onChange'>> = ({
  control,
  controller,
  ...props
}) => {
  const { fieldState, field } = useController(controller);

  return (
    <FormCard {...control} error={fieldState?.error?.message}>
      <RoleSelect {...field} {...props} />
    </FormCard>
  );
};
